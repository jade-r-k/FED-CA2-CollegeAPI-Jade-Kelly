<template>
  <div>
      <h2>Show Lecturer Page</h2>

    <p>
        {{ lecturer.name }}
    </p>
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
      }
  }
}
</script>

<style scoped>
</style>