<template>
  <q-page>
      <q-intersection
        transition="scale"
      >
        <div class="q-mt-xl col" style="margin: 10% auto auto; width: 70%; justify-content: center;">
          <span class="col" style="margin: 0 auto; justify-content: center; align-items: center">

            <div class="row justify-center align-center">
                <span class="row">
                  <q-img class="row" :ratio="16/9" style="width: 280px;" :src="selectedCountry.flag"/>
                  <div class="row q-ml-lg" style="font-size: 13pt">
                    Nome: {{ selectedCountry.name }}
                    <br>
                    Capital: {{ selectedCountry.capital }}
                    <br>
                    Região: {{ selectedCountry.region }}
                    <br>
                    Sub-região: {{ selectedCountry.subregion }}
                    <br>
                    População: {{ selectedCountry.population }}
                    <br>
                    Linguas: {{ countryLanguages }}
                  </div>
                </span>

            </div>

              <div class="col">
                <table-of-countries
                class="row"
                  :columns="columns"
                  :pagination="getPagination"
                  :pagesNumber="pagesNumber"
                  :countries="countries"
                />
                <div class="row justify-center q-mt-lg">
                  <q-pagination
                    v-model="pagination.page"
                    v-if="countries.length > 12"
                    color="purple"
                    :max="pagesNumber"
                    size="md"
                    :max-pages="6"
                  />
                </div>
              </div>

          </span>
        </div>

      </q-intersection>
  </q-page>
</template>

<script>
import tableOfCountries from '../components/tableOfCountries.vue';

const autoCompleteOptions = require('src/data/autocomplete.json')

export default {
  name: 'PageIndex',
  components: {
    tableOfCountries
  },
  data () {
    return {
      columns: [
        {
          name: 'desc',
          required: true,
          align: 'middle',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        }
      ],
      options: ['Região', 'Capital', 'Língua', 'Código de ligação', 'País'],
      autoCompleteFiltered: autoCompleteOptions.data,
      filterType: '',
      filterString: '',
      countries: [],
      pagination: {
        page: 1,
        rowsPerPage: 12
      },
      pagesNumber: 4,
      isValid: true,
      languagesString: ''
    }
  },
  methods: {
    fetchData (filter) {
      this.$axios
      .get(`https://restcountries.eu/rest/v2/${this.filterTypeForUrl ? this.filterTypeForUrl + '/' : '' }${this.filterString}`)
      .then(response => {
        this.countries = response.data
        this.pagesNumber = Math.ceil(response.data.length / this.pagination.rowsPerPage)
        this.pagination.page = 1
      })
      .catch(e => {
        this.isValid = false
      })
    },
    selectCountry (country) {
      console.log('PAIS SELECIONADO: ' + country.name)
      this.setCountry(country)
      this.$router.push('/country')
    },
    filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.autoCompleteFiltered = autoCompleteOptions.data.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  watch: {
    filterType () {
      this.filterString = ''
    }
  },
  computed: {
    selectedCountry () {
      return this.$store.getters['data/selectedCountry']
    },
    countryLanguages () {
      return this.$store.getters['data/countryLanguages']
    },
    getPagination () {
      return this.pagination
    },
    filterTypeForUrl () {
      switch (this.filterType) {
        case 'Região':
          return 'region';
        case 'Capital':
          return 'capital'
        case 'Língua':
          return 'lang';
        case 'Código de ligação':
          return 'callingcode';
        case 'País':
          return 'name'
      }
      return ''
    }
  },
  mounted () {
    this.fetchData('')
  }
}
</script>
