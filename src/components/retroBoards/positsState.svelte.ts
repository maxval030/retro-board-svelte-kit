import type { RectConfig } from 'konva/lib/shapes/Rect';
import { colorPickState } from './colorPickState.svelte';
import { v4 as uuidv4 } from 'uuid';
import { Collections, ItemsOnBoardTypeItemOptions } from '$lib/pocketbase-types';
import pb from '$lib/pocketbase';

export type PositsType = RectConfig & {
	detail: string;
};

let positsList = $state<PositsType[]>([]);
let positsSelect = $state<PositsType | undefined>();

let actionIdLocal = $state<string | null>(null);

type PositionPointer = {
	x: number;
	y: number;
};
export function handlePositsListState() {
	async function handleCreatePosits(positionPointer: PositionPointer, boardId: string) {
		const { positsSetColor } = colorPickState();

		const positsDetail: PositsType = {
			x: positionPointer?.x,
			y: positionPointer?.y,
			width: 130,
			height: 150,
			fill: positsSetColor,
			draggable: true,
			detail: ''
		};

		// <ItemsOnBoardResponse>

		const result = await pb.collection(Collections.ItemsOnBoard).create({
			detail: positsDetail.detail,
			typeItem: ItemsOnBoardTypeItemOptions.posits,
			x: positsDetail.x,
			y: positsDetail.y,
			fill: positsDetail.fill,
			draggable: positsDetail.draggable,
			retroboardId: boardId,
			width: positsDetail.width,
			height: positsDetail.height
		});

		positsDetail.id = result.id;

		// setPositsList(positsDetail);
	}

	async function handleUpdatePositsPosition(x: number, y: number, id: string) {
		if (id) {
			// const posit = positsList.find((val) => val.id === id);
			if (actionIdLocal === null) {
				actionIdLocal = uuidv4();
			}
			// if (posit) {
			// 	lastPositsId = posit.id!;
			// 	setUpdatePosits(posit);
			// }
			await pb.collection(Collections.ItemsOnBoard).update<PositsType>(id, {
				x,
				y,
				actionId: actionIdLocal
			});
		}
	}

	async function handleUpdatePositsComment(id: string, detail: string) {
		if (id) {
			await pb.collection(Collections.ItemsOnBoard).update(id, {
				detail
			});
		}
	}

	async function handleDeletePosits(id: string) {
		if (id) {
			await pb.collection(Collections.ItemsOnBoard).delete(id);
		}
	}

	function setUpdatePosits(positsDetail: PositsType) {
		const indexOfPositsList = positsList.findIndex((posit) => posit.id === positsDetail.id);
		//if lastPositsId === positsDetail.id, this not move more position in current session
		// console.log(lastPositsId, positsDetail.id);
		// if (lastPositsId === positsDetail.id) {
		// 	return;
		// }

		positsList[indexOfPositsList] = positsDetail;
	}

	function setDeletePosits(id: string) {
		const indexOfPositsList = positsList.findIndex((posit) => posit.id === id);
		if (indexOfPositsList === -1) {
			return;
		}

		positsList.splice(indexOfPositsList, 1);
	}

	function setPositsListForBoard(positsDetailList: PositsType[]) {
		positsList = positsDetailList;
	}

	function setPositsList(positsDetail: PositsType) {
		positsList.push(positsDetail);
	}

	return {
		setPositsToList(positsDetail: PositsType) {
			setPositsList(positsDetail);
		},
		setPositsList(positsListVal: PositsType[]) {
			// positsList.map((data) => setPositsList(data));
			positsList = positsListVal;
		},
		setUpdatePosits(positsDetail: PositsType) {
			setUpdatePosits(positsDetail);
		},
		setPositsListForBoard(positsDetailList: PositsType[]) {
			setPositsListForBoard(positsDetailList);
		},
		setDeletePosits(id: string) {
			setDeletePosits(id);
		},
		async handleCreatePosits(positionPointer: PositionPointer, boardId: string) {
			await handleCreatePosits(positionPointer, boardId);
		},
		async handleUpdatePositsPosition(x: number, y: number, id: string) {
			await handleUpdatePositsPosition(x, y, id);
		},
		async handleUpdatePositsComment(id: string, detail: string) {
			await handleUpdatePositsComment(id, detail);
		},
		async handleDeletePosits(id: string) {
			await handleDeletePosits(id);
		},
		clearPositsList() {
			positsList = [];
		},
		clearActionIdLocal() {
			actionIdLocal = null;
		},
		get positsList() {
			return positsList;
		},
		get actionIdLocal() {
			return actionIdLocal;
		}
	};
}

export function handlePositsState() {
	function setPosits(value: PositsType) {
		positsSelect = value;
	}

	function updatePositsText(positsEdits: PositsType, text: string) {
		const { id } = positsEdits;

		if (id) {
			const posits = positsList.find((posit) => posit.id === id);
			if (posits) {
				posits.detail = text;
			}
		}
	}

	return {
		setPosits(value: PositsType) {
			setPosits(value);
		},
		updatePositsText(positsEdits: PositsType, text: string) {
			updatePositsText(positsEdits, text);
		},
		get positsSelected() {
			return positsSelect;
		}
	};
}
