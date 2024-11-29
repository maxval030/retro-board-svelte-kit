import type { RectConfig } from 'konva/lib/shapes/Rect';
import { colorPickState } from './colorPickState.svelte';
// import { uuidv7 } from 'uuidv7';
import {
	Collections,
	ItemsOnBoardTypeItemOptions
	// type ItemsOnBoardResponse
} from '$lib/pocketbase-types';
import pb from '$lib/pocketbase';

export type PositsType = RectConfig & {
	detail: string;
};

let positsList = $state<PositsType[]>([]);
let positsSelect = $state<PositsType | undefined>();
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
			const posit = positsList.find((val) => val.id === id);
			if (posit) {
				setUpdatePositsList(posit);
			}
			await pb.collection(Collections.ItemsOnBoard).update<PositsType>(id, {
				x,
				y
			});
		}
	}

	function setUpdatePositsList(positsDetail: PositsType) {
		const indexOfPositsList = positsList.findIndex((posit) => posit.id === positsDetail.id);

		positsList[indexOfPositsList] = positsDetail;
	}

	function setPositsList(positsDetail: PositsType) {
		positsList.push(positsDetail);
	}

	return {
		setPositsToList(positsDetail: PositsType) {
			setPositsList(positsDetail);
		},
		setPositsList(positsList: PositsType[]) {
			positsList.map((data) => setPositsList(data));
		},
		setUpdatePositsList(positsDetail: PositsType) {
			setUpdatePositsList(positsDetail);
		},
		async handleCreatePosits(positionPointer: PositionPointer, boardId: string) {
			await handleCreatePosits(positionPointer, boardId);
		},
		async handleUpdatePositsPosition(x: number, y: number, id: string) {
			await handleUpdatePositsPosition(x, y, id);
		},
		clearPositsList() {
			positsList = [];
		},
		get positsList() {
			return positsList;
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
