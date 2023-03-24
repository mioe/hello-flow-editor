import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import VueKonva from 'vue-konva'

/**
 * Styles
 */
import 'uno.css'
import './style.css'

/**
 * init app
 */
createApp(App)
	.use(VueKonva)
	.mount('#app')
