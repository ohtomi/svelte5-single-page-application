import { describe, expect, test } from "vitest";

import { toSearchRepositoriesApiError } from "./errors";

describe("toSearchRepositoriesApiError()()", () => {
	test("Error型が渡されたとき、SearchRepositoriesApiErrorにラップされる", () => {
		const got = toSearchRepositoriesApiError("github.api.error")(
			new Error("generic.error"),
		);
		expect(got.name).toBe("SearchRepositoriesApiError");
		expect(got.message).toBe("github.api.error");
		expect(got.cause).toMatchObject({ message: "generic.error" });
	});

	test("string型が渡されたとき、SearchRepositoriesApiErrorにラップされる", () => {
		const got =
			toSearchRepositoriesApiError("github.api.error")("string.error");
		expect(got.name).toBe("SearchRepositoriesApiError");
		expect(got.message).toBe("github.api.error");
		expect(got.cause).toBe("string.error");
	});

	test("ToStringer型が渡されたとき、SearchRepositoriesApiErrorにラップされる", () => {
		const got = toSearchRepositoriesApiError("github.api.error")({
			toString: () => "toStringer.error",
		});
		expect(got.name).toBe("SearchRepositoriesApiError");
		expect(got.message).toBe("github.api.error");
		expect(got.cause).toBe("toStringer.error");
	});
});
