<template>
    <div>
        <p class="title" style="text-align: center; color: #714dd2;">Edit Lecturer</p>
        <br>
        <div class="columns is-mobile">
            <div class="card column is-half is-offset-one-quarter">
                <section>
                    <b-field label="Name">
                        <b-input v-model="form.name"></b-input>
                    </b-field>
                    <b-field label="Address">
                        <b-input v-model="form.address"></b-input>
                    </b-field>
                    <b-field label="Phone">
                        <b-input v-model="form.phone"></b-input>
                    </b-field>
                    <b-field label="Email">
                        <b-input type="email" v-model="form.email"></b-input>
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
                    name: '',
                    address: '',
                    phone: '',
                    email: ''
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let token = localStorage.getItem('token')
                axios
                    .get(`/lecturers/${this.$route.params.id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)

                        this.form.name = response.data.data.name
                        this.form.address = response.data.data.address
                        this.form.phone = response.data.data.phone
                        this.form.email = response.data.data.email
                    })
                    .catch(error => console.log(error))
            },
            submitForm() {
                let token = localStorage.getItem('token')

                axios.put(`/lecturers/${this.$route.params.id}`, this.form, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.$router.push({
                            name: "lecturers_show",
                            params: {
                                id: this.$route.params.id
                            }
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