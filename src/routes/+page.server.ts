import type { PageServerLoad } from "./$types";
import { invokeSearchRepositories } from "$lib/features/search-repositories";

type InvokeSearchRepositoriesReturn = Awaited<
	ReturnType<typeof invokeSearchRepositories>
>;

export const load: PageServerLoad = async ({
	url,
}): Promise<InvokeSearchRepositoriesReturn> => {
	return invokeSearchRepositories(url.searchParams);
};
