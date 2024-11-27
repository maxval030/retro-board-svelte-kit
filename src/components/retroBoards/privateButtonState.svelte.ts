let isPrivateMode = $state<boolean>(false);
export const privateButtonState = () => {
	function setPrivateMode() {
		isPrivateMode = !isPrivateMode;
	}
	return {
		setPrivateMode() {
			setPrivateMode();
		},
		get isPrivateMode() {
			return isPrivateMode;
		}
	};
};
