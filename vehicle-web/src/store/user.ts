import {defineStore} from 'pinia'

export default defineStore('user', {
    state() {
        return {
            user: {
               
            }
        }
    },
    actions: {
        setUser(user: object) {
            this.user = user;
        }
    }
})