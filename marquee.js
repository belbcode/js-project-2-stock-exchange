class Marquee {
    constructor(element) {
        this.element = element
        this.endpoint = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes'
        this.array = []
        this.data = null
    }

    fetchData = async function() {
        const response = await fetch(this.endpoint).then((res)=>res.json()).then((resJson)=>resJson)
        this.data = response
        console.log(this.data)
        return response
    }

    populateMarquee = async function(start = 0, iteration = 1) {
        const marquee = this.element
        const marqueeData = this.data
        if(this.data.statusCode !== 200) {
            console.log('endpoint error, endpoint poopy itself')
            return
        }
        const end = iteration === 1 ? 72 : (1+iteration)*36 //insures there is always a buffer of 37 elements, this was a pain to 
        console.log(iteration, start, end)
        this.array = []
        for(let i = start; i < end; i++) {
            const div = document.createElement('div')
            div.className = "marquee-element"
    
                const innerDiv = document.createElement('div') //if order changes it messes up the onclick event clickFromMarquee which is dependant on the order
                innerDiv.innerText = `${marqueeData[i].symbol}`
                const innerDiv2 = document.createElement('div')
                innerDiv2.innerText = `${marqueeData[i].change}`
                innerDiv2.style.color = innerDiv2.innerText[0] === '-' ? 'red' :'green'
            
            div.onclick = clickFromMarquee

            div.append(innerDiv, innerDiv2)
            this.array.push(div)
            if(i === end-1) {
                console.log(marquee.childNodes.length)
            }
        }
        marquee.append(...this.array)

    }

    spinMarquee() {

    const marqueeData = this.data
    this.populateMarquee()
    let k = false
    let i = 36
    let iteration = 2

    setInterval(()=> {
            const marquee = this.element
            let newMarqueePos = findVw(marquee.style.left)
            marquee.style.left = newMarqueePos;
            let k = false
            if(marquee.style.left ==='-120vw') {
                console.log("we refreshed")
                marquee.style.left = '0vh'
                k = true
            }
            if(k) { //don't touch this, it represents how many vw to the left that the marquee shifts before new elements are added theoretically if every marquee was 10vw like I wanted this should be 360 but they are not uniform
                // marquee.style.left = '0vw'
                let j = 0;
                while(j < 36) { //works but doesn't depopulate enoug    h nodes
                    if(j===35) {
                        console.log(marquee.firstElementChild.innerText)
                    }
                    marquee.firstChild.remove()
                    j++
                }
                this.populateMarquee(i*(iteration), iteration) //populates too fast? maybe something else being called populates it //play with this idea = i*(iteration-((iteration-1))*(1/4))
                iteration++
                k = false
            }
            k++;
        }, 150)
    }
}

function findVw(vwStr) {
    let modString = vwStr == '' ? '0vw' : vwStr
    let str = ''
    for(let i = 0; i < modString.length; i++) {
        if(modString[i]==='v') {
            return `${Number(str) - 1}vw`
        }
        str += modString[i]
    }

}

function clickFromMarquee(x) {
    window.location.href = `/views/company.html?symbol=${this.childNodes[0].innerText}`
}

export default Marquee