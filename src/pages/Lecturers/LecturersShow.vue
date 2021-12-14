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

          if (this.lecturer.enrolments.length === 0) {
                    if (confirm("Do you really want to delete?")) {
                        axios.delete(`/lecturers/${this.$route.params.id}`, {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then(response => {
                                console.log(response.data)
                                this.$router.push({
                                    name: "lecturers_index"
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                // this.$emit('invalid-token')
                            })
                    }
                } else {
                    if (confirm(
                            "This lecturer has enrolments. Do you want to delete this lecturer and all their enrolements?"
                        )) {
                        this.lecturer.enrolments.forEach((enrolment) => {
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

                        axios.delete(`/lecturers/${this.$route.params.id}`, {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then(response => {
                                console.log(response.data)
                                this.$router.push({
                                    name: "lecturers_index"
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                // this.$emit('invalid-token')
                            })

                    }
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