import {reactive} from 'vue'

const pageInstanceState = reactive({
    columnWidth: {
        home: ["50%", "25%", "25%"],
        single: ["210px", "auto", "170px"]
    },
    currentColumnWidth: [],
    activeColumn: [],
    isLoading: false,
})

export default pageInstanceState
