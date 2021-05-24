import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import example from './module-example'

Vue.use(Vuex)

const data = {
  namespaced: true,
  state () {
    return {
      selectedCountry: null,
      countryLanguages: '',
      autocompleteData: {},
      pagination: {}
    }
  },
  getters: {
    selectedCountry: state => state.selectedCountry,
    countryLanguages: state => state.countryLanguages,
    autocompleteData: state => state.autocompleteData
  },
  actions: {
    setCountry ({ dispatch, commit }, country) {
      let languages = ''

      country.languages.forEach((lang, index) => {
        languages += lang.name + (country.languages.length - 1 > index ? ', ' : '')
      })

      commit('setCountryData', { country, languages })

    },
    setAutocompleteData({ dispatch, commit }) {

      const data = {
        langs: [],
        regions: [],
        capitals: [],
        countries: [],
        callingCodes: [],
        unfiltered: {}
      }

      axios.get('https://restcountries.eu/rest/v2/')
        .then(response => {
          data.unfiltered = response.data

          response.data.forEach(country => {
            country.languages.forEach(countryLang => {
              if (countryLang.iso639_1 && !data.langs.includes(countryLang.iso639_1)) {
                data.langs.push(countryLang.iso639_1)
              }
            })

            if (country.capital && !data.capitals.includes(country.capital)) {
              data.capitals.push(country.capital)
            }

            if (country.region && !data.regions.includes(country.region)) {
              data.regions.push(country.region)
            }

            if (country.name && !data.countries.includes(country.name)) {
              data.countries.push(country.name)
            }

            country.callingCodes.forEach(callingCode => {
              if (callingCode && !data.callingCodes.includes(callingCode)) {
                data.callingCodes.push(callingCode)
              }
            })
          })
        })
        .finally(() => {
          commit('setAutocompleteData', {
            langs: data.langs,
            regions: data.regions,
            capitals: data.capitals,
            countries: data.countries,
            callingCodes: data.callingCodes,
            unfiltered: data.unfiltered
          })
        })
    }
  },
  mutations : {
    setCountryData: (state, data) => {
      state.selectedCountry = data.country
      state.countryLanguages = data.languages
    },
    setAutocompleteData: (state, { langs, regions, capitals, countries, callingCodes, unfiltered }) => {
      if (langs, regions, countries, callingCodes, unfiltered, capitals) {
        state.autocompleteData = {
          langs,
          regions,
          capitals,
          countries,
          callingCodes,
          unfiltered
        }
      } else {
        console.error("ERROR: invalid data in mutation")
      }
    }
  }
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
