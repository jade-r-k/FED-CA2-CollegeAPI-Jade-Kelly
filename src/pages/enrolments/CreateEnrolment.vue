<template>
    <div>
        <p class="title" style="text-align: center; color: #714dd2;">Create Enrolment</p>
    <br>
    <div class="columns is-mobile">
        <div class="card column is-half is-offset-one-quarter">
            <section>
            <b-field label="Select a date">
            <b-datepicker
                v-model="selected_date"
                :show-week-number="showWeekNumber"
                locale="en-GB"
                placeholder="Click to select..."
                icon="calendar-today"
                icon-right-clickable
                trap-focus>
            </b-datepicker>
        </b-field>
            <b-field label="Select time">
            <b-clockpicker
                v-model="selected_time"
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
import moment from 'moment'

    export default {
        name: 'CreateEnrolment',
        data() {
            return {
                courses: [],
                lecturers: [],
                selected_date: new Date(),
                selected_time: new Date(),
                form: {
                    date: moment(this.selected_date).format('YYYY-MM-DD'),
                    time: moment(this.selected_time).format('HH:MM:SS'),
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
                    alert("There was a problem making this enrolement. Check if the lecturer is already enroled to a course.")
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