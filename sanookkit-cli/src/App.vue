<template>
  <v-app>
    <nav-bar  v-if="$route.path != '/signin' && $route.path != '/admin' && $route.path != '/signup'"/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',

  data() {
    return {
      nav_type: '',
      access_token: ""
    }
  },
  components: {
    NavBar
  },
  asyncComputed: {
    accessToken() {
      this.access_token = localStorage.getItem('accessToken')
      return this.access_token
    },
    navType() {
      return this.nav_type
    }
  },
  beforeCreate () {
    this.access_token = localStorage.getItem('accessToken')
    console.log(this.access_token)
    if (!this.access_token) {
      switch (this.$route.path) {
        case '/dashboard': 
        case '/manage-student': 
        case '/manage-learning-resource': 
        case'/manage-admin':
          this.nav_type = 'dashboard'
          this.$router.push('/admin')
          break;
        case '/tracking':
          this.nav_type = 'normal'
          this.$router.push('/')
        default:
          this.nav_type = 'normal'
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
body {
  font-family: 'Itim', cursive;

}
#app {
  font-family: 'Itim', cursive;

}
.v-main {

    // position: absolute;
    // top: 0px;
}
</style>