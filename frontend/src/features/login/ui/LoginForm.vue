<script setup lang="ts">
import useToastMessage from '@/app/model/useToastMessage';
import loginFormSchema from '@/app/model/validation/LoginFormSchema';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	type Auth,
} from 'firebase/auth';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToastMessage();

const isLoginButtonSpinnerVisible = ref<boolean>(false); // The loading state of a 'sign in' button

// Sign in with email and password
function signIn(values: any): void {
	isLoginButtonSpinnerVisible.value = true;
	const auth: Auth = getAuth();

	signInWithEmailAndPassword(auth, values.email, values.password)
		.then(() => router.push({ name: 'projects' })) // Success
		.catch(error => {
			// Failure
			switch (error.code) {
				case 'auth/invalid-email':
					toast(
						'error',
						'Ошибка!',
						'Невалидный адрес электронной почты.'
					);
					break;
				case 'auth/invalid-credential':
					toast('error', 'Ошибка!', 'Неверный логин или пароль.');
					break;
				default:
					toast('error', 'Ошибка!', error.code);
					break;
			}
		})
		.finally(() => (isLoginButtonSpinnerVisible.value = false));
}

// Sign in via Google Provider (O-Auth)
function signInWithGoogle(): void {
	signInWithPopup(getAuth(), new GoogleAuthProvider())
		.then(() => router.push({ name: 'projects' }))
		.catch(error => toast('error', 'Ошибка!', error));
}
</script>

<template>
	<div class="flex justify-center">
		<div>
			<Form
				@submit="signIn"
				:validation-schema="loginFormSchema"
				class="w-[30rem]"
			>
				<div class="">
					<span class="text-content">Почта:</span>
					<Field
						type="email"
						name="email"
						class="w-full mt-2 text-content py-2 px-4 rounded-md border-2 border-silver focus:border-primary hover:border-primary outline-none"
					/>
					<ErrorMessage
						name="email"
						class="text-secondary font-semibold"
					/>
				</div>
				<div class="my-4">
					<span class="text-content">Пароль:</span>
					<Field
						type="password"
						name="password"
						class="w-full mt-2 text-content py-2 px-4 rounded-md border-2 border-silver focus:border-primary hover:border-primary outline-none"
					/>
					<ErrorMessage
						name="password"
						class="text-secondary font-semibold"
					/>
				</div>
				<button
					class="bg-secondary text-content font-semibold w-full py-3 my-3 rounded-md hover:bg-accent hover:text-secondary"
				>
					Авторизоваться
					<i
						class="pi pi-spinner pi-spin"
						v-if="isLoginButtonSpinnerVisible"
					></i>
				</button>
			</Form>
			<button
				@click="signInWithGoogle"
				class="bg-slate-800 text-slate-200 font-medium w-full py-3 mt-3 rounded-md hover:bg-slate-700"
			>
				Войти через
				<i class="pi pi-google"></i>
			</button>
		</div>
	</div>
</template>
