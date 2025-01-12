<script setup lang="ts">
import useToastMessage from '@/shared/model/composables/useToastMessage';
import registerFormSchema from '@/shared/model/validation/RegisterFormSchema';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToastMessage();

const isRegisterButtonSpinnerVisible = ref<boolean>(false); // The loading state of a 'sign up' button

// Sign up with email and password
function signUp(values: any): void {
	isRegisterButtonSpinnerVisible.value = true;

	createUserWithEmailAndPassword(
		getAuth(),
		values.email,
		values.repeatPassword
	)
		.then(
			() => router.push({ name: 'projects' }) // Success
		)
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
				case 'auth/email-already-in-use':
					toast(
						'error',
						'Ошибка!',
						'Данный адрес электронной почты уже занят.'
					);
					break;
				case 'auth/weak-password':
					toast('error', 'Ошибка!', 'Слишком слабый пароль.');
					break;
				default:
					toast('error', 'Ошибка!', error.code);
					break;
			}
		})
		.finally(() => (isRegisterButtonSpinnerVisible.value = false));
}
</script>

<template>
	<div class="flex justify-center">
		<div>
			<Form
				@submit="signUp"
				:validation-schema="registerFormSchema"
				class="w-[30rem]"
			>
				<div class="">
					<span>Почта:</span>
					<Field
						type="email"
						name="email"
						class="w-full mt-2 py-2 px-4 rounded-full border-2 border-silver focus:border-primary hover:border-primary outline-none"
					/>
					<ErrorMessage
						name="email"
						class="text-secondary font-semibold"
					/>
				</div>
				<div class="my-4">
					<span>Придумайте пароль:</span>
					<Field
						type="password"
						name="password"
						class="w-full mt-2 py-2 px-4 rounded-full border-2 border-silver focus:border-primary hover:border-primary outline-none"
					/>
					<ErrorMessage
						name="password"
						class="text-secondary font-semibold"
					/>
				</div>
				<div class="my-4">
					<span>Повторите пароль:</span>
					<Field
						type="password"
						name="repeatPassword"
						class="w-full mt-2 py-2 px-4 rounded-full border-2 border-silver focus:border-primary hover:border-primary outline-none"
					/>
					<ErrorMessage
						name="repeatPassword"
						class="text-secondary font-semibold"
					/>
				</div>
				<button
					class="bg-secondary font-semibold w-full py-3 mt-3 rounded-full border-content border-2 hover:bg-accent hover:text-secondary"
				>
					Создать аккаунт
					<i
						class="pi pi-spinner pi-spin"
						v-if="isRegisterButtonSpinnerVisible"
					></i>
				</button>
			</Form>
		</div>
	</div>
</template>
