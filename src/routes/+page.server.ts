import type { PageServerLoad } from "./$types";
import { invokeSearchRepositories } from "$lib/features/search-repositories";

type ViewPageData = Awaited<ReturnType<typeof invokeSearchRepositories>>;

export const load: PageServerLoad = async ({ url }): Promise<ViewPageData> => {
	return invokeSearchRepositories(url.searchParams);
};
