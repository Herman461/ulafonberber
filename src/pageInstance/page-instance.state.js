import {reactive} from 'vue'

const pageInstanceState = reactive({
    columnWidth: {
        home: ["50%", "25%", "25%"],
        single: ["210px", "auto", "170px"],
        about: ["auto", "170px"],
        windowWidth: 1920
    },
    currentColumnWidth: [],
    activeColumn: [],
    isLoading: false,
})

export function pageStateInit() {
    pageInstanceState.windowWidth = document.documentElement.clientWidth
    window.addEventListener('resize', () => {
        pageInstanceState.windowWidth = document.documentElement.clientWidth
    })
}

export default pageInstanceState
