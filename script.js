import Marquee from "./marquee.js"
import SearchForm from './searchForm.js'
import SearchResult from "./searchResult.js" 
const searchbutton = document.getElementById('search-button')
const input = document.getElementById('search')

// const searchForm = new SearchForm(document.getElementById('search'))
// const searchResult = new SearchResult(document.getElementById('search-results'))

// searchResult.createList(searchForm.callAPI)

function callAPI(apiCall) { //fetches data returns JSON

    return fetch(apiCall)
    .then(res=> {
        return res.json()
    })
    .then(resJson => {
        return resJson
    })
}


function createList(elementToAppend, arrayOfJsonData) { //iterates through data and populates list

    elementToAppend.innerText = ""
        arrayOfJsonData.forEach(async (listElement) => {

        const symbol = listElement.symbol

        const listElementQuickData = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`).then(res=>res.json()).then(resJson=> resJson)

        const listItem = document.createElement('li')
            console.log(listElementQuickData)

            const imgOfItem = document.createElement('img')
            imgOfItem.src = listElementQuickData.profile.image
            // imgOfItem.alt = ":("
            imgOfItem.className = 'icon'

            const anchorOfItem = document.createElement('a')
            anchorOfItem.href = `/views/company.html?symbol=${symbol}`
            anchorOfItem.innerText = listElement.name

            const divOfInfoOne = document.createElement('div')
            divOfInfoOne.innerText = `(${listElementQuickData.profile[document.getElementById('selector').value]})`

            const divOfChange = document.createElement('div')
            let addedMessage = listElementQuickData.profile.changesPercentage[0] === '-' ? "" : "+"
            divOfChange.innerText = addedMessage + parseFloat(listElementQuickData.profile.changesPercentage).toFixed(2) + "%"
            divOfChange.style.color = listElementQuickData.profile.changesPercentage[0] === '-' ? 'red' : 'green'

        listItem.append(imgOfItem, anchorOfItem, divOfInfoOne, divOfChange)
        listItem.className = "flex-row"
        elementToAppend.append(listItem)

    });
}

function loader(element) { //starts the load loop
    let periodCount = 0;
    element.style.display = "block"
    element.innerText = "Loading";
    return setInterval((element)=> {
        periodCount++;
        if(periodCount>3) {
            // console.log(element.innerText)
            element.innerText = "Loading";
            periodCount = 0;
        } else {
            element.innerText = element.innerText.concat('.')
        }
    }, 200, element)
}

function stopLoader(element, intervalID) { //stops the load loop 
    element.style.display = 'none'
    clearInterval(intervalID)
}

const runSearch = async (searchQuery) => { //main search function

    //this section handles cosmetics on the page
    if(searchQuery==='') {
        return
    }
    const myClear = loader(document.getElementById('loader')) 
    document.getElementById('search-results').hidden = true

    //this section handles the call to the API and populating elements on page with data
    const API = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchQuery}&limit=10&exchange=NASDAQ,`
    const response = await callAPI(API)
    const searchResults = document.getElementById('search-results')
    await createList(searchResults, response)

    //again cosmetics
    window.addEventListener('DOMContentLoaded', (event)=> {
        console.log(event, "images loaded")
    })
    stopLoader(document.getElementById('loader'), myClear)
    document.getElementById('search-results').hidden = false
}

var dryFetch
(dryFetch = async function() { //populates select tag with available options, Alphabet is set at the default endpoint aribitrarily
    const select = document.getElementById('selector')
    const optionData = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/goog`).then(res=>res.json()).then(resJson=> resJson)
    for(const key in optionData.profile) {
        const option = document.createElement('option')
        option.value = key
        option.innerText = key
        select.append(option)
    }
})();

var checkURLParam;
(checkURLParam = function() { //checks if theres a previous URL search (like if the user clicks to go back) and executes the search if so
    const urlParams = new URLSearchParams(window.location.search)
    const mySymbol = urlParams.get('query')
    if(!mySymbol) { //in case of fresh load it doesn't fire some whack load
        return
    }
    runSearch(mySymbol)
})()

searchbutton.addEventListener('click', async ()=> { //original search function, kind of deprecated now
    const searchQuery = document.getElementById('search').value
    runSearch(searchQuery)

})

input.addEventListener('input', async () => { //debounces inputs and changes query params on search
    window.history.replaceState("object or string", "title", `?query=${input.value}`) //milestone 2.2 in one line of code
    let x = input.value.length
    setTimeout(async ()=> {
        if(x=== input.value.length) {
            runSearch(input.value)
        }
    },500)
})

document.getElementById('selector').addEventListener('input', ()=> { //executes new Search on change of selector.
    runSearch(input.value)
})

const myMarquee = new Marquee(document.getElementById('marquee'))
await myMarquee.fetchData()
myMarquee.spinMarquee()

// async function marqueeLoad() {
//     const response = await fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes').then((res)=>res.json()).then((resJson)=>resJson)
//     return response
// };

// var populateMarquee



// populateMarquee = async function(marqueeData, start = 0, iteration = 1) {
//     const marquee = document.getElementById('marquee');
//     const end = iteration === 1 ? 72 : iteration*36 //insures there is always a buffer of 37 elements, this was a pain to code
//     for(let i = start; i < end; i++) {
//         const div = document.createElement('div')
//         div.className = "marquee-element"

//             const innerDiv = document.createElement('div')
//             innerDiv.innerText = `${marqueeData[i].symbol} ${marqueeData[i].change}`
        
//         div.append(innerDiv)
//         arrayOfDivs.push(div)
//     }
//     marquee.append(...arrayOfDivs)
// };



// var marqueeSpin;
// (marqueeSpin = async function() {
//     const marqueeData = await marqueeLoad()
//     populateMarquee(marqueeData)
//     let k = 0
//     let i = 36
//     let iteration = 2

//     setInterval(()=> {
//         const marquee = document.getElementById('marquee');
//         let newMarqueePos = findVw(marquee.style.left)
//         marquee.style.left = newMarqueePos;
//         if(marquee.style.left ==='-324vw') {
//             console.log("we refreshed")
//             marquee.style.left = '0vh'
//             k = true
//         }
//         if(k) { //don't touch this, it represents how many vw to the left that the marquee shifts before new elements are added theoretically if every marquee was 10vw like I wanted this should be 360 but they are not uniform
//             // marquee.style.left = '0vw'
//             let j = 0;
//             while(j < 36) { //works but doesn't depopulate enough nodes
//                 marquee.removeChild(marquee.firstElementChild)   
//                 j++
//             }
//             populateMarquee(marqueeData, i*(iteration), iteration) //populates too fast? maybe something else being called populates it //play with this idea = i*(iteration-((iteration-1))*(1/4))
//             iteration++
//             k = false
//         }
//         k++;
//     }, 10)
// })();

// function findVw(vwStr) {
//     let modString = vwStr == '' ? '0vw' : vwStr
//     let str = ''
//     for(let i = 0; i < modString.length; i++) {
//         if(modString[i]==='v') {
//             return `${Number(str) - 1}vw`
//         }
//         str += modString[i]
//     }

// }