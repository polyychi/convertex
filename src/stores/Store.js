import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMainStore = defineStore('main', {
  state: () => ({
    fromAmount: useStorage('fromAmount', '0.00'),
    toAmount: useStorage('toAmount', '0.00'),
    baseCurrency: useStorage('baseCurrency', 'USD'),
    quoteCurrency: useStorage('quoteCurrency', 'EUR'),
    adjustmentRate: useStorage('adjustmentRate', 0),
    conversionRate: useStorage('conversionRate', 0)
  })
})
