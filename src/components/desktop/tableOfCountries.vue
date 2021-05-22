<template>
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
  }
}
</script>
