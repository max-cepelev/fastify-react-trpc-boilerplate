import { fastifyHelmet } from '@fastify/helmet';
import { fastifyPlugin } from 'fastify-plugin';

export const helmetPlugin = fastifyPlugin((app, _, next) => {
	app.register(fastifyHelmet, {
		global: app.config.NODE_ENV === 'production',
		enableCSPNonces: true,
		// contentSecurityPolicy: {
		//   directives: {
		//     defaultSrc: ["'self'"],
		//     scriptSrc: [
		//       "'self'",
		//       // @ts-ignore
		//       (req, res) => (res.scriptNonce = `nonce-${randomBytes(16).toString('hex')}`),
		//     ],
		//     scriptSrcElem: [
		//       "'self'",
		//       // @ts-ignore
		//       (req, res) => (res.scriptElemNonce = `nonce-${randomBytes(16).toString('hex')}`),
		//     ],
		//     styleSrc: [
		//       "'self'",
		//       // @ts-ignore
		//       (req, res) => (res.styleNonce = `nonce-${randomBytes(16).toString('hex')}`),
		//     ],
		//   },
		// },
	});

	next();
});
