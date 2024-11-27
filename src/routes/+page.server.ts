import pb from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase-types';
import type { Actions } from './$types';
// import pb from '$lib/pocketbase';
// import { redirect } from '@sveltejs/kit';

export const actions = {
	// googleAccountLogin: async () => {
	// 	try {
	// 		// await pb.collection('users').authWithOAuth2({ provider: 'google' });
	// 		// console.log('🚀 ~ googleAccountLogin: ~ data:', data);
	// 		// // const authData =
	// 		// // console.log('🚀 ~ googleAccountLogin: ~ authData:', authData);
	// 		// console.log(pb.authStore.isValid);
	// 		// console.log(pb.authStore.token);
	// 	} catch {
	// 		throw redirect(303, '/retro-list');
	// 	}
	// 	// console.log(pb.authStore.record.id);
	// },
	// googleAccountRegister: async () => {
	// 	console.log('googleAccountLogin');
	// 	// TODO register the user
	// },
	createTeam: async ({ request }) => {
		// console.log('🚀 ~ default: ~ request:', request);
		const data = await request.formData();

		const dataToCreate = {
			title: data.get('teamTitle')
		};
		await pb.collection(Collections.Teams).create(dataToCreate);
		// const form = await superValidate(event, zod(formSchema));
		// if (!form.valid) {
		// 	return fail(400, {
		// 		form
		// 	});
		// }
		// return {
		// 	form
		// };
	}
} satisfies Actions;
