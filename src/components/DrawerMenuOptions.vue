<template>
  <q-item
    clickable
    v-ripple
    :tag="clickable ? 'a' : 'q-item'"
    target="_blank"
    @click="handleClick"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>


<script>
export default {
  name: 'DrawerMenuOptions',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    },
    clickable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick(e) {
      if (this.link.indexOf('http') !== -1) {
        console.log(this.link.indexOf('http'))
        window.open(this.link);
      } else {
        if (this.$route.path !== '/' + this.link) {
          this.$router.push(this.link);
        }
      }
    }
  }
}
</script>
