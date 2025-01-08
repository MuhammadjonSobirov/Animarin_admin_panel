
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let useStore = (set) => {
    return {
        login: false,
        toggleLogin: () => set((state) => ({ login: !state.login }))
    }
}

useStore = devtools(useStore)

useStore = persist(useStore, {
    name: 'login'
})

export default create(useStore)