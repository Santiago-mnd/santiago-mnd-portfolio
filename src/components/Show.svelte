<script>
	import supabase from '$lib/supabase';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	import 'sweetalert2/dist/sweetalert2.css';

	import Loader from './Loader.svelte';

	let projects = [];

	onMount(async () => {
		let { data } = await supabase.from('projects').select('*').order('id', { ascending: true });
		projects = data;
	});

	const alertDelete = (id, filename) => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'Se eliminará permanentemente...',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Borrar'
		}).then((result) => {
			if (result.isConfirmed) {
				deletePost(id, filename);
			}
		});
	};

	const deletePost = async (id, filename) => {
		const data = await supabase.storage.from('images').remove([filename]);

		if (data) {
			await supabase.from('projects').delete().match({ id });
			location.reload();
		}
	};
</script>

{#each projects as project}
	<a
		href={project.deploy}
		target="_blank"
		class="transition duration-150 ease-linear hover:scale-110 mt-5 animate__animated animate__fadeIn"
	>
		<div
			class="card w-96 h-full bg-base-200 shadow-xl mt-5 transition duration-150 ease-linear hover:shadow-2xl"
		>
			<figure><img src={project.image} alt={project.title} /></figure>
			<div class="card-body">
				<h2 class="card-title">
					{project.title}
					<!-- <div class="badge badge-secondary">NEW</div> -->
				</h2>
				<p class="text-justify">{project.description}</p>
				<div class="card-actions justify-end mt-2">
					{#each project.technologies.split(',') as technologie}
						<div class="badge badge-outline">{technologie}</div>
					{/each}
				</div>
				<a class="btn btn-secondary mt-5" href={`/edit/${project.id}`}> Editar </a>
				<button class="btn btn-warning" on:click={() => alertDelete(project.id, project.filename)}>
					Delete
				</button>
			</div>
		</div>
	</a>
{:else}
	<div class="container max-w-max mx-auto">
		<Loader />
	</div>
{/each}
