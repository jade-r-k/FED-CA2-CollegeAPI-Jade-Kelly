<template>
  <div>
      <h2>Show Course Page</h2>

    <p>
        {{ course.title }}
        {{ course.description }}
    </p>
  </div>
</template>

<script>
import axios from '@/config'

export default {
  name: 'CoursesShow',
  components: {
  },
  data(){
      return {
          course: {}
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
              this.course = response.data.data
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