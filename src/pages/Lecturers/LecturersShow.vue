<template>
  <div>
      <h2>Show Lecturer Page</h2>

    <p>
        {{ lecturer.name }}
    </p>
    <br>
    <section>
        <b-button @click="editLecturer">Edit</b-button>
        <b-button @click="deleteLecturer">Delete</b-button>
    </section>
  </div>
</template>

<script>
import axios from '@/config'

export default {
  name: 'LecturersShow',
  components: {
  },
  data(){
      return {
          lecturer: {}
      }
  },
  mounted(){
      this.getData()
  },
  methods: {
      getData() {
          let token = localStorage.getItem('token')

          axios
          .get(`/lecturers/${this.$route.params.id}`,
          {
              headers: {
                  "Authorization" : `Bearer ${token}`
                  }
          })
          .then(response => {
              console.log(response.data)
              this.lecturer = response.data.data
          })
          .catch(error =>  {
            console.log(error)
           // this.$emit('invalid-token')
          })
      },
      deleteLecturer() {
          let token = localStorage.getItem('token')
          
          if(confirm(`Are you sure you want to delete '${this.lecturer.name}'`)){
              axios.delete(`/lecturers/${this.$route.params.id}`,
          {
              headers: {
                  "Authorization" : `Bearer ${token}`
                  }
          })
          .then(response => {
              console.log(response.data)
              this.$router.push({
                        name: "lecturers_index"
                    })
          })
          .catch(error =>  {
            console.log(error)
           // this.$emit('invalid-token')
          })
          }
      },
      editLecturer() {
                this.$router.push({
                    name: 'lecturer_edit'
                })
            }
  }
}
</script>

<style scoped>
</style>