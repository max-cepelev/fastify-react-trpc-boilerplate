import { stat } from 'node:fs/promises';
import { basename, sep } from 'node:path';

const random = (min: number, max: number) => {
	const [a, b] = max === undefined ? [0, min] : [min, max];
	return a + Math.floor(Math.random() * (b - a + 1));
};

const sample = (arr: unknown[]) => {
	const index = Math.floor(Math.random() * arr.length);
	return arr[index];
};

const ipToInt = (ip = '127.0.0.1') => {
	if (ip === '') return 0;
	const bytes = ip.split('.');
	let res = 0;
	for (const byte of bytes) {
		res = (res << 8) + Number.parseInt(byte, 10);
	}
	return res;
};

const parseHost = (host: string) => {
	if (!host) return 'no-host-name-in-http-headers';
	const portOffset = host.indexOf(':');
	if (portOffset > -1) return host.substring(0, portOffset);
	return host;
};

const parseParams = (
	params:
		| string
		| string[][]
		| Record<string, string>
		| URLSearchParams
		| undefined,
) => Object.fromEntries(new URLSearchParams(params));

const replace = (str: string, substr: string, newStr: string) => {
	if (substr === '') return str;
	let src = str;
	let res = '';
	do {
		const index = src.indexOf(substr);
		if (index === -1) return res + src;
		const start = src.substring(0, index);
		src = src.substring(index + substr.length, src.length);
		res += start + newStr;
		// biome-ignore lint/correctness/noConstantCondition: <explanation>
	} while (true);
};

const fileExt = (fileName: string) => {
	const dot = fileName.lastIndexOf('.');
	const slash = fileName.lastIndexOf('/');
	if (slash > dot) return '';
	return fileName.substring(dot + 1, fileName.length).toLowerCase();
};

const parsePath = (relPath: string) => {
	const name = basename(relPath, '.js');
	const names = relPath.split(sep);
	names[names.length - 1] = name;
	return names;
};

const between = (str: string, prefix: string, suffix: string) => {
	let i = str.indexOf(prefix);
	if (i === -1) return '';
	let newStr = str.substring(i + prefix.length);
	if (suffix) {
		i = str.indexOf(suffix);
		if (i === -1) return '';
		newStr = str.substring(0, i);
	}
	return str;
};

const split = (s: string, separator: string) => {
	const i = s.indexOf(separator);
	if (i < 0) return [s, ''];
	return [s.slice(0, i), s.slice(i + separator.length)];
};

const inRange = (x: string, min: string, max: string) => x >= min && x <= max;

const isFirstUpper = (s: string) => !!s && inRange(s[0], 'A', 'Z');

const isFirstLower = (s: string) => !!s && inRange(s[0], 'a', 'z');

const isFirstLetter = (s: string) => isFirstUpper(s) || isFirstLower(s);

const isHashObject = (o: object) =>
	typeof o === 'object' && o !== null && !Array.isArray(o);

const toLowerCamel = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const toUpperCamel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const toLower = (s: string) => s.toLowerCase();

const toCamel = (separator: string) => (s: string) => {
	const words = s.split(separator);
	const first = words.length > 0 ? words.shift()?.toLowerCase() : '';
	return first + words.map(toLower).map(toUpperCamel).join('');
};

const spinalToCamel = toCamel('-');

const snakeToCamel = toCamel('_');

const isConstant = (s: string) => s === s.toUpperCase();

const twoDigit = (n: number) => {
	const s = n.toString();
	if (n < 10) return `0${s}`;
	return s;
};

const nowDate = (date: Date = new Date()) => {
	const yyyy = date.getUTCFullYear().toString();
	const mm = twoDigit(date.getUTCMonth() + 1);
	const dd = twoDigit(date.getUTCDate());
	return `${yyyy}-${mm}-${dd}`;
};

const nowDateTimeUTC = (date: Date = new Date(), timeSep = ':') => {
	const yyyy = date.getUTCFullYear().toString();
	const mm = twoDigit(date.getUTCMonth() + 1);
	const dd = twoDigit(date.getUTCDate());
	const hh = twoDigit(date.getUTCHours());
	const min = twoDigit(date.getUTCMinutes());
	const ss = twoDigit(date.getUTCSeconds());
	return `${yyyy}-${mm}-${dd}T${hh}${timeSep}${min}${timeSep}${ss}`;
};

const DURATION_UNITS = new Map([
	['d', 86400],
	['h', 3600],
	['m', 60],
	['s', 1],
]);

const duration = (s: string | number) => {
	if (typeof s === 'number') return s;
	if (typeof s !== 'string') return 0;
	let result = 0;
	const parts = s.split(' ');
	for (const part of parts) {
		const unit = part.slice(-1);
		const value = Number.parseInt(part.slice(0, -1));
		const mult = DURATION_UNITS.get(unit) || 1;
		if (!Number.isNaN(value) && mult) result += value * mult;
	}
	return result * 1000;
};

const SIZE_UNITS = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const bytesToSize = (bytes: number) => {
	if (bytes === 0) return '0';
	const exp = Math.floor(Math.log(bytes) / Math.log(1000));
	const size = bytes / 1000 ** exp;
	const short = Math.round(size);
	const unit = exp === 0 ? '' : ` ${SIZE_UNITS[exp - 1]}`;
	return short.toString() + unit;
};

