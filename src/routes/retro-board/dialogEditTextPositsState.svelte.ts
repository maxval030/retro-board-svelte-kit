let isOpenDialogEditPosits = $state<boolean>(false);

export function dialogEditTextPositsState() {
	return {
		setOpenDialogEditPosits() {
			isOpenDialogEditPosits = true;
		},
		setOffDialogEditPosits() {
			isOpenDialogEditPosits = false;
		},
		get isOpenDialogEditPosits() {
			return isOpenDialogEditPosits;
		}
	};
}
