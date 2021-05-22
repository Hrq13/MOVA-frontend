<template>
  <q-page class="page">
    <div class="components">
      <desktop-me
        v-if="!$q.platform.is.mobile"
        :backgroundUrl="backgroundUrl"
      />
      <mobile-me
        v-else
        :backgroundUrl="backgroundUrl"
      />
    </div>
  </q-page>
</template>

<script>
import desktopMe from './../components/desktop/Me/tiles'
import mobileMe from './../components/mobile/Me/tiles'

export default {
  name: 'PageIndex',
  components: {
    desktopMe,
    mobileMe
  },
  data () {
    return {
      backgroundUrl: 'https://placeimg.com/500/300/nature'
    }
  }
}
</script>