const kilobytesToSize = (kilobytes: number) => {
	if (kilobytes === 0) return '0 KB';
	const exp = Math.floor(Math.log(kilobytes) / Math.log(1000));
	const size = kilobytes / 1000 ** exp;
	const short = size.toLocaleString('ru-RU', { maximumFractionDigits: 2 });
	const unit = exp === 0 ? 'KB' : SIZE_UNITS[exp] || 'B';
	return `${short.toString()} ${unit}`;
};

const UNIT_SIZES = new Map([
	['yb', 24], // yottabyte
	['zb', 21], // zettabyte
	['eb', 18], // exabyte
	['pb', 15], // petabyte
	['tb', 12], // terabyte
	['gb', 9], // gigabyte
	['mb', 6], // megabyte
	['kb', 3], // kilobyte
]);

const sizeToBytes = (size: string) => {
	const [num, unit] = size.toLowerCase().split(' ');
	const exp = UNIT_SIZES.get(unit);
	const value = Number.parseInt(num, 10);
	if (!exp) return value;
	return value * 10 ** exp;
};

const ORDINAL = ['st', 'nd', 'rd', 'th'];

const isOrdinal = (s: string) => {
	for (const d of ORDINAL) {
		if (s.endsWith(d)) return true;
	}
	return false;
};

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const NAME_LEN = 3;

const parseMonth = (s: string) => {
	const name = s.substring(0, NAME_LEN);
	const i = MONTHS.indexOf(name);
	return i >= 0 ? i + 1 : -1;
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const parseDay = (s: string) => {
	const name = s.substring(0, NAME_LEN);
	const i = DAYS.indexOf(name);
	return i >= 0 ? i + 1 : -1;
};

const YEAR_LEN = 4;

const parseEvery = (s = '') => {
	let YY = -1;
	let MM = -1;
	let DD = -1;
	let wd = -1;
	let hh = -1;
	let mm = -1;
	let ms = 0;
	const parts = s.split(' ');
	for (const part of parts) {
		if (part.includes(':')) {
			const [h, m] = split(part, ':');
			if (h !== '') hh = Number.parseInt(h);
			mm = m === '' ? 0 : Number.parseInt(m);
			continue;
		}
		if (isOrdinal(part)) {
			DD = Number.parseInt(part);
			continue;
		}
		if (part.length === YEAR_LEN) {
			YY = Number.parseInt(part);
			continue;
		}
		if (MM === -1) {
			MM = parseMonth(part);
			if (MM > -1) continue;
		}
		if (wd === -1) {
			wd = parseDay(part);
			if (wd > -1) continue;
		}
		const unit = part.slice(-1);
		const mult = DURATION_UNITS.get(unit);
		if (typeof mult === 'number') {
			const value = Number.parseInt(part);
			if (!Number.isNaN(value)) ms += value * mult;
		}
	}
	return { YY, MM, DD, wd, hh, mm, ms: ms > 0 ? ms * 1000 : -1 };
};

const protect = (allowMixins: string, ...namespaces: object[]) => {
	for (const namespace of namespaces) {
		const names = Object.keys(namespace);
		for (const name of names) {
			const target = namespace[name as keyof typeof namespace];
			if (!allowMixins.includes(name)) Object.freeze(target);
		}
	}
};

const convertKeysToLowerCase = (obj: {
	[key: string]: unknown;
}): {
	[key: string]: unknown;
} => {
	return Object.keys(obj).reduce(
		(acc: { [key: string]: unknown }, key: string) => {
			acc[key.toLowerCase()] = obj[key];
			return acc;
		},
		{},
	);
};

const fileSize = async (path: string | Buffer | URL) => {
	const stats = await stat(path);

	return stats.size / 1000;
};

const isError = (err: Error) =>
	err?.constructor?.name?.includes('Error') || false;

/**
 * Функция для подбора нужного имени в зависимости от числа
 * @param {number} number число
 * @param {string[]} titles массив имен [имя, когда number === 1, имя, когда number === 2, имя, когда number === 5]
 * @returns число с нужным именем
 * @example
 * declensionOfNumber(5, ['документ', 'документа', 'документов'])
 */
const declensionOfNumber = (number: number, titles: string[]) => {
	const cases = [2, 0, 1, 1, 1, 2];
	const isSecondTitle = number % 100 > 4 && number % 100 < 20;
	const isRemainderLessThanFive = number % 10 < 5;

	return titles[
		isSecondTitle ? 2 : cases[isRemainderLessThanFive ? number % 10 : 5]
	];
};

export {
	between,
	bytesToSize,
	convertKeysToLowerCase,
	declensionOfNumber,
	duration,
	fileExt,
	fileSize,
	ipToInt,
	isConstant,
	isError,
	isFirstLetter,
	isFirstLower,
	isFirstUpper,
	isHashObject,
	kilobytesToSize,
	nowDate,
	nowDateTimeUTC,
	parseDay,
	parseEvery,
	parseHost,
	parseMonth,
	parseParams,
	parsePath,
	protect,
	random,
	replace,
	sample,
	sizeToBytes,
	snakeToCamel,
	spinalToCamel,
	split,
	toCamel,
	toLower,
	toLowerCamel,
	toUpperCamel,
};
