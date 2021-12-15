<template>
  <div>
      <p class="title" style="text-align: center; color: #714dd2;">{{ lecturer.name }}</p>
        <br>
        <div class="columns is-mobile" style="text-align: center;">
            <div class="card column is-half is-offset-one-quarter">
                <p class="subtitle">Email: {{ lecturer.email }}</p>
                <p class="subtitle">Phone: {{ lecturer.phone }}</p>
                <div class="content">
                    <p class="subtitle">Address:</p>
                    {{ lecturer.address }}
                </div>
                <div class="buttons is-centered">
                    <b-button @click="editLecturer" type="is-success">Edit</b-button>
                    <b-button @click="deleteLecturer" type="is-danger">Delete</b-button>
                    <b-button @click="previousPage" type="is-primary">Return</b-button>
                </div>
            </div>
        </div>
        <br>
        <p class="subtitle" style="text-align: center;">Enrolments</p>
        <p v-if="this.lecturer.enrolments.length === 0" style="text-align: center;">This lecturer has no enrolments</p>
        <b-table v-else :data="lecturer.enrolments" :columns="columns" striped>
        </b-table>
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
          lecturer: {},
          columns: [{
                        field: 'id',
                        label: 'ID',
                        sortable: true
                    },
                    {
                        field: 'status',
                        label: 'Status',
                        sortable: true
                    },
                    {
                        field: 'course.title',
                        label: 'Course',
                        sortable: true,
                    }
                ]
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
            },
            previousPage() {
                this.$router.go(-1)
            }
  }
}
</script>

<style scoped>
</style>