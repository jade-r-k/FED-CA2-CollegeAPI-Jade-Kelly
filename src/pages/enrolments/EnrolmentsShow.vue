<template>
  <div>
      <p class="title" style="text-align: center; color: #714dd2;">Enrolment</p>
        <br>
        <div class="columns is-mobile" style="text-align: center;">
            <div class="card column is-half is-offset-one-quarter">
                <p class="subtitle">Status: {{ enrolment.status }}</p>
                <p class="subtitle">Lecturer: {{ enrolment.lecturer.name }}</p>
                <p class="subtitle">Course: {{ enrolment.course.title }}</p>
                <p class="subtitle">Date/Time: {{ enrolment.date }} {{ enrolment.time }}</p>
                <div class="buttons is-centered">
                    <b-button @click="editEnrolment" type="is-success">Edit</b-button>
                    <b-button @click="deleteEnrolment" type="is-danger">Delete</b-button>
                    <b-button @click="previousPage" type="is-primary">Return</b-button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from '@/config'

export default {
  name: 'EnrolmentsShow',
  components: {
  },
  data(){
      return {
          enrolment: {}
      }
  },
  mounted(){
      this.getData()
  },
  methods: {
      getData() {
          let token = localStorage.getItem('token')

          axios
          .get(`/enrolments/${this.$route.params.id}`,
          {
              headers: {
                  "Authorization" : `Bearer ${token}`
                  }
          })
          .then(response => {
              console.log(response.data)
              this.enrolment = response.data.data
          })
          .catch(error =>  {
            console.log(error)
           // this.$emit('invalid-token')
          })
      },
      deleteEnrolment() {
          let token = localStorage.getItem('token')
          
          if(confirm("Do you really want to delete?")){
              axios.delete(`/enrolments/${this.$route.params.id}`,
          {
              headers: {
                  "Authorization" : `Bearer ${token}`
                  }
          })
          .then(response => {
              console.log(response.data)
              this.$router.push({
                        name: "enrolments_index"
                    })
          })
          .catch(error =>  {
            console.log(error)
           // this.$emit('invalid-token')
          })
          }
      },
      editEnrolment() {
                this.$router.push({
                    name: 'enrolment_edit'
                })
            },
            previousPage() {
                this.$router.push({
                        name: "enrolments_index"
                    })
            }
  }
}
</script>

<style scoped>
</style>