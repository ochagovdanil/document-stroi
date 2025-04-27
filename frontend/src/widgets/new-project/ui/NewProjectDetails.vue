<script setup lang="ts">
import UploadProjectImage from '@/features/new-project/ui/UploadProjectImage.vue';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { storeToRefs } from 'pinia';

const { details } = storeToRefs(useNewProjectDetailsStore());
const { updateName, updateDateStart, updateDateEnd } =
	useNewProjectDetailsStore();
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
				:value="details.name"
				@change="(e: Event) => 
					updateName((e.target as HTMLInputElement).value)
				"
			/>
			<div class="mt-10 text-lg">
				<span class="mr-8">Дата начала:</span>
				<input
					type="date"
					class="bg-transparent"
					:value="details.dateStart"
					@change="(e: Event) => 
					updateDateStart((e.target as HTMLInputElement).value)
				"
				/>
			</div>
			<div class="mt-4 text-lg">
				<span class="mr-8">Дата окончания:</span>
				<input
					type="date"
					class="bg-transparent"
					:value="details.dateEnd"
					@change="(e: Event) => 
					updateDateEnd((e.target as HTMLInputElement).value)
				"
				/>
			</div>
		</div>
		<UploadProjectImage />
	</div>
</template>
