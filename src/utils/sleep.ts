export const sleep = (n: number) =>
	new Promise((resolve) => window.setTimeout(resolve, n));
