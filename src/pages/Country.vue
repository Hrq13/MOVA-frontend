<template>
  <q-page>
      <q-intersection
        transition="scale"
      >
        <div class="q-mt-xl col" style="margin: 10% auto auto; width: 70%; justify-content: center;">
          <span class="col" style="margin: 0 auto; justify-content: center; align-items: center">

            <div class="row align-center" style="max-width: 625px; margin: 0 auto">
                <span class="row">
                  <span class="row justify-center">
                    <q-img :ratio="22/13" style="width: 260px" :src="selectedCountry.flag"/>
                  </span>
                  <div class="row q-ml-lg" :style="$q.platform.is.mobile ? 'font-size: 16pt; margin-top: 15px' : 'width: 300px; font-size: 13pt'">
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
                <span class="row" :style="'margin-top: 35px; margin-bottom: -25px; max-width: 630px; margin-left: auto; margin-right: auto; ' + ($q.platform.is.mobile ? 'font-size: 16pt; margin-top: 15px' : 'font-size: 17pt')">
                  {{ borderCountryTitle }}
                </span>
                <table-of-countries
                class="row"
                  :columns="columns"
                  :pagination="getPagination"
                  :pagesNumber="pagesNumber"
                  :countries="countries"
                />
                <div class="row justify-center q-mt-lg q-mb-xg">
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
    filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.autoCompleteFiltered = autoCompleteOptions.data.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    setBorderCountries () {

      const borderData = []

      this.selectedCountry.borders.forEach(border => {
        this.$axios
        .get(`https://restcountries.eu/rest/v2/alpha/${border.toLowerCase()}`)
        .then(response => {
          borderData.push(response.data)
        })
        .catch(e => {
          console.error(e.message);
        })
      })

      this.countries = borderData
    }
  },
  watch: {
    filterType () {
      this.filterString = ''
    },
    selectedCountry () {
      this.setBorderCountries()
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
    },
    borderCountryTitle () {
      return this.countries.length > 0 ? 'Países vizinhos:' : ''
    }
  },
  mounted () {
    this.setBorderCountries()
  }
}
</script>
