<script setup lang="ts">
import RemoveItem from '@/features/new-documents/ui/RemoveItem.vue';
import UpdateItem from '@/features/new-documents/ui/UpdateItem.vue';
import {
	Accordion,
	AccordionPanel,
	AccordionHeader,
	AccordionContent,
} from 'primevue';

const { keyId, document } = defineProps<{
	keyId: number;
	document: string;
}>();
</script>

<template>
	<Accordion expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
		<AccordionPanel :value="keyId">
			<AccordionHeader>
				<div class="flex items-center gap-4 w-full">
					<i
						class="pi pi-file text-white bg-secondary-dark rounded-full p-4"
					></i>
					<span class="font-bold">{{ document }}</span>
				</div>
			</AccordionHeader>
			<AccordionContent>
				<p>
					<i class="pi pi-times-circle mr-2 text-secondary-dark"></i
					>Текущая версия документа:
					<span class="underline">50.13330.2012</span>
				</p>
				<p>
					<i class="pi pi-verified mr-2 text-success"></i>Актуальная
					версия документа:
					<span class="underline">50.13330.2024</span>
				</p>
				<p class="font-semibold mt-4">
					Данный документ устарел в следующих проектах:
				</p>
				<ul class="ml-10 mb-4">
					<li class="list-disc cursor-pointer text-blue-700 w-max">
						<span class="underline"> Ордынка №84923</span>
						<span class="text-content ml-2"
							>[Обновить <i class="pi pi-sync"></i>]</span
						>
					</li>
					<li class="list-disc cursor-pointer text-blue-700 w-max">
						<span class="underline"> Борисовский пассаж, д.84 </span
						><span class="ml-2 text-content"
							>[Обновить <i class="pi pi-sync"></i>]</span
						>
					</li>
				</ul>
				<UpdateItem />
				<RemoveItem />
			</AccordionContent>
		</AccordionPanel>
	</Accordion>
</template>
