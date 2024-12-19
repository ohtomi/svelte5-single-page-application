export const makeGotoDummy = () => {
	const spy: Array<{ parameters: Array<unknown>; return: unknown }> = [];
	const goto = (location: string) => {
		spy.push({
			parameters: [location],
			return: undefined,
		});
	};
	goto.spy = spy;
	return goto;
};
