<script>
	import supabase from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	let email = '';
	let pass = '';
	let token = '';

	// Si estamos del lado del navegador
	if (browser) {
		token = localStorage.getItem('token');
		if (token !== null) {
			goto('/admin/home');
		}
	}

	const registrar = async () => {
		const { user, error } = await supabase.auth.signUp({
			email,
			password: pass
		});
	};

	const login = async () => {
		const { user, session, error } = await supabase.auth.signIn({
			email,
			password: pass
		});

		if (user.role === 'authenticated') {
			localStorage.setItem('token', session.access_token);
			goto('/admin/home');
		}
	};
</script>

<div class="form-control">
	<label for="email" class="input-group input-group-vertical">
		<span>Email</span>
		<input
			bind:value={email}
			type="email"
			id="email"
			placeholder="info@site.com"
			class="input input-bordered"
			autocomplete="off"
		/>
	</label>
	<label for="pass" class="input-group input-group-vertical">
		<span>Password</span>
		<input
			bind:value={pass}
			type="password"
			id="pass"
			placeholder="********"
			class="input input-bordered"
		/>
	</label>
	<div class="flex flex-wrap gap-4">
		<button class="btn mt-5" on:click={login}>Iniciar sesión</button>
		<!-- <button class="btn mt-5" on:click={registrar}>Registrarse</button> -->
	</div>
</div>
