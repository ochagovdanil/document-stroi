import * as yup from 'yup';

// Register page form validation
const registerFormSchema = yup.object({
	email: yup.string().email('Невалидный адрес!').required('Заполните поле!'),
	password: yup
		.string()
		.required('Заполните поле!')
		.min(6, 'Слишком короткий пароль!'),
	repeatPassword: yup
		.string()
		.required('Заполните поле!')
		.min(6, 'Слишком короткий пароль!')
		.oneOf([yup.ref('password')], 'Пароли не совпадают!'),
});

export default registerFormSchema;
