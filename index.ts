type AnyFunction = (...arguments_: any) => any;

export default function someMethod<ProvidedFunction extends AnyFunction>(function_: ProvidedFunction): ProvidedFunction {
	const cache = new Map<Parameters<ProvidedFunction>[0], ReturnType<ProvidedFunction>>();

	return function (this: ProvidedFunction, ...arguments_: Parameters<ProvidedFunction>): ReturnType<ProvidedFunction> {
		const key = arguments_[0];

		const cacheItem = cache.get(key);
		if (cacheItem) {
			return cacheItem;
		}

		const result = function_.apply(this, arguments_);
		cache.set(key, result);
		return result;
	} as ProvidedFunction;
}