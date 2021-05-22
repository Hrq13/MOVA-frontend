<template>
  <q-page>
      <q-intersection
        transition="scale"
      >
        <div class="q-mt-xl col" style="margin: 10% auto auto; width: 70%; justify-content: center;">
          <span class="row" style="margin: 0 auto; justify-content: center; align-items: center">
              <q-select
              class="row"
              outlined
              dense
              v-model="filterType"
              :options="options"
              style="width: 180px;max-width: 200px; margin-left: 3%"
              label="Selecione um filtro"
              />

              <q-select
                dense
                outlined
                class="row"
                v-model="filterString"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="autoCompleteFiltered"
                @keyup.enter="fetchData"
                @input="isValid = true"
                @filter="filterFn"
                :label="`Filtrar por ${(this.filterType).toLowerCase()}`"
                style="max-width: 250px; margin-left: 5%; margin-bottom: -20px"
              :error="!isValid"
              >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:error>
                Nada encontrado.
              </template>
            </q-select>

            <span style="margin-left: 5%; min-width: 200px">
              <q-btn rounded color="purple" style="width: 100%; max-width: 150px" @click="fetchData" label="Pesquisar"/>
            </span>

            <div class="">
            <table-of-countries
            class="row"
              :columns="columns"
              :pagination="pagination"
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
import tableOfCountries from '../tableOfCountries.vue';

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
      isValid: true
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
