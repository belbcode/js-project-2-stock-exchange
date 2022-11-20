class SearchForm {
    constructor(element) {
        this.element =  element//'search-results'
    }

    getInput() {
        return this.element.value
    }

    callAPI = async function(input = this.input) {
        const apiCall =  `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`
        return await fetch(apiCall)
        .then(res=> {
            return res.json()
        })
        .then(resJson => {
            return resJson
        })
    }
}

export default SearchForm