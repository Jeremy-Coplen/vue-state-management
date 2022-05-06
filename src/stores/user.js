import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state: () => ({
        user: { name: "", age: 0, job: "", salary: 0 }
    }),

    getters: {
        doubleSalary: (state) => {
            state.user.salary * 2
        }
    },

    actions: {
        setUser(user) {
            this.user = user
        }
    }
})