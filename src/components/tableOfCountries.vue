<template>
  <div class="row justify-center q-mt-md">
    <div>
      <q-table
        grid
        style="max-width: 650px"
        v-if="countries.length > 0"
        :data="countries"
        :columns="columns"
        :pagination.sync="newPagination"
        row-key="name"
        hide-pagination
        hide-header
      >
        <template v-slot:item="props">
          <div class="justify-center">
            <q-card flat :class="$q.platform.is.mobile ? 'q-ma-lg' : 'q-mr-md q-mt-md q-ml-md'">
              <q-img class="cursor-pointer" :ratio="16/9" @click="selectCountry(props.row)" :width="$q.platform.is.mobile ? '260px':'125px'" :src="props.row.flag"/>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tableOfCountries',
  props: {
    columns: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    countries: {
      type: Array,
      required: true
    },
    pagesNumber: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      newPagination: this.pagination
    }
  },
  methods: {
    selectCountry (country) {
      this.$store.dispatch('data/setCountry', country)
      if (this.$route.path !== '/country') this.$router.push('/country')
    }
  },
  computed: {
    getPagination: {
      get () {
        return this.newPagination
      },
      set(v) {
        this.newPagination = v
      }
    }
  },
  watch: {
    newPagination () {
      this.newPagination = this.pagination
    }
  }
}
</script>
