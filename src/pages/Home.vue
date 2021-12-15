<template>
    <div style="text-align: center;">
        <p class="title" style="color: #714dd2;">Welcome to FED College</p>
        <br>
        <p v-if="!loggedIn" class="subtitle">Please login or register in order to use the services available.</p>
        <p v-else class="subtitle">{{ this.user }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

    export default {
        name: 'Home',
        data(){
            return{
                user: localStorage.getItem('user')
            }
        },
        computed: {
    ...mapState(['loggedIn'])
  },
    }
</script>

<style scoped>
</style>