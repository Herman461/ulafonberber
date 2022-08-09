import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/components/HomePage"
import SinglePage from "@/components/SinglePage"



const routes = [
    { path: '/', component: HomePage },
    { path: '/single', component: SinglePage },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
