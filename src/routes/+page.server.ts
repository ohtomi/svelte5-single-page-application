import type { PageServerLoad } from "./$types";
import { invokeSearchRepositories } from "$lib/widgets/search-repositories";

type InvokeSearchRepositoriesReturn = Awaited<
	ReturnType<typeof invokeSearchRepositories>
>;

export const load: PageServerLoad = async ({
	url,
}): Promise<InvokeSearchRepositoriesReturn> => {
	return invokeSearchRepositories({
		q: url.searchParams.get("q"),
		sort: url.searchParams.get("sort"),
		order: url.searchParams.get("order"),
		per_page: url.searchParams.get("per_page"),
		page: url.searchParams.get("page"),
	});
};
