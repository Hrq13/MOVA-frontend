<template>
  <q-page class="page" style="font-size: 13.5pt;">
    <div
      class="bg-image"
      :style="`background-image: url(${backgroundUrl});`"
    />
      <q-intersection
        transition="scale"
      >

        <div class="row">

          <div class="col col-1-1">
            <q-img
              class="row prof-pic"
              style="border-radius: 10px"
              src="https://media-exp1.licdn.com/dms/image/C4E03AQF5J1zxGWyUFQ/profile-displayphoto-shrink_800_800/0/1614892817612?e=1626912000&v=beta&t=qkVreKcvODFhtCYu23zxKS6xYqToj-amNuDVs3-dhgg"
              :ratio="1"
              width="100%"
              height="225px"
            />

            <div class="col col-2">
              <span class="row">
                <p style="margin: 0 auto; font-weight: 600; font-size: 11pt;">What I've worked with</p>
                <q-list
                  class="rounded-borders"
                  style="width: 350px; font-size: 12pt;"
                >

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://i2.wp.com/blog.logrocket.com/wp-content/uploads/2021/01/Vue-logo-dark-background.png?fit=730%2C521&ssl=1">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Vue.js</q-item-label>
                      <q-item-label caption lines="2">
                        <q-linear-progress dark size="10px" :value="0.65" color="secondary" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://walde.co/wp-content/uploads/2016/09/nodejs_logo.png">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Node.js</q-item-label>
                      <q-item-label caption lines="2">
                        <q-linear-progress dark size="10px" :value="0.25" color="light-green-8" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://v0-17.quasar-framework.org/images/quasar-logo-big.png">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Quasar</q-item-label>
                      <q-item-label caption lines="2">
                          <q-linear-progress dark size="10px" :value="0.85" color="blue-9" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://img1.gratispng.com/20181204/trz/kisspng-mysql-database-insert-table-mysql-png-logos-free-download-5c064d0c6fb466.1460181915439168124576.jpg">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">MySQL</q-item-label>
                      <q-item-label caption lines="2">
                        <q-linear-progress dark size="10px" :value="0.46" color="orange-9" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-ripple>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://emanueleciriachi.net/wp-content/uploads/2019/01/logo-mongodb-png-mongodb-logo-png-400.png">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">MongoDB</q-item-label>
                      <q-item-label caption lines="2">
                        <q-linear-progress dark size="10px" :value="0.7" color="green-9" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                </q-list>
              </span>
            </div>

            <div class="col third-bio">
              Ps: Hover over bold texts to interact with them!
            </div>

            <div class="col secondary-bio">
              Currently I'm a Systems Analysis and Development student at FATEC
              and hopefully will be working as a developer soon!!
            </div>

          </div>

          <div class="col my-info">
            <div class="main-bio">
              Hello, I am
              <b>
                <span
                  class="fullNameHover"
                  @mouseover="showName = true"
                  @mouseleave="showName = false">
                  Henrique
                </span>

                <transition
                  appear
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                >
                  <span
                    v-show="showName"
                  > Fialho Miranda</span>
                </transition>

              </b> and I am a <b>
                <span>
                  full-stack JavaScript developer
                  <q-tooltip>
                    HTML, CSS, Vue.js, Node.js, MongoDB and MySQL are my favorites!!
                  </q-tooltip>
                </span>
              </b>.<br><br>
              I'm glad you are here. :)<br><br>
              This is an app I built with the purpose of sharing a little bit of my life and who I am.<br>
              In fact, you can also run this application on your Android phone as well as on your pc browser.
            </div>

            <div>
              <div class="col fourth-bio">
                I also have made some personal projects that you can check out on my GitHub page.<br><br>
                As of now, I'm looking for a job as web developer. I'm open to new challenges and learning experiences.
              </div>
            </div>

          </div>

        </div>
      </q-intersection>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  props: {
    backgroundUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      me: {
        name: 'Henrique Fialho Miranda',
        username: 'Henrique',
        email: 'h.miranda20@outlook.com'
      },
      showName: false,
      b: '<br>'
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  background-color: $dark;
  color: rgb(255, 255, 255);
}
.bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  filter: blur(7px) brightness(50%);
  z-index: 0;
  width: 100%;
  height: 100%;
}
.col-1-1 {
  z-index: 0;
  max-width: 225px;
  border-radius: 7px;
  margin: 15.5px 7px 10px 2%;
}
.my-info {
  z-index: 0;
}
.main-bio {
  margin: 15px 7px 0 0;
  padding: 2px 5px;
  background-color: grey;
  border-radius: 3px;
  font-weight: 500;
}
.col-2, .sixth-bio, .secondary-bio, .third-bio {
  margin: 9px 0 0 1px;
  background-color: grey;
  width: 99%;
  border-radius: 3px;
}
.fourth-bio, .fifth-bio {
  margin: 9px 7px 0 0;
  padding: 2px 5px;
  font-weight: 500;
  background-color: grey;
  border-radius: 3px;
}
.secondary-bio, .third-bio {
  padding: 2px 5px;
  font-weight: 500;
}
</style>
