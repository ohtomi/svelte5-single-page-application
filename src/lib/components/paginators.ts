type ListPageNumbersReturn = {
	previous: number;
	next: number;
	pages: Array<number>;
};

export const listPageNumbers = (
	currentPage: number,
	lastPage: number,
	pagingSize: number = 10,
): ListPageNumbersReturn => {
	if (lastPage <= pagingSize) {
		/**
		 * lastPage が pagingSize 以下のときは、すべてを列挙する
		 *
		 * 01 02 03 04 05 06 07 08 09
		 *  ^
		 * |                        |
		 *
		 */

		return {
			previous: toPrevious(currentPage),
			next: toNext(currentPage, lastPage),
			pages: Array.from({ length: lastPage }).map((_, i) => i + 1),
		};
	} else {
		/**
		 * 可能であれば current が pages の中央に位置するように current の左側に pages を積む
		 *
		 * 01 02 03 04 05 06 07 08 09 10
		 *           ^
		 * |                           |
		 *
		 *
		 * 01 02 03 04 05 06 07 08 09 10
		 *              ^
		 * |                           |
		 *
		 *
		 * 02 03 04 05 06 07 08 09 10 11
		 *              ^
		 * |                           |
		 *
		 *
		 * 02 03 04 05 06 07 08 09 10 11  *** 11 is lastPage
		 *                 ^
		 * |                           |
		 *
		 */

		const leftSize = pagingSize - Math.floor(pagingSize / 2) - 1;
		const rightSize = pagingSize - leftSize - 1;

		const origin =
			currentPage <= leftSize
				? 1
				: lastPage < currentPage + rightSize
					? lastPage - pagingSize + 1
					: currentPage - leftSize;

		return {
			previous: toPrevious(currentPage),
			next: toNext(currentPage, lastPage),
			pages: Array.from({ length: pagingSize }).map((_, i) => i + origin),
		};
	}
};

const toPrevious = (currentPage: number): number => {
	return currentPage > 1 ? currentPage - 1 : 1;
};

const toNext = (currentPage: number, lastPage: number): number => {
	return currentPage < lastPage ? currentPage + 1 : lastPage;
};
