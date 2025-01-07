/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// For components and elements on the page
				primary: '#0A262C',
				secondary: '#FF4922',
				tertiary: '#CCD7D6',
				accent: '#FFE9DC',
				// For background color
				background: '#FDFDFD',
				// For title and subtitle
				content: '#384341',
			},
		},
	},
	plugins: [],
};
