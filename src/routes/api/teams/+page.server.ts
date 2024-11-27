import pb from '$lib/pocketbase';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	createTeam: async ({ request }) => {
		const data = await request.formData();
		const dataToCreate = {
			title: data.get('teamTitle')
		};
		await pb.collection('teams').create(dataToCreate);
	}
} satisfies Actions;
