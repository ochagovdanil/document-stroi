<script setup lang="ts">
import RegisterForm from '@/features/register/ui/RegisterForm.vue';
import RegisterHeader from '@/widgets/register/ui/RegisterHeader.vue';
</script>

<template>
	<section
		class="bg-primary h-screen w-screen flex justify-center items-center shadow-md"
	>
		<div class="bg-tertiary rounded-xl p-6">
			<RegisterHeader />
			<RegisterForm />
		</div>
	</section>
</template>
