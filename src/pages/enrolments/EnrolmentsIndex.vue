<template>
    <div>
        <div v-if="!loggedIn">
            <p class="subtitle">Please login or register in order to use the services available.</p>
        </div>
        <div v-else>
            <div style="text-align: center;">
                <p class="title" style="color: #714dd2;">Enrolments</p>
                <br>
                <section>
                    <b-button @click="createEnrolment" type="is-primary">Create New Enrolment</b-button>
                </section>
            </div>
            <br>
            <!-- Table to display all enrolments -->
            <b-table :data="data" :columns="columns" @select="selected" striped focusable>
            </b-table>
        </div>
    </div>
</template>

<script>
    import axios from '@/config'
    import {
        mapState
    } from 'vuex'

    export default {
        name: 'EnrolmentsIndex',
        components: {},
        data() {
            return {
                data: [],
                columns: [{
                        field: 'status',
                        label: 'Status',
                        sortable: true
                    },
                    {
                        field: 'course.title',
                        label: 'Course',
                        sortable: true,
                        searchable: true,
                    },
                    {
                        field: 'lecturer.name',
                        label: 'Lecturer',
                        sortable: true,
                        searchable: true,
                    }
                ]
            }
        },
        computed: {
            ...mapState(['loggedIn'])
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let token = localStorage.getItem('token')

                //get all enrolments
                axios
                    .get(`/enrolments`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.data = response.data.data
                    })
                    .catch(error => console.log(error))
            },
            selected(data) {
                this.$router.push({
                    name: 'enrolments_show',
                    params: {
                        id: data.id
                    }
                })
            },
            createEnrolment() {
                this.$router.push({
                    name: 'enrolment_create'
                })
            }
        }
    }
</script>

<style scoped>
</style>