<template>
    <div>
        <section>
            <b-field label="Select a date">
            <b-datepicker
                v-model="selected_date"
                :show-week-number="showWeekNumber"
                locale="fr-CA"
                placeholder="Click to select..."
                icon="calendar-today"
                icon-right-clickable
                trap-focus>
            </b-datepicker>
        </b-field>
            <b-field label="Select time">
            <b-clockpicker
                v-model="form.time"
                placeholder="Click to select..."
                :hour-format="format">

                <b-button
                    label="Now"
                    type="is-primary"
                    icon-left="clock"
                    @click="time = new Date()" />
                <b-button
                    label="Clear"
                    type="is-danger"
                    icon-left="close"
                    outlined
                    @click="time = null" />
            </b-clockpicker>
        </b-field>
        <b-field label="Status">
            <b-select v-model="form.status" placeholder="Select a status">
                <option value="assigned">Assigned</option>
                    <option value="associate">Associate</option>
                    <option value="career_break">Career Break</option>
                    <option value="interested">Interested</option>
            </b-select>
        </b-field>
        <b-field label="Course">
            <b-select v-model="form.course_id" placeholder="Select a course">
                <option
                    v-for="option in courses"
                    :value="option.id"
                    :key="option.id">
                    {{ option.title }}
                </option>
            </b-select>
        </b-field>
        <b-field label="Lecturer">
            <b-select v-model="form.lecturer_id" placeholder="Select a lecturer">
                <option
                    v-for="option in lecturers"
                    :value="option.id"
                    :key="option.id">
                    {{ option.name }}
                </option>
            </b-select>
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
        name: 'CreateEnrolment',
        data() {
            return {
                courses: [],
                lecturers: [],
                selected_date: new Date(),
                form: {
                    date: '',
                    time: new Date(),
                    status: '',
                    course_id: 0,
                    lecturer_id: 0
                },
                showWeekNumber: false,
                locale: undefined
            }
        },
        computed: {
        format() {
            return this.isAmPm ? '12' : '24'
        }
    },
        mounted() {
            this.getData()
        },
        methods: {
            getData(){
                let token = localStorage.getItem('token')

                axios
                    .get(`/courses`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.courses = response.data.data
                    })
                    .catch(error => console.log(error))

                axios
                    .get(`/lecturers`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.lecturers = response.data.data
                    })
                    .catch(error => console.log(error))
            },
            submitForm() {
                let token = localStorage.getItem('token')
                
                axios.post('/enrolments', {
                    date: this.form.date,
                    time: this.form.time,
                    status: this.form.status,
                    course_id: this.form.course_id,
                    lecturer_id: this.form.lecturer_id
                }, {
                    headers: {
                  "Authorization" : `Bearer ${token}`
                  }
                })
                .then(response =>{
                    console.log(response.data)
                    this.$router.push({
                        name: "enrolments_index"
                    })
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response.data)
                    })
            },
            cancel() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>
</style>