<template>
    <div>
        <div v-if="!loggedIn">
            <p class="subtitle">Please login or register in order to use the services available.</p>
        </div>
        <div v-else>
            <div style="text-align: center;">
            <p class="title" style="color: #714dd2;">Courses</p>
            <br>
            <section>
                <b-button @click="createCourse" type="is-primary">Create New Course</b-button>
            </section>
            <br>
        </div>
        <b-table :data="data" :columns="columns" @select="selected" striped focusable>
        </b-table>
        </div>
    </div>
</template>

<script>
    import axios from '@/config'
    import { mapState } from 'vuex'

    export default {
        name: 'CoursesIndex',
        components: {},
        data() {
            return {
                data: [],
                columns: [{
                        field: 'code',
                        label: 'Code',
                        sortable: true,
                        searchable: true,
                    },
                    {
                        field: 'title',
                        label: 'Title',
                        sortable: true,
                        searchable: true,
                    },
                    {
                        field: 'level',
                        label: 'Level',
                        sortable: true,
                    },
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

                axios
                    .get(`/courses`, {
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
                    name: 'courses_show',
                    params: {
                        id: data.id
                    }
                })
            },
            createCourse() {
                this.$router.push({
                    name: 'course_create'
                })
            }
        }
    }
</script>

<style scoped>
</style>