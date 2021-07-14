import { defineComponent } from 'vue'
import { ref, h } from 'vue'
import { onActivated } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
export default defineComponent({
    name: 'scroll',
    setup(props, ctx) {
        let scrollRef = ref<HTMLDivElement>()
        let scrollPosition = ref(0)
        onActivated(() => {
            if (scrollRef.value) {
                scrollRef.value.scrollTop = scrollPosition.value
            }
        })
        onBeforeRouteLeave(() => {
            if (scrollRef.value) {
                scrollPosition.value = scrollRef.value.scrollTop
            }
        })
        return () => {
            return h("div", { ref: scrollRef }, ctx.slots.default!());
        };
    }
})