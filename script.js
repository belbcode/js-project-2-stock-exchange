const searchbutton = document.getElementById('search-button')

function callAPI(apiCall) {

    const myClear = loader(document.getElementById('loader'))

    return fetch(apiCall)
    .then(res=> {
        return res.json()
    })
    .then(resJson => {
        stopLoader(document.getElementById('loader'), myClear)
        return resJson
    })
}

function createList(elementToAppend, arrayOfJsonData) {
        arrayOfJsonData.forEach(listElement => {

        const listItem = document.createElement('li')
            console.log(listElement)
            const anchorOfItem = document.createElement('a')
            anchorOfItem.href = `/views/company.html?symbol=${listElement.symbol}`
            anchorOfItem.innerText = listElement.name

        listItem.append(anchorOfItem)
        elementToAppend.append(listItem)

    });
}

function loader(element) {
    let periodCount = 0;
    element.style.display = "block"
    console.log(element.style.display)
    return setInterval((element)=> {
        periodCount++;
        if(periodCount===3) {
            // console.log(element.innerText)
            element.innerText = "Loading";
            periodCount = 0;
        } else {
            element.innerText = element.innerText.concat('.')
        }
    }, 200, element)
}

function stopLoader(element, intervalID) {
    element.style.display = 'none'
    clearInterval(intervalID)
}

searchbutton.addEventListener('click', async ()=> {
    const searchQuery = document.getElementById('search').value

    const API = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchQuery}&limit=10&exchange=NASDAQ,`
    const response = await callAPI(API)

    const searchResults = document.getElementById('search-results')
    
    createList(searchResults, response)

})

// let query = null
// const API = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ,`
