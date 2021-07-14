
export type ScrollOptions = {
    name?: string
}
import { App, Plugin } from 'vue'
import scrollComponent from "./scroll.component"

export const Scroll: Plugin = {
    install(app: App, options: ScrollOptions) {
        app.component(options?.name || scrollComponent.name, scrollComponent)
    }
}