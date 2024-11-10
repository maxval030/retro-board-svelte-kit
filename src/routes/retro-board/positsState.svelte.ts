import type { RectConfig } from 'konva/lib/shapes/Rect';
import { colorPickState } from './colorPickState.svelte';
import { uuidv7 } from 'uuidv7';

let positsList = $state<RectConfig[]>([]);
let positsIdSelect = $state<string | undefined>('');
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
			id: uuidv7()
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
	function setPosits(value: string | undefined) {
		positsIdSelect = value;
	}

	return {
		setPosits(value: string | undefined) {
			setPosits(value);
		},
		get positsIdSelected() {
			return positsIdSelect;
		}
	};
}
