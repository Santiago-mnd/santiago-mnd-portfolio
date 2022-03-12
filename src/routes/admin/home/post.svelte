<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import Form from '../../../components/Form.svelte';

	let token = '';
	if (browser) {
		token = localStorage.getItem('token');
		if (token === null) {
			goto('/');
		}
	}
</script>

<div class="container mx-auto max-w-2xl">
	<h2 class="text-4xl mb-5">Nuevo proyecto:</h2>
	<Form />
</div>
