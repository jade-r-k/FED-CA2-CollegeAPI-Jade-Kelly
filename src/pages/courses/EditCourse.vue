<template>
  <div>
      <h2>Edit Course</h2>
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
        mounted(){
            this.getData()
        },
        methods: {
            getData() {
                let token = localStorage.getItem('token')
			axios
				.get(`/courses/${this.$route.params.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log(response.data)
                        
                        this.form.title = response.data.data.title
                        this.form.code = response.data.data.code
                        this.form.description = response.data.data.description
                        this.form.points = response.data.data.points
                        this.form.level = response.data.data.level
					}
				)
				.catch(error => console.log(error))
            },
            submitForm() {
                let token = localStorage.getItem('token')
                
                axios.put(`/courses/${this.$route.params.id}`, this.form, {
                    headers: {
                  "Authorization" : `Bearer ${token}`
                  }
                })
                .then(response =>{
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