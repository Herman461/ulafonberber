import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/components/HomePage"
import SinglePage from "@/components/SinglePage"
import AboutPage from "@/components/AboutPage";
import GalleryPage from "@/components/GalleryPage";
import NewsPage from "@/components/NewsPage";



const routes = [
    { path: '/', component: HomePage },
    { path: '/single/:id', component: SinglePage },
    { path: '/about', component: AboutPage },
    { path: '/gallery', component: GalleryPage },
    { path: '/news', component: NewsPage },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
