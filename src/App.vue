<script setup>
import '@picocss/pico'
import { vMaska } from 'maska/vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useMainStore } from '@/stores/store'
import { storeToRefs } from 'pinia'

const main = useMainStore()
const { fromAmount, toAmount, baseCurrency, quoteCurrency, adjustmentRate, currencies } =
  storeToRefs(main)
const fromAmountInput = ref()

onMounted(() => {
  fromAmountInput.value.focus()
  fromAmountInput.value.select()
  main.updateRatesIfStale()
  main.updateCurrencies()
})
</script>

<template>
  <div class="grid">
    <div class="input-block">
      <select
        v-model="baseCurrency"
        @change="
          () => {
            main.updateToAmount()
          }
        "
      >
        <option v-for="currency in currencies" :key="currency.id" :value="currency.code">
          {{ currency.code }} - {{ currency.name }}
        </option>
      </select>
      <input
        v-model="fromAmount"
        ref="fromAmountInput"
        v-maska
        data-maska="0.99"
        data-maska-tokens="0:\d:multiple|9:\d:optional"
        @keyup="main.updateToAmount"
        @focus="
          (event) => {
            event.target.select()
          }
        "
        class="currency-amount-input"
      />
    </div>
    <div class="center">
      <span class="button"
        ><Icon
          icon="material-symbols:compare-arrows-rounded"
          width="26"
          height="26"
          @click="main.swapCurrencies"
      /></span>
    </div>
    <div class="input-block">
      <select
        v-model="quoteCurrency"
        @change="
          () => {
            main.updateFromAmount()
          }
        "
      >
        <option v-for="currency in currencies" :key="currency.id" :value="currency.code">
          {{ currency.code }} - {{ currency.name }}
        </option>
      </select>
      <input
        v-model="toAmount"
        v-maska
        data-maska="0.99"
        data-maska-tokens="0:\d:multiple|9:\d:optional"
        @keyup="main.updateFromAmount"
        @focus="
          (event) => {
            event.target.select()
          }
        "
        class="currency-amount-input"
      />
    </div>
  </div>
  <div class="rate">
    <p>Custom percentage adjustment (+/−)</p>
    <input
      class="rate-input"
      id="rate-input"
      v-model="adjustmentRate"
      v-maska
      data-maska="-0.9"
      data-maska-tokens="-:\-:optional|0:\d|9:\d:optional"
      @keyup="main.updateToAmount"
      @focus="
        (event) => {
          event.target.select()
        }
      "
    />
    <p>%</p>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 400px;
  height: 150px;
}
.input-block {
  display: grid;
  width: 100%;
  padding: 0 10px;
  margin-top: 20px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 26px 1fr;
  column-gap: 0;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  cursor: pointer;
  color: #89b0cd;
  transition: 0.2s all;
}
.button:hover {
  color: #567196;
  transition: 0.2s all;
}
.rate {
  width: 390px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: right;
  padding: auto auto;
}
.rate-input {
  height: 25px;
  width: 30px;
  padding: 2px 2px;
  font-size: 11px;
  text-align: center;
  margin: auto 2px;
}
p {
  font-size: 11px;
  margin: auto 2px;
}
.currency-amount-input {
  height: 30px;
  font-size: 11px;
  padding-left: 12px;
  padding-right: 12px;
}
select {
  height: 30px;
  font-size: 11px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 12px;
}
option {
  font-size: 12px;
}
</style>
