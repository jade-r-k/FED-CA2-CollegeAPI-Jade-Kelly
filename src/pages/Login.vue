<template>
    <div>
        <p class="title" style="text-align: center; color: #714dd2;">Login</p>
        <br>
        <div class="columns is-mobile">
            <div class="card column is-half is-offset-one-quarter">
                <!-- Login form -->
                <section>
                    <b-field label="Email">
                        <b-input type="email" v-model="form.email"></b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input type="password" v-model="form.password" password-reveal></b-input>
                    </b-field>
                    <br>
                    <!-- Login method(vuex-store.js) -->
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
                    email: "",
                    password: ""
                }
            }
        },
        // if user is logged in - loggedIn = true
        computed: {
            ...mapState(['loggedIn'])
        },
        //login method in store.js
        methods: {
            ...mapActions(['login'])
        }
    }
</script>

<style scoped>
</style>