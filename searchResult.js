class SearchResult {
    constructor(element) {
        this.element = element
    }
    createList(arrayOfJsonData) { //iterates through data and populates list

        const elementToAppend = this.element
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
    
}

export default SearchResult