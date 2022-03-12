<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import supabase from '$lib/supabase';
	import Form from '../../components/Form.svelte';

	let id = $page.params.id;
	let title = '';
	let description = '';
	let technologies = '';
	let filename = '';
	let deploy = '';

	onMount(async () => {
		let { data } = await supabase.from('projects').select('*').eq('id', id);
		title = data[0].title;
		description = data[0].description;
		technologies = data[0].technologies;
		deploy = data[0].deploy;
	});
</script>

<h2 class="text-4xl">Editar post:</h2>
<Form {title} {description} {technologies} {deploy} {id} {filename} />
