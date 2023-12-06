import React from 'react'
import ReactDOM from 'react-dom/client'

import GlobalStyle from './elements/GlobalStyle.tsx'
import App from './elements/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GlobalStyle />
		<App />
	</React.StrictMode>
)
