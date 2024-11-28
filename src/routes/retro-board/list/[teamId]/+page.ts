import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { handlerRetroBoardState } from './boardListState.svelte';
// import { dialogTextPositsState } from '../../../../components/retroBoards/dialogTextPositsState.svelte';
export const ssr = false;
export const load: PageLoad = async ({ params }) => {
	// if (params.teamId === 'hello-world') {
	try {
		const { teamId } = params;
		// return {
		// 	teamId: params.teamId
		// };

		//ใข้ state ได้
		const { setTeamId } = handlerRetroBoardState();
		setTeamId(teamId);
		// await getRetroBoardListByTeamId(teamId);
		//ใข้ state ได้

		// return {
		// 	retroBoardList: result.items
		// };
	} catch {
		error(404, 'Not found');
	}

	// }
};
