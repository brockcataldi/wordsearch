import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	:root {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		line-height: 1.5;
		font-weight: 400;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body{
		padding: 1rem;
	}
`

export default GlobalStyle
