<template>
    <div style="text-align: center;">
        <p class="title" style="color: #714dd2;">Welcome to FED College</p>
        <br>
        <p v-if="!loggedIn" class="subtitle">Please login or register in order to use the services available.</p>
        <p v-else class="subtitle">{{ user.name }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/config'

    export default {
        name: 'Home',
        data(){
            return{
                user: {}
            }
        },
        mounted() {
            this.getData()
        },
        computed: {
    ...mapState(['loggedIn'])
    },
    methods: {
            getData() {
                let token = localStorage.getItem('token')

                axios
                    .get(`/user`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.user = response.data.user
                    })
                    .catch(error => {
                        console.log(error)
                        // this.$emit('invalid-token')
                    })
            }
            }
    }
</script>

<style scoped>
</style>