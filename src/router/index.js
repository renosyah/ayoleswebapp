import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileUpdateView from '../views/ProfileUpdateView.vue'
import CompletedCourseView from '../views/CompletedCourseView.vue'
import CourseDetailView from '../views/CourseDetailView.vue'
import ClassRoomView from '../views/ClassRoomView.vue'
import PageNotFound from '../views/PageNotFoundView.vue'
import PageError from '../views/ErrorView.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        component: IndexView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView
    },
    {
        path: '/update_profile',
        name: 'ProfileUpdate',
        component: ProfileUpdateView
    },
    {
        path: '/completed_course',
        name: 'CompletedCourse',
        component: CompletedCourseView
    },
    {
        path: '/course',
        name: 'CourseDetail',
        component: CourseDetailView
    },
    {
        path: '/classroom',
        name: 'ClassRoom',
        component: ClassRoomView
    },
    // add more router here
    {
        path: "/error",
        name: "Error",
        component: PageError
    },
    {
        path: "*",
        component: PageNotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router