<script>
	import { post } from '$lib/utils.js';
	let email = '';
	let username = '';
	let errors = null;
	let isLinkSent = false;
	$: buttonText = isLinkSent ? 'MagicLink Sent' : 'Send MagicLink';
	async function submitForm() {
		//const response = await post(`api/passwordless/send-link`, { email, username }, null);
		const response = await post(`login/register`, { email, username });
		console.log(response);

		//console.log(data)
		//errors = response.errors;

		if (response.sent) {
			console.log('email sent');
			isLinkSent = true;
		}
	}
</script>

<div
	class="	flex flex-col items-center
    		w-screen h-full gap-y-4
    		bg-primary py-16"
>
	<h1 class="text-2xl text-contrast z-20">The Reading Room</h1>
	<div
		class="flex flex-col z-10
        gap-y-4"
	>
		<form
			on:submit|preventDefault={submitForm}
			class="	flex flex-col 
        	gap-y-4 text-sm"
		>
			<div class="mx-auto">
				<label class="block" for="username">Username </label>
				<input
					bind:value={username}
					class="text-contrast placeholder-accent bg-primary border-solid border border-black px-2 py-1"
					type="text"
					id="username"
					name="username"
					placeholder="Enter Username"
					required
				/>
			</div>

			<div class="mx-auto">
				<label class="block" for="email">Email ID</label>
				<input
					bind:value={email}
					class="text-contrast placeholder-accent bg-primary border-solid border border-black px-2 py-1"
					type="text"
					id="username"
					name="email"
					placeholder="Enter email id"
					required
				/>
			</div>

			<div class="text-xs">
				<input class="accent-accent" type="checkbox" id="accept" name="accept" required />
				<label class="font-text align-middle " for="accept">
					I accept the
					<a class="underline" href="/terms-and-conditions"> terms and conditions</a>
				</label>
			</div>
			<button
				class="w-fit mx-auto bg-accent text-sm text-primary px-4 py-2"
				type="submit"
				disabled={isLinkSent}
				>{buttonText}
			</button>
		</form>

		<div class="mx-auto text-center text-sm underline">
			<a class="block" href="/login">Login</a>
			<a class="block" href="/">Continue as guest</a>
		</div>
	</div>
	<img
		class="absolute bottom-0 z-0 w-full"
		src="/img/Main Illustration - Green-cropped.png"
		alt=""
	/>
</div>