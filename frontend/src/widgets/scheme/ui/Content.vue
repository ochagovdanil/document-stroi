<script setup lang="ts">
import scheme from '@/app/ui/assets/scheme.png';
</script>

<template>
	<p
		class="text-3xl font-semibold mt-5 mb-10 text-center after:w-32 after:h-[0.2rem] after:bg-secondary after:mx-auto after:block after:mt-3"
	>
		Структурная схема <span class="bg-tertiary">ДокументСтрой</span>
	</p>
	<img
		:src="scheme"
		alt="Структурная схема ДокументСтрой"
		title="Структурная схема ДокументСтрой"
		class="mx-auto w-full"
	/>
</template>
