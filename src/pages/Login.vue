<template>
<div>
    <p class="title" style="text-align: center; color: #714dd2;">Welcome to FED College</p>
    <br>
    <div class="columns is-mobile">
        <div class="card column is-half is-offset-one-quarter">
        <section>
            <b-field label="Email">
                <b-input type="email" v-model="form.email"></b-input>
            </b-field>

            <b-field label="Password">
                <b-input type="password" v-model="form.password" password-reveal></b-input>
            </b-field>
            <br>
            <div style="text-align: center;">
            <b-button @click="login(form)" type="is-primary">Login</b-button>
            </div>
        </section>
        </div>
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