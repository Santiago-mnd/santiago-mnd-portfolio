<script>
	import Footer from '../components/Footer.svelte';
	import Nav from '../components/Nav.svelte';
	import '../app.css';
</script>

<Nav />
<main class="container p-8 max-w-full">
	<slot />
</main>
