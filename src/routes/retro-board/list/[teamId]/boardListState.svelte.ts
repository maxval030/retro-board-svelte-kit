import pb from '$lib/pocketbase';
import { Collections, type RetroBoardsResponse } from '$lib/pocketbase-types';

let retroBoardListByTeamId = $state<RetroBoardsResponse[]>([]);
let teamIdState = $state<string>('');

export function handlerRetroBoardState() {
	async function getRetroBoardListByTeamId(teamId: string, page: number = 1, limit: number = 20) {
		const result = await pb
			.collection(Collections.RetroBoards)
			.getList<RetroBoardsResponse>(page, limit, {
				filter: pb.filter('teamId={:teamId}', { teamId }),
				sort: '-updated'
			});

		retroBoardListByTeamId = result.items;
	}

	async function crateRetroBoard(teamId: string, title: string) {
		const data = {
			title,
			privateMode: false,
			status: 'active',
			teamId
		};

		await pb.collection(Collections.RetroBoards).create(data);

		// retroBoardListByTeamId = [...retroBoardListByTeamId, result];
	}

	return {
		async getRetroBoardListByTeamId() {
			getRetroBoardListByTeamId(teamIdState);
		},
		async crateRetroBoard(title: string) {
			crateRetroBoard(teamIdState, title);
		},
		setTeamId(teamId: string) {
			teamIdState = teamId;
		},
		clearTeamId() {
			teamIdState = '';
		},
		clearRetroBoardListByTeamId() {
			retroBoardListByTeamId = [];
		},
		// updatePositsText(positsEdits: PositsListType, text: string) {
		// 	updatePositsText(positsEdits, text);
		// },
		get retroBoardListByTeamId() {
			return retroBoardListByTeamId;
		},
		get teamIdState() {
			return teamIdState;
		}
	};
}
