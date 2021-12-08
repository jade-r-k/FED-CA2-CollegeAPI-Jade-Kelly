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
      ///COURSES SHOW///
      {
        path: "/courses/show",
        name: "courses_show",
        component: () => import("./pages/courses/CoursesShow.vue")
      },
      ///////////////////
      /////////////////
    ]
});