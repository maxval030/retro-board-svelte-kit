import pb from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase-types';

let isBoardPrivate = $state<boolean>(false);

export function handleBoardState() {
	async function updateBoardIsPrivate(id: string, newIsPrivate: boolean) {
		await pb.collection(Collections.RetroBoards).update(id, { isPrivateMode: newIsPrivate });
	}

	function setIsBoardPrivate(isPrivate: boolean) {
		isBoardPrivate = isPrivate;
	}

	return {
		async updateBoardIsPrivate(id: string, isPrivate: boolean) {
			setIsBoardPrivate(isPrivate);
			await updateBoardIsPrivate(id, isPrivate);
		},
		setIsBoardPrivate(isPrivate: boolean) {
			setIsBoardPrivate(isPrivate);
		},
		get isBoardPrivate() {
			return isBoardPrivate;
		}
	};
}
