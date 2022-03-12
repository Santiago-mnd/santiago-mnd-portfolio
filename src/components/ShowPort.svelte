<script>
	import Loader from './Loader.svelte';

	export let projects;
</script>

{#each projects as project}
	<a
		href={project.deploy}
		target="_blank"
		class="transition duration-150 ease-linear hover:scale-110 mt-5 animate__animated animate__fadeIn"
	>
		<div
			class="card  h-full bg-base-200 shadow-xl mt-5 lg:w-96 transition duration-150 ease-linear hover:shadow-2xl"
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
			</div>
		</div>
	</a>
{:else}
	<div class="container max-w-max mx-auto">
		<Loader />
	</div>
{/each}
