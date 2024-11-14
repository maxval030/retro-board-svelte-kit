import type { RectConfig } from 'konva/lib/shapes/Rect';
import { colorPickState } from './colorPickState.svelte';
import { uuidv7 } from 'uuidv7';

export type PositsListType = RectConfig & {
	text: string;
};

let positsList = $state<PositsListType[]>([]);
let positsSelect = $state<PositsListType | undefined>();
type PositionPointer = {
	x: number;
	y: number;
};
export function handlePositsListState() {
	function setPositsList(positionPointer: PositionPointer) {
		const { positsSetColor } = colorPickState();

		positsList.push({
			x: positionPointer?.x,
			y: positionPointer?.y,
			width: 130,
			height: 150,
			fill: positsSetColor,
			draggable: true,
			id: uuidv7(),
			text: ''
		});
	}

	return {
		setPositsList(positionPointer: PositionPointer) {
			setPositsList(positionPointer);
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
	function setPosits(value: PositsListType) {
		positsSelect = value;
	}

	function updatePositsText(positsEdits: PositsListType, text: string) {
		const { id } = positsEdits;

		if (id) {
			const posits = positsList.find((posit) => posit.id === id);
			if (posits) {
				posits.text = text;
			}
		}
	}

	return {
		setPosits(value: PositsListType) {
			setPosits(value);
		},
		updatePositsText(positsEdits: PositsListType, text: string) {
			updatePositsText(positsEdits, text);
		},
		get positsSelected() {
			return positsSelect;
		}
	};
}
