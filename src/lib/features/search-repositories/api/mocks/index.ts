import { setupServer } from "msw/node";

import { ok200 as getSearchRepositories } from "./search-repositories";

const handlers = [getSearchRepositories];

export const githubServer = setupServer(...handlers);
