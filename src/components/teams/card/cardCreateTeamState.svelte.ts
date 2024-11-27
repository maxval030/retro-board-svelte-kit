let isOpenDialogCreateTeam = $state<boolean>(false);

export function handleCardCreateTeamState() {
	// function setEmptyCard(value: EmptyCardListType) {
	// 	emptyCardSelect = value;
	// }

	return {
		setIsOpenDialogCreateTeam(value: boolean) {
			isOpenDialogCreateTeam = value;
		},
		get isOpenDialogCreateTeam() {
			return isOpenDialogCreateTeam;
		}
		// setEmptyCard(value: EmptyCardListType) {
		// 	setEmptyCard(value);
		// },
	};
}
