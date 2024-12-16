import { describe, expect, test } from "vitest";

import { listPageNumbers } from "$lib/components/paginators";

describe("listPageNumbers", () => {
	describe("ページング件数よりもページ数が少ない場合、全ページが列挙される", () => {
		test.each([
			{
				currentPage: 1,
				lastPage: 9,
				pagingSize: 10,
				want: {
					previous: 1,
					next: 2,
					pages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				},
			},
			{
				currentPage: 2,
				lastPage: 9,
				pagingSize: 10,
				want: {
					previous: 1,
					next: 3,
					pages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				},
			},
			{
				currentPage: 9,
				lastPage: 9,
				pagingSize: 10,
				want: {
					previous: 8,
					next: 9,
					pages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				},
			},
		])(
			"listPageNumbers($currentPage, $lastPage, $pagingSize)",
			({ currentPage, lastPage, pagingSize, want }) => {
				const got = listPageNumbers(currentPage, lastPage, pagingSize);
				expect(got).toEqual(want);
			},
		);
	});

	describe("ページング件数よりもページ数が多い場合、ページング件数ぶんのページが列挙される", () => {
		test.each([
			{
				currentPage: 1,
				lastPage: 10,
				pagingSize: 10,
				want: {
					previous: 1,
					next: 2,
					pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				},
			},
			{
				currentPage: 9,
				lastPage: 10,
				pagingSize: 10,
				want: {
					previous: 8,
					next: 10,
					pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				},
			},
			{
				currentPage: 10,
				lastPage: 10,
				pagingSize: 10,
				want: {
					previous: 9,
					next: 10,
					pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				},
			},
		])(
			"listPageNumbers($currentPage, $lastPage, $pagingSize)",
			({ currentPage, lastPage, pagingSize, want }) => {
				const got = listPageNumbers(currentPage, lastPage, pagingSize);
				expect(got).toEqual(want);
			},
		);
	});

	describe("ページング件数よりもページ数が多い場合、なるべく現在ページがページング件数の中央に位置する", () => {
		test.each([
			{
				currentPage: 5,
				lastPage: 100,
				pagingSize: 10,
				want: {
					previous: 4,
					next: 6,
					pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				},
			},
			{
				currentPage: 6,
				lastPage: 100,
				pagingSize: 10,
				want: {
					previous: 5,
					next: 7,
					pages: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
				},
			},
		])(
			"listPageNumbers($currentPage, $lastPage, $pagingSize)",
			({ currentPage, lastPage, pagingSize, want }) => {
				const got = listPageNumbers(currentPage, lastPage, pagingSize);
				expect(got).toEqual(want);
			},
		);
	});
});
