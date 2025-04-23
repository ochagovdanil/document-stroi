<script setup lang="ts">
import newProjectDummy from '@/app/ui/assets/new-project-dummy.jpg';
</script>

<template>
	<p
		class="text-3xl font-semibold mt-5 after:w-32 after:h-[0.2rem] after:bg-secondary after:ml-10 after:block after:mt-3"
	>
		Создание нового <span class="bg-tertiary">проекта</span>
	</p>
	<div class="flex justify-between gap-3 items-center">
		<div>
			<input
				type="text"
				placeholder="Название проекта"
				class="w-[50rem] py-2 px-4 text-primary font-bold text-2xl placeholder-silver mx-auto block border-b-2 border-primary bg-transparent focus:border-secondary hover:border-secondary outline-none"
			/>
			<div class="mt-10 text-lg">
				<span class="mr-8">Дата начала:</span>
				<input type="date" class="bg-transparent" />
			</div>
			<div class="mt-4 text-lg">
				<span class="mr-8">Дата окончания:</span>
				<input type="date" class="bg-transparent" />
			</div>
		</div>
		<div
			class="h-[15rem] w-[25rem] my-8 mr-10 rounded-md bg-tertiary relative"
		>
			<img
				:src="newProjectDummy"
				class="h-[15rem] w-[25rem] rounded-md absolute right-3 top-3 shadow-md object-cover object-center"
				alt="Изображение проекта"
				title="Изображение проекта"
			/>
			<i
				class="pi pi-pencil absolute right-[-2rem] cursor-pointer hover:text-secondary"
				style="font-size: 1.2rem"
				title="Изменить"
			></i>
		</div>
	</div>
</template>
