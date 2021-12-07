<template>
  <div>
    <Navbar />
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
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
  created(){
   if(localStorage.getItem('token')) { 
     this.$store.commit('SET_LOGGED_IN_STATUS', true)
     }
     else {
      this.$store.commit('SET_LOGGED_IN_STATUS', false)
     }
  },
}
</script>

<style>

</style>
