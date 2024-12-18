import { describe, expect, test } from "vitest";

import { errorWithCause } from "./errors";

describe("errorWithCause()()()", () => {
	test("Errorコンストラクターが渡されたとき、Errorが返される", () => {
		const got = errorWithCause(Error)("generic.error")("any.cause");
		expect(got.name).toBe("Error");
		expect(got.message).toBe("generic.error");
		expect(got.cause).toBe("any.cause");
	});
});
