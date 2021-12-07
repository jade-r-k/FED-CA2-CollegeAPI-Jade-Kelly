<template>
    <div>
        <b-navbar>
            <template #brand>
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <Icon icon="twemoji:books" width="36" height="36" />
                    <p class="title is-4" style="margin-left: 10px">FED College</p>
                </b-navbar-item>
            </template>
            <template #start>
                <b-navbar-item href="#">
                    Courses
                </b-navbar-item>
                <b-navbar-item href="#">
                    Lecturers
                </b-navbar-item>
                <b-navbar-item href="#">
                    Enrolements
                </b-navbar-item>
            </template>

            <template #end>
                <b-navbar-item href="#">
                    <Icon style="margin-right: 4px" icon="carbon:login" />
                    Login
                </b-navbar-item>
                <b-navbar-item href="#">
                    <Icon style="margin-right: 4px" icon="carbon:user-follow" />
                    Register
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>

<script>
    import {
        Icon
    } from '@iconify/vue2';

    export default {
        name: 'Navbar',
        components: {
            Icon,
        },
    }
</script>

<style scoped>
</style>