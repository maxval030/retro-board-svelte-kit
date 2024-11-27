let isOpenDialogEditPosits = $state<boolean>(false);

export function dialogTextPositsState() {
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
