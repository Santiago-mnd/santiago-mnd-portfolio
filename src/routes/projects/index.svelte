<script>
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import supabase from '$lib/supabase';
	import ShowPort from '../../components/ShowPort.svelte';

	let projects = [];
	// let technologie = '';

	onMount(async () => {
		let { data } = await supabase
			.from('projects')
			.select('*')
			.order('technologies', { ascending: true });
		projects = data;
	});
</script>

<svelte:head>
	<title>Proyectos</title>
	<meta
		name="description"
		content="Aquí podrás ver todos los proyectos que he hecho hasta la fecha, o al menos los más destacables, desde mi punto de vista."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl animate__animated animate__fadeIn">
	<h2 class="text-2xl md:text-4xl">Últimos proyectos:</h2>

	<div class="grid md:grid-cols-2 md:gap-6 xl:grid-cols-3 justify-center">
		<ShowPort {projects} />
	</div>
</div>
