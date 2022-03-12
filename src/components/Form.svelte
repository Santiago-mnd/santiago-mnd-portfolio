<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import supabase from '$lib/supabase';
	import Alert from './Alert.svelte';

	export let title = '';
	export let description = '';
	export let id = '';
	export let filename = '';
	export let technologies = '';
	export let deploy = '';
	let file = null;
	let alert = false;

	const savePost = async () => {
		const filename = `${technologies}/${Date.now()}`;
		const image = await supabase.storage
			.from('images')
			.upload(filename, file, { cacheControl: '3600', upsert: false });

		const { publicURL } = await supabase.storage.from('images').getPublicUrl(filename);

		const newPost = await supabase.from('projects').insert({
			title,
			description,
			technologies,
			image: publicURL,
			filename: filename,
			deploy
		});

		console.log(newPost);

		if (newPost.status === 201) {
			title = '';
			description = '';
			deploy = '';
			technologies = '';
			alert = true;
		}
	};

	const editPost = async () => {
		if (file === null) {
			const edit = await supabase.from('projects').update({ title, description }).match({ id });

			if (edit.status === 200) {
				goto('/admin/home');
			}
		} else {
			const data = await supabase.storage.from('images').remove([filename]);
			const fileName = `${technologies}/${Date.now()}`;
			const image = await supabase.storage
				.from('images')
				.upload(filename, file, { cacheControl: '3600', upsert: false });
			const { publicURL } = await supabase.storage.from('images').getPublicUrl(filename);
			const edit = await supabase
				.from('projects')
				.update({ title, description, filename: fileName, image: publicURL, deploy, technologies })
				.match({ id });

			if (edit.status === 200) {
				goto('/admin/home');
			}
		}
	};

	const cleanAlert = () => {
		alert = false;
	};

	const getFile = (e) => {
		file = !!e.target.files.length && e.target.files[0];
	};
</script>

<div class="form-control">
	<label for="title" class="label">
		<span class="label-text">Título</span>
	</label>
	<input
		on:click={cleanAlert}
		class="input input-primary input-bordered"
		type="text"
		id="title"
		bind:value={title}
		placeholder="Título"
		autocomplete="off"
	/>
	<label for="technologies" class="label">
		<span class="label-text">Tecnologías</span>
	</label>
	<input
		class="input input-primary input-bordered"
		type="text"
		id="technologies"
		bind:value={technologies}
		placeholder="Javascript, Svelte, Tailwind..."
		autocomplete="off"
	/>
	<label for="deploy" class="label">
		<span class="label-text">Deploy</span>
	</label>
	<input
		class="input input-primary input-bordered"
		type="text"
		id="deploy"
		bind:value={deploy}
		placeholder="Link de deploy"
		autocomplete="off"
	/>
	<label for="description" class="label">
		<span class="label-text">Descripción</span>
	</label>
	<input
		type="text"
		class="textarea h-24 textarea-bordered textarea-primary"
		id="description"
		bind:value={description}
	/>
	<label for="imagen" class="label">
		<span class="label-text">Imagen</span>
	</label>
	<input type="file" id="imagen" on:change={getFile} />
	<input type="hidden" bind:value={id} />
	{#if id === ''}
		<button class="btn mt-3" on:click={savePost}> Guardar projects </button>
	{:else}
		<button class="btn mt-3" on:click={editPost}> Edit project </button>
	{/if}
	{#if alert}
		<Alert message="Post guardado." />
	{/if}
</div>
