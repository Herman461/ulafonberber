import {reactive} from 'vue'

const pageInstanceState = reactive({
    columnWidth: {
        home: ["50%", "25%", "25%"],
        single: ["210px", "auto", "170px"],
        about: ["auto", "170px"],
        gallery: ["220px", '43.5%', '43.5%'],
    },
    windowWidth: 1920,
    currentColumnWidth: [],
    activeColumn: [],
    activeBlock: null,
    language: "ru",
    isLoading: true,
    isLoaded: false,
    lock: false,
    animation: {
        done: false,
        delay: 600
    }
})

export function pageStateInit() {
    pageInstanceState.windowWidth = document.documentElement.clientWidth
    window.addEventListener('resize', () => {
        pageInstanceState.windowWidth = document.documentElement.clientWidth
    })
}

export default pageInstanceState
