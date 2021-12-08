<template>
    <div>
        <div style="text-align: center;">
            <p class="title">Lecturers</p>
            <section>
                <b-button @click="createLecturer">Create New Lecturer</b-button>
            </section>
        </div>
        <b-table :data="data" :columns="columns" @select="selected" striped focusable>
        </b-table>
    </div>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'LecturersIndex',
        components: {},
        data() {
            return {
                data: [],
                columns: [{
                        field: 'name',
                        label: 'Name',
                        sortable: true
                    },
                    {
                        field: 'email',
                        label: 'Email',
                        sortable: true
                    },
                    {
                        field: 'phone',
                        label: 'Phone',
                        sortable: true
                    },
                ]
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let token = localStorage.getItem('token')

                axios
                    .get(`/lecturers`, {
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
                    name: 'lecturers_show',
                    params: {
                        id: data.id
                    }
                })
            },
            createLecturer() {
                this.$router.push({
                    name: 'lecturer_create'
                })
            }
        }
    }
</script>

<style scoped>
</style>