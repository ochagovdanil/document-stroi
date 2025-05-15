<script setup lang="ts">
import ChangePassword from '@/features/profile/ui/ChangePassword.vue';
import DeleteAccount from '@/features/profile/ui/DeleteAccount.vue';
import {
	useProjectsLengthByUid,
	useSharedProjectsLengthByUid,
} from '@/shared/api/queries';
import { getAuth, type Auth, type User } from 'firebase/auth';

const auth: Auth = getAuth();
const currentUser: User = auth.currentUser!;

const { data, isError, isFetching } = useProjectsLengthByUid(currentUser.uid); // Кол-во проектов у юзера
const {
	data: sharedData,
	isError: isSharedError,
	isFetching: isSharedFetching,
} = useSharedProjectsLengthByUid(currentUser.uid); // Кол-во доступных мне проектов у юзера
</script>

<template>
	<div class="flex justify-between items-center">
		<p
			class="text-center text-3xl font-semibold mb-5 after:w-28 after:h-[0.2rem] after:bg-secondary after:block after:mx-auto after:mt-3"
		>
			Сведения об <span class="bg-tertiary">аккаунте</span>
		</p>
		<!-- Profile photo exists -->
		<div
			v-if="currentUser?.photoURL"
			class="h-28 w-28 rounded-md bg-tertiary relative"
		>
			<img
				:src="currentUser.photoURL"
				class="h-28 rounded-md absolute right-3 top-3 shadow-md"
				alt="Аватар"
				title="Аватар"
			/>
		</div>
		<!-- No profile photo -->
		<div
			v-else
			class="mb-2 h-28 w-28 rounded-md bg-tertiary relative"
			title="Аватар"
		>
			<div
				class="h-28 w-28 rounded-md flex justify-center items-center bg-tertiary-light absolute right-3 top-3 shadow-md"
			>
				<i class="pi pi-user" style="font-size: 1.7rem"></i>
			</div>
		</div>
	</div>
	<p class="font-semibold text-lg">
		Почтовый адрес:
		<span class="font-medium">{{ currentUser?.email ?? '-' }}</span>
	</p>
	<p class="font-semibold text-lg">
		Имя:
		<span class="font-medium">{{ currentUser?.displayName ?? '-' }}</span>
	</p>
	<p class="font-semibold text-lg">
		Количество проектов:
		<span class="font-medium underline" v-if="isFetching"
			>подсчитываем...</span
		>
		<span class="font-medium underline" v-else-if="isError">N/A</span>
		<span class="font-medium underline" v-else="data">{{
			data?.length
		}}</span>
	</p>
	<p class="font-semibold text-lg">
		Количество доступных мне проектов:
		<span class="font-medium underline" v-if="isSharedFetching"
			>подсчитываем...</span
		>
		<span class="font-medium underline" v-else-if="isSharedError">N/A</span>
		<span class="font-medium underline" v-else="sharedData">{{
			sharedData?.length
		}}</span>
	</p>
	<p class="font-semibold text-lg">
		Номер телефона:
		<span class="font-medium">{{ currentUser?.phoneNumber ?? '-' }}</span>
	</p>
	<p class="font-semibold text-lg">
		Дата создания аккаунта:
		<span class="font-medium">{{
			currentUser?.metadata?.creationTime ?? '-'
		}}</span>
	</p>
	<p class="font-semibold text-lg">
		Последний вход в аккаунт:
		<span class="font-medium">{{
			currentUser?.metadata?.lastSignInTime ?? '-'
		}}</span>
	</p>
	<div class="flex gap-4 mt-8">
		<ChangePassword />
		<DeleteAccount :currentUser />
	</div>
</template>
