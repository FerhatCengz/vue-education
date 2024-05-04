import type { App } from 'vue'
import { plugin, defaultConfig } from '@/plugins/formKit'

export const registerPlugins = (app: App) => {
  app.use(plugin, defaultConfig)
}