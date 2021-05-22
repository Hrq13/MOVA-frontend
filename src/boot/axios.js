// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
import axios from 'axios'
const axiosInstance = axios.create()

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }
