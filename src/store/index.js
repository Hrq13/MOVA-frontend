import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

const data = {
  namespaced: true,
  state () {
    return {
      selectedCountry: {}
    }
  },
  getters: {
    selectedCountry: state => state.selectedCountry
  },
  mutations: {
    setCountry: (state, country) => { state.selectedCountry = country }
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
