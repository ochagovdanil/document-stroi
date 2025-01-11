<script setup lang="ts">
import logo from '@/app/ui/assets/logo-in-circle.png';
</script>

<template>
	<div class="text-center">
		<div class="flex justify-center items-center gap-3">
			<img :src="logo" alt="Логотип" title="ДокументСтрой" class="h-14" />
			<p class="font-bold text-2xl">ДокументСтрой</p>
		</div>
		<RouterLink
			:to="{ name: 'login' }"
			class="underline inline-block mt-3 mb-5 hover:text-secondary"
		>
			Уже есть аккаунт?
		</RouterLink>
	</div>
</template>
