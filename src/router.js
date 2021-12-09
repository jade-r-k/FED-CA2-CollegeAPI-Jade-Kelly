import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      /////LOGIN/////
      {
        path: "/login",
        name: "login",
        component: () => import("./pages/Login.vue")
      },
      ///////////////

      /////COURSES/////
      ///COURSES INDEX///
      {
        path: "/courses/index",
        name: "courses_index",
        component: () => import("./pages/courses/CoursesIndex.vue")
      },
      ///////////////////
      ///COURSES CREATE///
      {
        path: "/courses/create",
        name: "course_create",
        component: () => import("./pages/courses/CreateCourse.vue")
      },
      ///////////////////
      ///COURSES EDIT///
      {
        path: "/courses/:id/edit",
        name: "course_edit",
        component: () => import("./pages/courses/EditCourse.vue")
      },
      ///////////////////
      ///COURSES SHOW///
      {
        path: "/courses/:id",
        name: "courses_show",
        component: () => import("./pages/courses/CoursesShow.vue")
      },
      ///////////////////
      /////////////////

      /////LECTURERS/////
      ///LECTURERS INDEX///
      {
        path: "/lecturers/index",
        name: "lecturers_index",
        component: () => import("./pages/lecturers/LecturersIndex.vue")
      },
      ///////////////////
      ///LECTURERS CREATE///
      {
        path: "/lecturers/create",
        name: "lecturer_create",
        component: () => import("./pages/lecturers/CreateLecturer.vue")
      },
      ///////////////////
      ///LECTURERS EDIT///
      {
        path: "/lecturers/:id/edit",
        name: "lecturer_edit",
        component: () => import("./pages/lecturers/EditLecturer.vue")
      },
      ///////////////////
      ///LECTURERS SHOW///
      {
        path: "/lecturers/:id",
        name: "lecturers_show",
        component: () => import("./pages/lecturers/LecturersShow.vue")
      },
      ///////////////////
      /////////////////
    ]
});