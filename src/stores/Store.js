import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useMainStore = defineStore('main', {
    state: () => ({
        fromInput: useStorage('fromInput', '0.00'),
        toInput: useStorage('toInput', '0.00'),
        baseCurrency: useStorage('baseCurrency', 'USD'),
        quoteCurrency: useStorage('quoteCurrency', 'EUR'),
        adjustmentRate: useStorage('adjustmentRate', 0),
        conversionRate: useStorage('conversionRate', 0),
    })
})