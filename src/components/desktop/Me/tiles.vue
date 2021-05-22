<template>
  <q-page>
      <q-intersection
        transition="scale"
      >
        <div class="q-mt-xl" style="margin: 10% auto auto; width: 70%; justify-content: center;">
          <span class="row" style="margin: 0 auto; justify-content: center; align-items: center">
              <q-select
              class="col"
              square
              outlined
              dense
              v-model="filterType"
              :options="options"
              style="max-width: 200px; margin-left: 3%"
              label="Selecione um filtro"
              />

              <q-select
              class="col"
              v-if="filterType === 'Região'"
              square
              outlined
              dense
              v-model="filterString"
              :options="regionOptions"
              style="max-width: 200px; margin-left: 5%"
              @keyup.enter="queryCountry"
              label="Selecione uma região"
              />

              <q-input
              v-if="filterType !== 'Região' && filterType"
              outlined
              dense
              v-model="filterString"
              @keyup.enter="queryCountry"
              style="max-width: 250px; margin-left: 5%"
              :label="`Filtrar por ${(this.filterType).toLowerCase()}`"
              />

              <v-autocomplete
                auto-select-first
                clearable
                dense
                filled
              ></v-autocomplete>

            <span style="margin-left: 5%; min-width: 200px">
              <q-btn rounded color="purple" style="width: 100%; max-width: 150px" @click="queryCountry" label="Pesquisar"/>
            </span>

          </span>
        </div>
        <div class="row justify-center q-mt-md">
          <div>
            <q-table
              grid
              style="max-width: 650px"
              v-if="countries.length > 0"
              :data="countries"
              :columns="columns"
              :pagination.sync="pagination"
              row-key="name"
              hide-pagination
              hide-header
            >
              <template v-slot:item="props">
                <div class="justify-center">
                <q-card flat class="q-mr-md q-mt-md q-ml-md">
                  <q-img class="cursor-pointer" @click="selectCountry(props.row)" height="80px" width="125px" :src="props.row.flag"/>
                </q-card>

                </div>
              </template>
            </q-table>

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
        </div>
      </q-intersection>
  </q-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('data')

export default {
  name: 'PageIndex',
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
      options: ['Região', 'Capital', 'Língua', 'Código de ligação'],
      regionOptions: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
      filterType: '',
      filterString: '',
      countries: [],
      pagination: {
        page: 1,
        rowsPerPage: 12
      },
      pagesNumber: 4
    }
  },
  methods: {
    ...mapMutations(['setCountry']),
    queryCountry (e) {
      console.log('FILTRO: ' + this.filterType)
      if (this.filterType === 'Região') console.log('REGIÃO: ' + this.filterString)
      this.fetchData(this.filterString)
    },
    fetchData (filter) {
      this.$axios
      .get(`https://restcountries.eu/rest/v2/${this.filterTypeForUrl ? this.filterTypeForUrl + '/' : '' }${filter}`)
      .then(response => {
        console.log(response)
        this.countries = response.data
        this.pagesNumber = Math.ceil(response.data.length / this.pagination.rowsPerPage)
        this.pagination.page = 1
      })
    },
    selectCountry (country) {
      console.log('PAIS SELECIONADO: ' + country.name)
      this.setCountry(country)
      this.$router.push('/country')
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
      }
      return ''
    }
  },
  mounted () {
    this.fetchData('')
  }
}
</script>
