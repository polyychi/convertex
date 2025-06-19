import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios'

const FXR_BASE_URL = 'https://api.fxratesapi.com'
const FXR_ENDPOINTS = {
  LATEST: '/latest',
  CURRENCIES: '/currencies'
}

export const useMainStore = defineStore('main', {
  state: () => ({
    fromAmount: useStorage('fromAmount', '0.00'),
    toAmount: useStorage('toAmount', '0.00'),
    baseCurrency: useStorage('baseCurrency', 'USD'),
    quoteCurrency: useStorage('quoteCurrency', 'EUR'),
    adjustmentRate: useStorage('adjustmentRate', 0),
    currencies: useStorage('currencies', []),
    conversionRates: useStorage('conversionRates', {}),
    lastFetched: useStorage('lastFetched', null)
  }),
  getters: {
    conversionRate: (state) =>
      state.conversionRates[state.quoteCurrency] / state.conversionRates[state.baseCurrency],
    isRatesStale: (state) => {
      if (!state.lastFetched) {
        return true
      }
      const stalenessThresholdMinutes = 180
      const timeElapsed = Date.now() - state.lastFetched
      return timeElapsed > (stalenessThresholdMinutes * 60 * 1000)
    }
  },
  actions: {
    async updateConversionRates() {
      try {
        const response = await axios(`${FXR_BASE_URL}${FXR_ENDPOINTS.LATEST}`, {
          params: {
            api_key: import.meta.env.VITE_FXR_API_KEY
          }
        })
        this.lastFetched = Date.now()
        this.conversionRates = response.data.rates
      } catch (error) {
        console.error('Failed to fetch conversion rates:', error)
      }
    },
    async updateCurrencies() {
      try {
        const response = await axios(`${FXR_BASE_URL}${FXR_ENDPOINTS.CURRENCIES}`, {
          params: {
            api_key: import.meta.env.VITE_FXR_API_KEY
          }
        })
        this.currencies = Object.values(response.data)
      } catch (error) {
        console.error('Failed to fetch currencies:', error)
      }
    },
    async updateRatesIfStale() {
      if (this.isRatesStale) {
        await this.updateConversionRates()
      }
    },
    updateToAmount() {
      this.toAmount = (
        this.fromAmount *
        this.conversionRate *
        (1 + this.adjustmentRate / 100)
      ).toFixed(2)
    },
    updateFromAmount() {
      this.fromAmount = (
        this.toAmount *
        (1 / this.conversionRate) *
        (1 - this.adjustmentRate / 100)
      ).toFixed(2)
    },
    swapCurrencies() {
      ;[this.baseCurrency, this.quoteCurrency] = [this.quoteCurrency, this.baseCurrency]
      this.updateToAmount()
    }
  }
})
