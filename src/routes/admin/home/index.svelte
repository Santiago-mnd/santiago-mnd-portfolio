<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import Show from '../../../components/Show.svelte';

	let token = '';
	if (browser) {
		token = localStorage.getItem('token');
		if (token === null) {
			goto('/');
		}
	}
</script>

<div class="mx-auto max-w-7xl">
	<h2 class="text-4xl">Todos los proyectos:</h2>
	<div class="grid mt-5 sm:grid-cols-3 sm:gap-6 justify-center">
		<Show />
	</div>
</div>
