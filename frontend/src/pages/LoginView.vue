<script setup lang="ts">
import LoginForm from '@/features/login/ui/LoginForm.vue';
import LoginHeader from '@/widgets/login/ui/LoginHeader.vue';
</script>

<template>
	<section
		class="bg-primary h-screen w-screen flex justify-center items-center shadow-md"
	>
		<div class="bg-tertiary rounded-xl p-6">
			<LoginHeader />
			<LoginForm />
		</div>
	</section>
</template>
