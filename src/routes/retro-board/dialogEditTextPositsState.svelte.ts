let isOpenDialogEditPosits = $state<boolean>(false);
export function dialogEditTextPositsState() {
	return {
		setOpenDialogEditPosits(isOpen: boolean) {
			isOpenDialogEditPosits = isOpen;
		},
		setOffDialogEditPosits() {
			isOpenDialogEditPosits = false;
		},
		get isOpenDialogEditPosits() {
			return isOpenDialogEditPosits;
		}
	};
}
