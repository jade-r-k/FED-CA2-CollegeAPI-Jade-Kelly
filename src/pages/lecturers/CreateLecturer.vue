<template>
    <div>
        <section>
            <b-field label="Name" >
                <b-input v-model="form.name"></b-input>
            </b-field>
            <b-field label="Address">
                <b-input v-model="form.address"></b-input>
            </b-field>
            <b-field label="Phone">
                <b-input type="number" v-model="form.phone"></b-input>
            </b-field>
            <b-field label="Email">
                <b-input type="email" v-model="form.email"></b-input>
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
                    name: "",
                    address: "",
                    phone: 0,
                    email: ""
                }
            }
        },
        methods: {
            submitForm() {
                let token = localStorage.getItem('token')
                
                axios.post('/lecturers', {
                    name: this.form.name,
                    address: this.form.address,
                    phone: this.form.phone,
                    email: this.form.email
                }, {
                    headers: {
                  "Authorization" : `Bearer ${token}`
                  }
                })
                .then(response =>{
                    console.log(response.data)
                    this.$router.push({
                        name: "lecturers_index"
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