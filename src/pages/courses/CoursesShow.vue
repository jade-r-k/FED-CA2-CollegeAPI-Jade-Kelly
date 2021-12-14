<template>
    <div>
        <h2>Show Course Page</h2>

        <p>
            {{ course.title }}
            <br>
            {{ course.description }}
        </p>
        <br>
        <section>
            <b-button @click="editCourse">Edit</b-button>
        </section>
        <section>
            <b-button @click="deleteCourse">Delete</b-button>
        </section>
    </div>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'CoursesShow',
        components: {},
        data() {
            return {
                course: {}
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let token = localStorage.getItem('token')

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
            editCourse() {
                this.$router.push({
                    name: 'course_edit'
                })
            }
        }
    }
</script>

<style scoped>
</style>