<template>
    <div>
        <p class="title" style="text-align: center; color: #714dd2;">Edit Course</p>
        <br>
        <div class="columns is-mobile">
            <div class="card column is-half is-offset-one-quarter">
                <!-- Edit course form -->
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
                        <b-button @click="submitForm()" type="is-success">Submit</b-button>
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
        name: 'EditCourse',
        data() {
            return {
                form: {
                    title: '',
                    code: '',
                    description: '',
                    points: 0,
                    level: 0
                }
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

                        this.form.title = response.data.data.title
                        this.form.code = response.data.data.code
                        this.form.description = response.data.data.description
                        this.form.points = response.data.data.points
                        this.form.level = response.data.data.level
                    })
                    .catch(error => console.log(error))
            },
            submitForm() {
                let token = localStorage.getItem('token')

                //edit course by id
                axios.put(`/courses/${this.$route.params.id}`, this.form, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.$router.push({
                            name: "courses_show",
                            params: {
                                id: this.$route.params.id
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                        alert("There was a problem editing this course.")
                    })
            },
            cancel() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
</style>