import * as yup from 'yup';

// Login page form validation
const loginFormSchema = yup.object({
	email: yup.string().email('Невалидный адрес!').required('Заполните поле!'),
	password: yup
		.string()
		.required('Заполните поле!')
		.min(6, 'Слишком короткий пароль!'),
});

export default loginFormSchema;
