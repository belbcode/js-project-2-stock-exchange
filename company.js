const query = window.location.search;

const urlParams = new URLSearchParams(window.location.search)


function fetchCompany(symbol) {
    return fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
    .then(res=> res.json())
    .then(resJson => {
        return resJson
    })
}

function renderData(companyInfo) {
    let misc = []
    for(const item in companyInfo.profile) {
        const element = document.getElementById(item)
        if(item === "image") {
            element.src = companyInfo.profile[item]
            continue;
        }
        if(element === null) {
            misc.push(item)
            continue;
        }
        element.innerText = companyInfo.profile[item]
        element.title = item
    }
    return misc
}

async function handleCompany() {

    const symbol = urlParams.get('symbol')
    const infoContainer = document.getElementById('info-container');

    const companyInfo = await fetchCompany(symbol)
    console.log(companyInfo)
        // let elementArray = [];
        // let itemArray = []
            // const itemDiv = document.createElement('div')
            // itemDiv.id = item
            // itemDiv.innerText = companyInfo.profile[item]
            // itemArray.push(item)
            // elementArray.push(itemDiv)
        renderData(companyInfo)
        const stockHistory = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
        console.log(await fetch(stockHistory).then(res=>res.json()).then(resJson=> resJson))
        // const companyInfoByClasses = restructure(companyInfo.profile, resToHTMLDict)
        // htmlMe(companyInfoByClasses, document.getElementById('grandparent-container'), [{"className": "stock-info", "callback": myCallback}])

        // document.getElementById('image').innerHTML ="<img src='" + document.getElementById('image').innerText + "'>"


}

// function restructure(info, map) {
//     let newObj = {}
//     for(const key in map) {
//         newObj[key] = {}
//         const iterableMapkey = (map[key])
//         for(const mapKey in iterableMapkey) {
//             const newKey = mapKey
//             const value = info[mapKey]
//             newObj[key][newKey] = value
//         }
//     }
//     return newObj
// }

// function htmlMe(obj, grandparent, callbackCriteria) {
//     // const grandparent = document.getElementById('info-container')
//     for(const key in obj) {
//         const parent = document.createElement('div')
//         parent.className = key
//         for(const keyOfKeys in obj[key]) {
//             const child = document.createElement('div') 
//             child.id = keyOfKeys
//             child.innerText = obj[key][keyOfKeys]
//             // callback(child, callbackParams)
//             callbackCriteria.forEach(criteria => {
//                 if(criteria.className === parent.className) {
//                     criteria.callback(child, key, keyOfKeys)
//                 }
//             })
//             parent.append(child)
//         }
//         grandparent.append(parent)
//     }
    
// }

//runs callback on all children of a parent div if their parent's name is on the list

// const resToHTMLDict =  {
//     "identifiers" : {
//         "ipoDate": "2014-06-13",
//         "currency": "USD",
//         "ceo": "Mr. Santiago Seage Medela",
//         "companyName": "Atlantica Sustainable Infrastructure plc",
//         "exchange": "NASDAQ Global Select",
//         "exchangeShortName": "NASDAQ",
//         "industry": "Utilities—Renewable",
//         "website": "https://www.atlantica.com"
//     },
//     "image" : {
//         "image": "https://financialmodelingprep.com/images-New-jpg/AY.jpg"
//     },
//     "stock-info" : {
//         "price": 21,
//         "beta": "0.820457",
//         "volAvg": "504809",
//         "mktCap": "3206599680",
//         "lastDiv": "1.76",
//         "range": "24.42-41.32",
//         "changes": -0.980001,
//         "changesPercentage": "-3.4253807"
//     },
//     "description" : {
//         "description": "Atlantica Sustainable Infrastructure plc owns, manages, and invests in renewable energy, storage, natural gas and heat, electric transmission lines, and water assets in the United States, Canada, Mexico, Peru, Chile, Colombia, Uruguay, Spain, Italy, Algeria, and South Africa. It owns 39 assets comprising 2,044 megawatts (MW) of aggregate renewable energy installed generation capacity; 343 MW of natural gas-fired power generation capacity; 55 thermal megawatts of district heating capacity; 1,229 miles of electric transmission lines; and 17.5 million cubic feet per day of water desalination assets. The company was formerly known as Atlantica Yield plc and changed its name to Atlantica Sustainable Infrastructure plc in May 2020. Atlantica Sustainable Infrastructure plc was incorporated in 2013 and is based in Brentford, the United Kingdom."
//     },
//     "location": {
//         "sector": "Utilities",
//         "country": "GB",
//         "fullTimeEmployees": "658",
//         "phone": "442070984384",
//         "address": "17th Fl, G W 1 Great West House, Great West Road",
//         "city": "Brentford",
//         "state": "MIDDLESEX",
//         "zip": "TW8 9DF"
//     },
//     "misc" : {
//         "isin": "GB00BLP5YB54",
//         "cusip": "G0751N103",
//         "cik": "0001601072",
//         "defaultImage": false,
//         "isEtf": false,
//         "isActivelyTrading": true,
//         "isFund": false,
//         "isAdr": false
//     }
// }

handleCompany()

function modifyDivsInAClass(className, callback) {
    const listOfElements = document.getElementsByClassName(className)[0].querySelectorAll('div')
    listOfElements.forEach((element)=> {
        callback(element)
    })
}
const myCallback = (element)=> {
    element.innerHTML = "<div>"+ element.id + ": </div>" + element.innerText
}

modifyDivsInAClass('exchange-info', myCallback)

const ctx = document.getElementById('myChart');