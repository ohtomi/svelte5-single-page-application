export const errorWithCause =
    <T extends Error>(ctor: new (message?: string, options?: { cause: unknown }) => T) =>
        (message?: string) =>
            (cause: unknown): T => {
                const options =
                    isError(cause) ?
                        {cause: cause} :
                        isString(cause) ?
                            {cause} :
                            isToStringer(cause) ?
                                {cause: cause.toString()} :
                                undefined;
                return new ctor(message, options);
            };

const isError = (cause: unknown): cause is Error => {
    return cause instanceof Error;
};

const isString = (cause: unknown): cause is string => {
    return typeof cause === 'string';
};

type ToStringer = {
    toString: () => string;
}

const isToStringer = (cause: unknown): cause is ToStringer => {
    return !!cause && typeof cause === 'object' && 'toString' in cause && typeof cause.toString === 'function';
};

export class ValidationError extends Error {
    name = 'ValidationError';
}

export class SearchRepositoriesApiError extends Error {
    name = 'SearchRepositoriesApiError';
}

export const toSearchRepositoriesApiError = errorWithCause(SearchRepositoriesApiError);
