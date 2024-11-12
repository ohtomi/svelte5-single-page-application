import { Result } from 'neverthrow';

type Underscore<P extends string> = `__${P}`;

type Underscored<T extends string> = {
	readonly [P in T as Underscore<P>]: Underscore<P>;
};

export type Brand<Type, Name extends string> = Type & Underscored<Name>;

export type UnArray<T> = T extends Array<infer A> | ReadonlyArray<infer A>
	? A
	: never;

export type UnResultOk<T> = T extends Result<infer Success, infer _Failure>
	? Success
	: never;

export type UnResultErr<T> = T extends Result<infer _Success, infer Failure>
	? Failure
	: never;

export type ExistingValueOf<T> = T extends undefined ? never : T;

// see https://stackoverflow.com/a/77740471
export const listAllElements =
	<StringLiteral extends string | undefined>() =>
	<StringUnion extends StringLiteral[]>(
		...elements: StringUnion &
			([StringLiteral] extends [StringUnion[number]] ? unknown : never)
	) =>
		elements;

export const joinAllElements = (elements: (string | undefined)[]): string => {
	return elements
		.filter((value) => value)
		.map((value) => `"${value}"`)
		.join(',');
};
