<div align="center">
  <p>
    <img src="https://github.com/user-attachments/assets/0ca1c6ac-8ab9-404a-89cc-ede698ceab2d" width="72">
  </p>
  
  <h1>ConvertEx</h1>
  
  <p>Easily convert between over 200 fiat and cryptocurrencies.</p>
  <img src="https://github.com/user-attachments/assets/1dc70b59-40fd-4f5d-ab88-74d7f34fb606"><br>
</div>

---

# Browser Compatibility

This extension is compatible with the following browsers. Please note its availability on official stores.

| Browser        | Compatibility            | Store Availability               | How to Use                                                                                 |
| :------------- | :----------------------- | :------------------------------- | :------------------------------------------------------------------------------------------|
| Mozilla Firefox| ✅ Fully Supported       | ✅ Available on Firefox Add-ons | [Install from Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/convertex/)  |
| Google Chrome  | ✅ Fully Supported       | 🚫 Not on Web Store             | Load as [Unpacked Extension](#local-installation)                                          |
| Microsoft Edge | ✅ Fully Supported       | 🚫 Not on Edge Add-ons          | Load as [Unpacked Extension](#local-installation)                                          |
| Brave Browser  | ✅ Expected to Work      | 🚫 (Uses Chrome Web Store)      | Load as [Unpacked Extension](#local-installation)                                          |

# Local Installation

1. Download the zipped extension from [Releases](https://github.com/polyychi/ConvertEx/releases).
2. Load as unpacked extension:
    * Open your browser and navigate to `chrome://extensions` (Chrome/Brave) or `edge://extensions` (Edge).
    * Enable "Developer Mode".
    * Drag and drop the `.zip` into the extensions page.

# Building Locally

### Requirements

* [Node.js](https://nodejs.org/en/download) (v22 LTS recommended)
* [npm](https://www.npmjs.com/) (v10.x or higher)

### Install project dependencies

```sh
npm i @iconify/vue@4.1.1
npm i @picocss/pico@1.5.10
npm i @rushstack/eslint-patch@1.3.2
npm i @vitejs/plugin-vue@4.3.1
npm i @vue/eslint-config-prettier@8.0.0
npm i @vueuse/core@10.4.1
npm i axios@1.4.0
npm i eslint@8.46.0
npm i eslint-plugin-vue@9.16.1
npm i maska@2.1.10
npm i pinia@2.1.6
npm i prettier@3.0.0
npm i vite@4.4.9
npm i vue@3.3.4
npm i vue-router@4.2.4
```

### Build script

```sh
npx vite build
```

### Loading as a browser extension

After building the application, the `dist/` folder contains all necessary files to load the extension into your browser.
