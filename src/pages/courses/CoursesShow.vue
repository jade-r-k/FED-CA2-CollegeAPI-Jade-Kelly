<template>
    <div>
        <!-- Display data of course -->
        <p class="title" style="text-align: center; color: #714dd2;">{{ course.title }}</p>
        <br>
        <div class="columns is-mobile" style="text-align: center;">
            <div class="card column is-half is-offset-one-quarter">
                <p class="subtitle">Code: {{ course.code }}</p>
                <p class="subtitle">Points: {{ course.points }}</p>
                <p class="subtitle">Level: {{ course.level }}</p>
                <div class="content">
                    <p class="subtitle">Description:</p>
                    {{ course.description }}
                </div>
                <div class="buttons is-centered">
                    <!-- Links to EditCourse.vue -->
                    <b-button @click="editCourse" type="is-success">Edit</b-button>
                    <!-- Delete course method -->
                    <b-button @click="deleteCourse" type="is-danger">Delete</b-button>
                    <!-- Links to CoursesIndex.vue -->
                    <b-button @click="previousPage" type="is-primary">Return</b-button>
                </div>
            </div>
        </div>
        <br>
        <p class="subtitle" style="text-align: center;">Enrolments</p>
        <!-- If there are no enrolments display text instead of empty table -->
        <p v-if="this.course.enrolments.length === 0" style="text-align: center;">This course has no enrolments</p>
        <b-table v-else :data="course.enrolments" :columns="columns" striped>
        </b-table>
    </div>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'CoursesShow',
        components: {},
        data() {
            return {
                course: {},
                columns: [{
                        field: 'id',
                        label: 'ID',
                        sortable: true
                    },
                    {
                        field: 'status',
                        label: 'Status',
                        sortable: true
                    },
                    {
                        field: 'lecturer.name',
                        label: 'Lecturer',
                        sortable: true,
                    }
                ]
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let token = localStorage.getItem('token')

                //get course by id
                axios
                    .get(`/courses/${this.$route.params.id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.course = response.data.data
                    })
                    .catch(error => {
                        console.log(error)
                        // this.$emit('invalid-token')
                    })
            },
            deleteCourse() {
                let token = localStorage.getItem('token')

                //delete course by id
                //if the course has enrolments delete all enrolments first then delete course
                if (this.course.enrolments.length === 0) {
                    if (confirm("Do you really want to delete?")) {
                        axios.delete(`/courses/${this.$route.params.id}`, {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then(response => {
                                console.log(response.data)
                                this.$router.push({
                                    name: "courses_index"
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                // this.$emit('invalid-token')
                            })
                    }
                } else {
                    if (confirm(
                            "This course has enrolments. Do you want to delete this course and all it's enrolements?"
                        )) {
                        this.course.enrolments.forEach((enrolment) => {
                            axios
                                .delete(`/enrolments/${enrolment.id}`, {
                                    headers: {
                                        "Authorization": `Bearer ${token}`
                                    }
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        });

                        axios.delete(`/courses/${this.$route.params.id}`, {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then(response => {
                                console.log(response.data)
                                this.$router.push({
                                    name: "courses_index"
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                // this.$emit('invalid-token')
                            })

                    }
                }
            },
            //go to edit course
            editCourse() {
                this.$router.push({
                    name: 'course_edit'
                })
            },
            //go to course index
            previousPage() {
                this.$router.push({
                    name: 'courses_index'
                })
            }
        }
    }
</script>

<style scoped>
</style>