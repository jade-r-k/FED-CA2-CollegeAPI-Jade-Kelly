<template>
  <div>
      <h2>Show Enrolment Page</h2>

    <p>
        {{ enrolment.id }}
        <br>
        {{ enrolment.status }}
    </p>
    <br>
    <section>
        <b-button @click="editEnrolment">Edit</b-button>
    </section>
    <section>
        <b-button @click="deleteEnrolment">Delete</b-button>
    </section>
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
            }
  }
}
</script>

<style scoped>
</style>