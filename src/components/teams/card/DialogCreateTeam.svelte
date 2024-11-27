<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Textarea } from '$lib/components/ui/textarea';
	import { handleCardCreateTeamState } from './cardCreateTeamState.svelte';
	type Props = {
		isOpen: boolean;
	};

	const { isOpen }: Props = $props();

	const { setIsOpenDialogCreateTeam } = handleCardCreateTeamState();
</script>

<Dialog.Root open={isOpen} onOpenChange={() => setIsOpenDialogCreateTeam(false)} controlledOpen>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Team</Dialog.Title>
		</Dialog.Header>
		<form method="post" action="?/createTeam">
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Textarea class="col-span-4" name="teamTitle" placeholder="Type your team title." />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Submit</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
