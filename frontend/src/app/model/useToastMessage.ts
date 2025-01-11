import { useToast } from 'primevue';

// Show PrimeVue Toast message
export default function useToastMessage(duration: number = 3_500) {
	const toast = useToast();

	return (
		severity: 'error' | 'warn' | 'success' | 'info',
		summary: string,
		detail: string
	) => {
		toast.add({ severity, summary, detail, life: duration });
	};
}
