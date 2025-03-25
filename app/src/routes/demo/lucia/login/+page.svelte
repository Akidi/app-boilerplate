<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { form, data }: { form: ActionData, data?: PageServerData } = $props();

	let users = $derived(data?.users || []);
</script>

<h1 class="text-2xl font-bold mb-4">Login / Register</h1>

<form method="post" action="?/login" use:enhance class="space-y-4 max-w-sm mb-8">
	<div class="flex flex-col">
		<label for="username" class="mb-1 text-sm font-medium text-gray-700">Username</label>
		<input id="username" name="username" class="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
	</div>
	<div class="flex flex-col">
		<label for="password" class="mb-1 text-sm font-medium text-gray-700">Password</label>
		<input id="password" type="password" name="password" class="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
	</div>
	<div class="flex gap-2">
		<button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button>
		<button formaction="?/register" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Register</button>
	</div>
</form>

{#if form?.message}
	<p class="text-red-600 text-sm mb-6">{form.message}</p>
{/if}


<div class="overflow-x-auto rounded-md shadow-sm border border-gray-300">
	<table class="min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr>
				<th scope="col" class="w-10 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">✖</th>
				<th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-100 bg-white">
			{#each users as user}
				<tr class="hover:bg-gray-50">
					<td class="text-center">
						<form method="post" action="?/delete">
							<input type="hidden" name="id" value={user.id} />
							<button type="submit" class="text-red-500 hover:text-red-700 text-base font-bold">&times;</button>
						</form>
					</td>
					<td class="px-4 py-2 text-sm text-gray-800">{user.username}</td>
				</tr>
			{:else}
				<tr>
					<td colspan="2" class="px-4 py-4 text-center text-sm text-gray-500">No users found</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
