<template>
    <div>
        <p class="title" style="text-align: center; color: #714dd2;">Create Course</p>
        <br>
        <div class="columns is-mobile">
            <div class="card column is-half is-offset-one-quarter">
                <!-- Create course form -->
                <section>
                    <b-field label="Title">
                        <b-input v-model="form.title"></b-input>
                    </b-field>
                    <b-field label="Code">
                        <b-input v-model="form.code"></b-input>
                    </b-field>
                    <b-field label="Description">
                        <b-input type="textarea" v-model="form.description"></b-input>
                    </b-field>
                    <b-field label="Points">
                        <b-numberinput v-model="form.points"></b-numberinput>
                    </b-field>
                    <b-field label="Level">
                        <b-numberinput v-model="form.level"></b-numberinput>
                    </b-field>
                    <div class="buttons is-centered">
                        <!-- Submut form method -->
                        <b-button @click="submitForm()" type="is-success">Submit</b-button>
                        <!-- Goes back to CourseShow.vue -->
                        <b-button @click="cancel()" type="is-danger">Cancel</b-button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'CreateCourses',
        data() {
            return {
                //form
                form: {
                    title: "",
                    code: "",
                    description: "",
                    points: 0,
                    level: 0
                }
            }
        },
        methods: {
            submitForm() {
                let token = localStorage.getItem('token')

                //create a new course
                axios.post('/courses', {
                        title: this.form.title,
                        code: this.form.code,
                        description: this.form.description,
                        points: this.form.points,
                        level: this.form.level
                    }, {
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
                        console.log(error.response.data)
                        alert("There was a problem creating this course.")
                    })
            },
            //go to course show
            cancel() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
</style>