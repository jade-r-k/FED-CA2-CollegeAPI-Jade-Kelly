<template>
  <div id="app">
    <Navbar />
    <br>
    <div class="container">
      <!-- Current Page -->
      <router-view />
    </div>
    <br>
    <Footer />
  </div>
</template>

<script>
  //import components
  import Navbar from "@/components/Navbar.vue"
  import Footer from "@/components/Footer.vue"

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    },
    data() {
      return {

      }
    },
    created() {
      //logged in status
      if (localStorage.getItem('token')) {
        this.$store.commit('SET_LOGGED_IN_STATUS', true)
      } else {
        this.$store.commit('SET_LOGGED_IN_STATUS', false)
      }
    },
  }
</script>

<style>
</style>