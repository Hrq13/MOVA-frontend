<template>
  <q-page v-if="!loading">
      <q-intersection
        transition="scale"
      >
        <div @keydown.enter="fetchData" class="col" style="margin: 10% auto auto; width: 70%; justify-content: center;">
          <div :class="($q.platform.is.mobile ? 'col':'row')" style="margin: 0 auto; justify-content: center; align-items: center">

            <div :class="($q.platform.is.mobile ? 'col':'row')" :style="($q.platform.is.mobile ? 'max-width: 260px; margin: 0 auto' : 'width: 615px')">
              <q-select
              :class="($q.platform.is.mobile ? 'row':'col')"
              outlined
              dense
              v-model="filterType"
              :options="options"
              :style="($q.platform.is.mobile ? 'width: 100%' : 'max-width: 250px; width: 180px')"
              label="Selecione um filtro"
              />

              <q-select
                dense
                outlined
                :class="($q.platform.is.mobile ? 'row':'col')"
                v-model="filterString"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="autoCompleteFiltered"
                @input="isValid = true"
                @filter="filterFn"
                :label="`Escolha ${filterTypeWithGender}`"
                :style="($q.platform.is.mobile ? 'margin-top: 20px; width: 100%;' : `max-width: 250px; margin-left: 5%; margin-bottom: -20px;`) + (filterType ? '' : 'transform: scale(0)')"
                :error="!isValid"
              >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sem resultados
                  </q-item-section>
                </q-item>
              </template>
                <template v-slot:error>
                  Nada encontrado.
                </template>
              </q-select>

              <span :class="$q.platform.is.mobile ? 'row' : 'row'" :style="$q.platform.is.mobile ? 'margin-left: auto;' : 'margin-left: 5%; margin-right: 12px'">
                <q-btn color="purple" :style="$q.platform.is.mobile ? 'margin-left: auto; margin-top: 10px' : 'width: 100%; max-width: 150px '" @click="fetchData" label="Pesquisar"/>
              </span>
            </div>
        </div>

          <div class="col">
            <table-of-countries
              class="row q-mx-auto"
              :columns="columns"
              :pagination="pagination"
              :pagesNumber="pagesNumber"
              :countries="countries"
            />
            <div class="row justify-center q-mt-lg q-mb-xl q-mr-md">
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
import { Loading } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import tableOfCountries from '../components/tableOfCountries.vue';

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
      countries: [],
      data: {},
      options: ['Região', 'Capital', 'Língua', 'Código de ligação', 'País'],
      autoCompleteFiltered: [],
      filterType: '',
      filterString: '',
      pagination: {
        page: 1,
        rowsPerPage: 12
      },
      pagesNumber: 4,
      isValid: true,
      loading: true
    }
  },
  methods: {
    ...mapActions('data', ['setAutocompleteData']),
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
    filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }

      update(() => {

        const needle = val.toLowerCase()

        switch (this.filterType) {
          case 'Região':
            this.autoCompleteFiltered = this.data.regions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            break;
          case 'Capital':
            this.autoCompleteFiltered = this.data.capitals.filter(v => v.toLowerCase().indexOf(needle) > -1)
            break;
          case 'Língua':
            this.autoCompleteFiltered = this.data.langs.filter(v => v.toLowerCase().indexOf(needle) > -1)
            break;
          case 'Código de ligação':
            this.autoCompleteFiltered = this.data.callingCodes.filter(v => v.toLowerCase().indexOf(needle) > -1)
            break;
          case 'País':
            this.autoCompleteFiltered = this.data.countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
            break;
        }
      })
    },
     checkLoading () {
      if (this.countries.length > 0) {
        Loading.hide()
        this.loading = false
      } else {
        Loading.show()
        this.loading = true
      }
    }
  },
  watch: {
    filterType () {
      this.filterString = ''
    },
    ACData () {
      this.data = { ...this.ACData }
      this.countries = this.data.unfiltered
      this.pagesNumber = Math.ceil(this.countries.length / this.pagination.rowsPerPage)
      this.checkLoading()
    }
  },
  computed: {
    ...mapGetters('data', {
      ACData: 'autocompleteData'
    }),
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
          return 'name';
        default:
          return '';
      }
    },
    filterTypeWithGender () {
      if (this.filterType === 'País' || this.filterType === 'Código de ligação') {
        return `um ${this.filterType.toLowerCase()}`
      }
      return `uma ${this.filterType.toLowerCase()}`
    }
  },
  mounted () {
    this.checkLoading()
    this.setAutocompleteData()
  }
}
</script>
