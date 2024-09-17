import { CronJob, type CronJobParams } from 'cron';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

export type Job = CronJob<() => void, FastifyInstance> & {
	readonly name?: string;
};

declare module 'fastify' {
	interface FastifyInstance {
		cron: CronDecorator;
	}
}

export interface Params
	extends Omit<CronJobParams<() => void, FastifyInstance>, 'utcOffset'> {
	startWhenReady?: boolean;
	name?: string;
	utcOffset?: undefined;
}

export interface CronDecorator {
	readonly jobs: Job[];
	createJob: (params: Params) => Job;
	getJobByName: (name: string) => Job | undefined;
	startAllJobs: () => void;
	stopAllJobs: () => void;
}

export type FalsyValue = undefined | null | false;

export interface Config {
	jobs?: (Params | FalsyValue)[];
}

export const cronPlugin = fastifyPlugin(
	(app: FastifyInstance, options: FastifyPluginOptions, next: () => void) => {
		const decorator: CronDecorator = {
			jobs: [],
			createJob: function createJob(params) {
				const job: Job = Object.assign(
					new CronJob<() => void, FastifyInstance>(
						params.cronTime,
						params.onTick,
						params.onComplete,
						params.start,
						params.timeZone,
						params.context,
						params.runOnInit,
					),
					{
						name: params.name,
					},
				);
				if (params.startWhenReady === true) {
					app.ready(() => job.start());
				}
				decorator.jobs.push(job);
				return job;
			},
			getJobByName: function getJobByName(name) {
				return decorator.jobs.find((j) => j.name === name);
			},
			startAllJobs: function startAllJobs() {
				for (const job of decorator.jobs) {
					job.start();
				}
			},
			stopAllJobs: function stopAllJobs() {
				for (const job of decorator.jobs) {
					job.stop();
				}
			},
		};
		for (const params of options.jobs || []) {
			if (params) {
				decorator.createJob(params);
			}
		}

		app.decorate('cron', decorator);
		app.addHook('onClose', () => decorator.stopAllJobs());

		next();
	},
	{
		name: 'fastify-cron',
		fastify: '4.x',
	},
);
