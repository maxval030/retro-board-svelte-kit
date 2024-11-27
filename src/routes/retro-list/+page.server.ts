import type { Actions } from './$types';
// import pb from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async () => {
		try {
			console.log('asdasdasd');
			// await pb.collection('users').authWithOAuth2({ provider: 'google' });
			// console.log('🚀 ~ googleAccountLogin: ~ data:', data);
			// // const authData =
			// // console.log('🚀 ~ googleAccountLogin: ~ authData:', authData);
			// console.log(pb.authStore.isValid);
			// console.log(pb.authStore.token);
		} catch {
			throw redirect(303, '/retro-list');
		}
		// console.log(pb.authStore.record.id);
	}
	// googleAccountRegister: async () => {
	// 	console.log('googleAccountLogin');
	// 	// TODO register the user
	// }
} satisfies Actions;
