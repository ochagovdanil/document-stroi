<script setup lang="ts">
import Item from './Item.vue';
</script>

<template>
	<p
		class="text-3xl font-semibold mt-5 mb-5 after:w-32 after:h-[0.2rem] after:bg-secondary after:block after:ml-40 after:mt-3"
	>
		Новые версии
		<span class="bg-tertiary">нормативных документов</span>
	</p>
	<p class="text-lg text-right mb-10">
		Данный раздел содержит список нормативных документов, которые устарели в
		ваших проектах.
	</p>
	<Item :key-id="0" document="СП 50.13330.2012 — Тепловая защита зданий" />
</template>
