<template>
    <div>
        <section>
            <b-field label="Title" >
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
            <section>
                <b-button @click="submitForm()">Submit</b-button>
                <b-button @click="cancel()">Cancel</b-button>
            </section>
        </section>
    </div>
</template>

<script>
import axios from '@/config'

    export default {
        name: 'CreateCourses',
        data() {
            return {
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
                
                axios.post('/courses', {
                    title: this.form.title,
                    code: this.form.code,
                    description: this.form.description,
                    points: this.form.points,
                    level: this.form.level
                }, {
                    headers: {
                  "Authorization" : `Bearer ${token}`
                  }
                })
                .then(response =>{
                    console.log(response.data)
                    this.$router.push({
                        name: "courses_index"
                    })
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response.data)
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