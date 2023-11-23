import { defineStore } from 'pinia'

export const KeyValueStore = defineStore('key-value', {
    state: () => {
        return { keyAndValues: [] }
    }
})
