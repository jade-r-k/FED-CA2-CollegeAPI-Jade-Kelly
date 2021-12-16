<template>
<div>
    <p class="title" style="text-align: center; color: #714dd2;">Register</p>
    <br>
    <div class="columns is-mobile">
        <div class="card column is-half is-offset-one-quarter">
        <section>
            <b-field label="Name">
                <b-input v-model="form.name"></b-input>
            </b-field>
            <b-field label="Email">
                <b-input type="email" v-model="form.email"></b-input>
            </b-field>

            <b-field label="Password">
                <b-input type="password" v-model="form.password" password-reveal></b-input>
            </b-field>
            <br>
            <div style="text-align: center;">
            <b-button @click="register(form)" type="is-primary">Register</b-button>
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
        name: 'Register',
        components: {},
        props: {},
        data() {
            return {
                form: {
                    name: "",
                    email: "",
                    password: ""
                }
            }
        },
        computed: {
            ...mapState(['loggedIn'])
        },
        methods: {
            ...mapActions(['register'])
        }
    }
</script>

<style scoped>
</style>