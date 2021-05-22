import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

const data = {
  namespaced: true,
  state () {
    return {
      selectedCountry: {},
      countryLanguages: '',
      pagination: {}
    }
  },
  getters: {
    selectedCountry: state => state.selectedCountry,
    countryLanguages: state => state.countryLanguages,
  },
  mutations: {
    setCountry: (state, country) => {
      state.selectedCountry = country

      let languages = ''

      country.languages.forEach((lang, index) => {
        languages += lang.name + (country.languages.length - 1 > index ? ', ' : '')
      })

      state.countryLanguages = languages
    }
  },
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  modules: {
    data
  },
  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: process.env.DEBUGGING
})
