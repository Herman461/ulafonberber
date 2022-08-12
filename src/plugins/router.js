import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/components/HomePage"
import SinglePage from "@/components/SinglePage"
import AboutPage from "@/components/AboutPage";
import GalleryPage from "@/components/GalleryPage";



const routes = [
    { path: '/', component: HomePage },
    { path: '/single', component: SinglePage },
    { path: '/about', component: AboutPage },
    { path: '/gallery', component: GalleryPage },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
