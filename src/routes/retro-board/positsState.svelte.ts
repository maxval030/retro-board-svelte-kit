import type { RectConfig } from 'konva/lib/shapes/Rect';
import { colorPickState } from './colorPickState.svelte';

const positsList = $state<RectConfig[]>([]);

type PositionPointer = {
	x: number;
	y: number;
};
export function positsState() {
	function setPositsList(positionPointer: PositionPointer) {
		const { positsSetColor } = colorPickState();

		positsList.push({
			x: positionPointer?.x,
			y: positionPointer?.y,
			width: 130,
			height: 150,
			fill: positsSetColor,
			draggable: true,
			id: new Date().getTime().toString()
		});
	}

	return {
		setPositsList(positionPointer: PositionPointer) {
			setPositsList(positionPointer);
		},
		get positsList() {
			return positsList;
		}
	};
}
