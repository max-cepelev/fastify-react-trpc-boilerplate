import crypto from 'node:crypto';
import fs from 'node:fs';

const UINT32_MAX = 0xffffffff;
const BUF_LEN = 1024;
const BUF_SIZE = BUF_LEN * Uint32Array.BYTES_PER_ELEMENT;

const randomPrefetcher = {
	buf: crypto.randomBytes(BUF_SIZE),
	pos: 0,
	next() {
		const { buf, pos } = this;
		let start = pos;
		if (start === buf.length) {
			start = 0;
			crypto.randomFillSync(buf);
		}
		const end = start + Uint32Array.BYTES_PER_ELEMENT;
		this.pos = end;
		return buf.subarray(start, end);
	},
};

const cryptoRandom = () => {
	const buf = randomPrefetcher.next();
	return buf.readUInt32LE(0) / (UINT32_MAX + 1);
};

const generateUUID = crypto.randomUUID;

const generateKey = (length: number, possible: string) => {
	const base = possible.length;
	let key = '';
	for (let i = 0; i < length; i++) {
		const index = crypto.randomInt(0, base);
		key += possible[index];
	}
	return key;
};

const CRC_LEN = 4;

const crcToken = (secret: string, key: string) => {
	const md5 = crypto.createHash('md5').update(key + secret);
	return md5.digest('hex').substring(0, CRC_LEN);
};

const generateToken = (secret: string, characters: string, length: number) => {
	const key = generateKey(length - CRC_LEN, characters);
	return key + crcToken(secret, key);
};

const validateToken = (secret: string, token: string) => {
	if (!token) return false;
	const len = token.length;
	const crc = token.slice(len - CRC_LEN);
	const key = token.slice(0, -CRC_LEN);
	return crcToken(secret, key) === crc;
};

// Only change these if you know what you're doing
const SCRYPT_PARAMS = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const SCRYPT_PREFIX = '$scrypt$N=32768,r=8,p=1,maxmem=67108864$';

const serializeHash = (hash: Buffer, salt: Buffer) => {
	const saltString = salt.toString('base64').split('=')[0];
	const hashString = hash.toString('base64').split('=')[0];
	return `${SCRYPT_PREFIX}${saltString}$${hashString}`;
};

const parseOptions = (options: string) => {
	const values = [];
	const items = options.split(',');
	for (const item of items) {
		const [key, val] = item.split('=');
		values.push([key, Number(val)]);
	}
	return Object.fromEntries(values);
};

const deserializeHash = (phcString: string) => {
	const [, name, options, salt64, hash64] = phcString.split('$');
	if (name !== 'scrypt') {
		throw new Error('Node.js crypto module only supports scrypt');
	}
	const params = parseOptions(options);
	const salt = Buffer.from(salt64, 'base64');
	const hash = Buffer.from(hash64, 'base64');
	return { params, salt, hash };
};

const SALT_LEN = 32;
const KEY_LEN = 64;

const hashPassword = (password: string): Promise<string> =>
	new Promise((resolve, reject) => {
		crypto.randomBytes(SALT_LEN, (err, salt) => {
			if (err) {
				reject(err);
				return;
			}
			crypto.scrypt(password, salt, KEY_LEN, SCRYPT_PARAMS, (err, hash) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(serializeHash(hash, salt));
			});
		});
	});

const validatePassword = (
	password: string,
	serHash: string,
): Promise<boolean> => {
	const { params, salt, hash } = deserializeHash(serHash);
	return new Promise((resolve, reject) => {
		const callback = (err: unknown, hashedPassword: Buffer) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(crypto.timingSafeEqual(hashedPassword, hash));
		};
		crypto.scrypt(password, salt, hash.length, params, callback);
	});
};

const md5 = (filePath: string) => {
	const hash = crypto.createHash('md5');
	const file = fs.createReadStream(filePath);
	return new Promise((resolve, reject) => {
		file.on('error', reject);
		hash.once('readable', () => {
			resolve(hash.read().toString('hex'));
		});
		file.pipe(hash);
	});
};

const DNS_PREFIX = 'DNS:';

const getX509names = (cert: { subject: string; subjectAltName: string }) => {
	const { subject, subjectAltName } = cert;
	const name = subject.split('=').pop();
	const names = subjectAltName
		.split(', ')
		.filter((name) => name.startsWith(DNS_PREFIX))
		.map((name) => name.substring(DNS_PREFIX.length, name.length));
	return [name, ...names];
};

export {
	crcToken,
	cryptoRandom,
	generateKey,
	generateToken,
	generateUUID,
	getX509names,
	hashPassword,
	md5,
	validatePassword,
	validateToken,
};
