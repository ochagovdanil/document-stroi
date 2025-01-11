<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut, type Auth } from 'firebase/auth';
import Toast from 'primevue/toast';
import useToastMessage from './app/model/useToastMessage';

const isLoggedIn = ref<boolean>(false);

const router = useRouter();
const toast = useToastMessage();

let auth: Auth | null = null;

onMounted(() => {
	auth = getAuth();

	onAuthStateChanged(auth, user => {
		if (user) isLoggedIn.value = true;
		else isLoggedIn.value = false;
	});
});

function signOutUser(): void {
	signOut(auth!)
		.then(() => router.push({ name: 'login' }))
		.catch(error =>
			toast('error', 'Ошибка!', `Возникла ошибка:\n${error}`)
		);
}
</script>

<template>
	<header>
		<nav v-if="isLoggedIn">
			<p>This header is visible only for authenticated users!</p>
			<button @click="signOutUser">Sign Out</button>
		</nav>
	</header>
	<RouterView />
	<Toast />
</template>
