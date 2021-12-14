<template>
    <div>
        <div>
            Email: <input type="email" v-model="form.email" />
            <br>
            Password: <input type="password" v-model="form.password" />
            <br>
            <button @click="login(form)">Submit</button>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex'

    export default {
        name: 'Login',
        components: {},
        props: {},
        data() {
            return {
                form: {
                    email: "jade@bloggs.com",
                    password: "secret"
                }
            }
        },
        computed: {
            ...mapState(['loggedIn'])
        },
        methods: {
            ...mapActions(['login'])
        }
    }
</script>

<style scoped>
</style>