<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');

const router = useRouter();

function register(): void {
	createUserWithEmailAndPassword(getAuth(), email.value, password.value)
		.then(() => {
			console.log('Success!');
			router.push('/main');
		})
		.catch(() => console.log('something went wrong!'));
}
</script>

<template>
	<p>Register Page</p>
	<input type="email" placeholder="Email" v-model="email" />
	<input type="password" placeholder="Password" v-model="password" />
	<button @click="register">Register</button>
</template>
