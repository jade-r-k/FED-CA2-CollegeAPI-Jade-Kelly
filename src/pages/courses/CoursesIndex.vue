<template>
    <div>
        <div style="text-align: center;">
            <p class="title">Courses</p>
        </div>
        <b-table :data="data" :columns="columns" @select="selected" striped focusable>
        </b-table>
    </div>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'CoursesIndex',
        components: {},
        data() {
            return {
                data: [],
                columns: [{
                        field: 'code',
                        label: 'Code',
                        sortable: true
                    },
                    {
                        field: 'title',
                        label: 'Title',
                        sortable: true
                    },
                    {
                        field: 'level',
                        label: 'Level',
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
                this.$router.push({name: 'courses_show', params: { id: data.id }})
            }
        }
    }
</script>

<style scoped>
</style>