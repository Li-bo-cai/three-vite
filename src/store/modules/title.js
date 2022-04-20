import { defineStore } from 'pinia'
import { ref } from 'vue'

// // options API模式定义
// export const useStore = defineStore('useStore', {
//     // 定义state
//     state: () => {
//         return {
//             count: 1
//         }
//     },
//     // 定义actions
//     actions: {
//         increment() {
//             this.count++
//         }
//     },
//     getters: {
//         doubleCount(state) {
//             return state.count * 2
//         }
//     }
// })

// 使用setup模式定义
const title = defineStore('title', () => {
    const count = ref(1)

    function increment() {
        count.value++
    }

    return { count, increment }
})

export default title