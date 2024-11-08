const colorList = ['#c2d5f4', '#c9ffc7', '#ffdef5', '#ffffb7', '#ddfeff'];
let positsSetColor = $state(colorList[0]);

export function colorPickState() {
	function setColor(color: string) {
		positsSetColor = color;
	}

	return {
		setColor(color: string) {
			setColor(color);
		},
		get colorList() {
			return colorList;
		},
		get positsSetColor() {
			return positsSetColor;
		}
	};
}
