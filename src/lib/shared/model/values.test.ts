import { describe, expect, test } from "vitest";
import type { Result } from "neverthrow";

import {
	type Brand,
	joinAllElements,
	listAllElements,
	type NotUndefined,
	type UnArray,
	type UnResultErr,
	type UnResultOk,
} from "../model/values";

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
	? 1
	: 2
	? true
	: false;

describe("Brand<>", () => {
	describe("型のユニットテスト", () => {
		test("一重Brand化した場合", () => {
			type Got = Brand<string, "Id">;
			type Want = string & { readonly __Id: "__Id" };

			const result: Equals<Got, Want> = true;
			expect(result).toBeTruthy();
		});

		test("多重Brand化した場合", () => {
			type Got = Brand<Brand<string, "Id">, "UserId">;
			type Want = string & { readonly __Id: "__Id" } & {
				readonly __UserId: "__UserId";
			};

			const result: Equals<Got, Want> = true;
			expect(result).toBeTruthy();
		});
	});

	test("プリミティブ型をBrand化したものは文字列に埋め込める", () => {
		type Id = Brand<string, "Id">;
		const id: Id = "value" as Id;

		const got = `id: ${id}`;
		expect(got).toBe("id: value");
	});

	test("オブジェクト型をBrand化したものはプロパティーへアクセスできる", () => {
		type Id = Brand<string, "Id">;
		type Name = Brand<string, "Name">;
		type User = Brand<{ id: Id; name: Name }, "User">;
		const user: User = {
			id: "id.value" as Id,
			name: "name.value" as Name,
		} as User;

		expect(user).toHaveProperty("id");
		expect(user).toHaveProperty("name");
		expect(user).toMatchObject({ id: "id.value", name: "name.value" });
	});
});

describe("UnArray<>", () => {
	describe("型のユニットテスト", () => {
		test("Arrayの要素の場合", () => {
			type Got = UnArray<Array<string>>;
			type Want = string;

			const result: Equals<Got, Want> = true;
			expect(result).toBeTruthy();
		});

		test("ReadonlyArrayの要素の場合", () => {
			type Got = UnArray<ReadonlyArray<string>>;
			type Want = string;

			const result: Equals<Got, Want> = true;
			expect(result).toBeTruthy();
		});
	});
});

describe("UnResultOk<>", () => {
	test("型のユニットテスト", () => {
		type Got = UnResultOk<Result<string, Error>>;
		type Want = string;

		const result: Equals<Got, Want> = true;
		expect(result).toBeTruthy();
	});
});

describe("UnResultErr<>", () => {
	test("型のユニットテスト", () => {
		type Got = UnResultErr<Result<string, Error>>;
		type Want = Error;

		const result: Equals<Got, Want> = true;
		expect(result).toBeTruthy();
	});
});

describe("NotUndefined<>", () => {
	test("型のユニットテスト", () => {
		type Got = NotUndefined<"key-a" | "key-b" | "key-c" | undefined>;
		type Want = "key-a" | "key-b" | "key-c";

		const result: Equals<Got, Want> = true;
		expect(result).toBeTruthy();
	});
});

describe("listAllElements()()", () => {
	test.each([
		{
			stringUnion: ["key-a", "key-b", "key-c"],
			want: ["key-a", "key-b", "key-c"],
		},
		{
			stringUnion: ["key-a", "key-b", "key-c", undefined],
			want: ["key-a", "key-b", "key-c", undefined],
		},
	])("listAllElements($stringUnion) => $want", ({ stringUnion, want }) => {
		const got = listAllElements()(...stringUnion);
		expect(got).toEqual(expect.arrayContaining(want));
	});
});

describe("joinAllElements()", () => {
	test.each([
		{
			stringUnion: ["key-a", "key-b", "key-c"],
			want: '"key-a","key-b","key-c"',
		},
		{
			stringUnion: ["key-a", "key-b", "key-c", undefined],
			want: '"key-a","key-b","key-c"',
		},
	])("joinAllElements($stringUnion) => $want", ({ stringUnion, want }) => {
		const got = joinAllElements(stringUnion);
		expect(got).toBe(want);
	});
});
