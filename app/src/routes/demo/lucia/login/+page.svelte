<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { form, data }: { form: ActionData, data?: PageServerData } = $props();

	let users = $derived(data?.users || []);
</script>

<h1>Login/Register</h1>
<form method="post" action="?/login" use:enhance>
	<label>
		Username
		<input name="username" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<button>Login</button>
	<button formaction="?/register">Register</button>
</form>
<p style="color: red">{form?.message ?? ''}</p>


<table>
	<thead>
		<tr>
			<th>Username</th>
		</tr>
	</thead>
	<tbody>
		{#each users as user}
			<tr>
				<td>{user.username}</td>
			</tr>
		{:else}
			<tr>
				<td>No users found</td>
			</tr>
		{/each}
	</tbody>
</table>