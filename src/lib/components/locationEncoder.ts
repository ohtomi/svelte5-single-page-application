export const encodeSearchParameters = (q: string, sort?: string, order?: string, per_page?: number, page?: number): string => {
    return [
        encodeQOption(q),
        encodeSortOption(sort),
        encodeOrderOption(order),
        encodePerPageOption(per_page),
        encodePageOption(page),
    ].join('');
};

const encodeQOption = (q: string): string => {
    return q ? `?q=${encodeURIComponent(q)}` : '';
};

const encodeSortOption = (sort?: string): string => {
    return sort ? `&sort=${encodeURIComponent(sort)}` : '';
};

const encodeOrderOption = (order?: string): string => {
    return order ? `&order=${encodeURIComponent(order)}` : '';
};

const encodePerPageOption = (per_page?: number): string => {
    return per_page ? `&per_page=${encodeURIComponent(per_page)}` : '';
};

const encodePageOption = (page?: number): string => {
    return page ? `&page=${encodeURIComponent(page)}` : '';
};
