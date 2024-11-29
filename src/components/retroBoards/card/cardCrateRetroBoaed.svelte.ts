let isOpenDialogCreateRetroBoard = $state<boolean>(false);

export function handleCardCreateRetroBoardState() {
	return {
		setIsOpenDialogCreateRetroBoard(value: boolean) {
			isOpenDialogCreateRetroBoard = value;
		},
		get isOpenDialogCreateRetroBoard() {
			return isOpenDialogCreateRetroBoard;
		}
	};
}
