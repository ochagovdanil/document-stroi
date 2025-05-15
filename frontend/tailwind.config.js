/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// For components and elements on the page
				primary: '#0A262C',
				secondary: {
					DEFAULT: '#FF4922',
					dark: '#ff3a0e',
				},
				tertiary: {
					DEFAULT: '#CCD7D6',
					light: '#DFF3FE',
					dark: '#c8e7fa',
				},
				accent: '#FFE9DC',
				success: {
					DEFAULT: '#02dfa7',
					light: '#00FCBB',
					dark: '#01c594',
				},
				// For background color
				background: '#FDFDFD',
				// For title and subtitle
				content: '#384341',
			},
			container: {
				center: true,
			},
		},
	},
	plugins: [],
};
