<template>
	<section
		class="w-screen h-screen bg-primary flex flex-col justify-center items-center"
	>
		<h1
			class="text-center text-5xl font-bold text-tertiary max-w-[50rem] leading-tight"
		>
			<span class="text-accent">Хм,</span> кажется такой страницы не
			существует
		</h1>
		<h3 class="text-accent text-3xl font-semibold mt-16">404 Ошибка</h3>
		<RouterLink
			:to="{ name: 'login' }"
			class="text-lg bg-secondary rounded-full py-3 px-6 mt-10 shadow-md border-content border-2 hover:bg-accent hover:text-secondary"
			>Вернуться на главную</RouterLink
		>
	</section>
</template>
