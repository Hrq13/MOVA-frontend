<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white" style="padding: 10px 0" elevated>
      <span class="row" style="color: black">

            <q-img
              class="q-ml-lg"
              src="https://mova.vc/img/footer_mova.svg"
              spinner-color="black"
              width="80px"
              height="30"
            />

          <q-toolbar class="col">
            <span style="margin-left: auto">
              <q-btn outline color="purple" class="q-mr-lg" icon="keyboard_return" label="Voltar" />
            </span>
          </q-toolbar>
      </span>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: false,
      miniState: false,
    }
  },
  methods: {
    drawerClick (e) {
      if (this.miniState) {
        this.miniState = false
        e.stopPropagation()
      }
    }
  }
}
</script>
