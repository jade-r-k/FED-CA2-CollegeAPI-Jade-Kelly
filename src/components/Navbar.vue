<template>
    <div>
        <b-navbar style="background-color: #E0D8DE">
            <template #brand>
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <Icon icon="twemoji:books" width="36" height="36" />
                    <p class="title is-4" style="margin-left: 10px; color: #6A6262;">FED College</p>
                </b-navbar-item>
            </template>
            <template #start>
                <b-navbar-item tag="div">
                    <b-navbar-item tag="router-link" :to="{ path: '/courses/index' }">
                        Courses
                    </b-navbar-item>
                    <b-navbar-item tag="router-link" :to="{ path: '/lecturers/index' }">
                        Lecturers
                    </b-navbar-item>
                    <b-navbar-item tag="router-link" :to="{ path: '/enrolments/index' }">
                        Enrolements
                    </b-navbar-item>
                </b-navbar-item>
            </template>

            <template #end>
                <div v-if="!loggedIn">
                    <b-navbar-item tag="div">
                        <b-navbar-item tag="router-link" :to="{ path: '/login' }">
                            <Icon style="margin-right: 4px;" icon="carbon:login" color="#6a6262" />
                            Login
                        </b-navbar-item>
                        <b-navbar-item tag="router-link" :to="{ path: '/register' }">
                            <Icon style="margin-right: 4px;" icon="carbon:user-follow" color="#6a6262" />
                            Register
                        </b-navbar-item>
                    </b-navbar-item>
                </div>
                <b-navbar-item v-else @click="logout">
                    <Icon style="margin-right: 4px;" icon="carbon:logout" />
                    Logout
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    import {
        Icon
    } from '@iconify/vue2';

    export default {
        name: 'Navbar',
        components: {
            Icon,
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            }
        },
        computed: {
            ...mapState(['loggedIn'])
        },
    }
</script>

<style scoped>
a:hover {
  background-color: #EAE2E8;
  color: #53A2BE;
}
</style>