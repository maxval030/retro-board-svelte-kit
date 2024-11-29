import pb from '$lib/pocketbase';
import { Collections, RetroBoardsStatusOptions } from '$lib/pocketbase-types';

export const actions = {
	createRetroBoard: async ({ request }) => {
		const data = await request.formData();

		const dataToCreate = {
			title: data.get('retroBoardTitle'),
			teamId: data.get('teamId'),
			status: RetroBoardsStatusOptions.active
		};

		await pb.collection(Collections.RetroBoards).create(dataToCreate);
	}
};
