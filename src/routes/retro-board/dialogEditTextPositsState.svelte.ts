let isOpenDialogEditPosits = $state<boolean>(false);
export function dialogEditTextPositsState() {
	return {
		setOpenDialogEditPosits(isOpen: boolean) {
			console.log('setOpenDialogEditPosits', isOpenDialogEditPosits);
			console.log('isOpen', isOpen);
			isOpenDialogEditPosits = isOpen;
		},
		get isOpenDialogEditPosits() {
			return isOpenDialogEditPosits;
		}
	};
}
