export function plainObject<T extends object>(obj: T) {
	const newObj = {} as T;
	const pick = (...keys: (keyof T)[]) => {
		for (const key of keys) {
			newObj[key] = obj[key];
		}
		return newObj;
	};
	const omit = (...keys: (keyof T)[]) => {
		for (const key in obj) {
			if (!keys.includes(key)) {
				newObj[key] = obj[key];
			}
		}
		return newObj;
	};

	return {
		pick,
		omit,
	};
}
