export default function loader(element) {
    let periodCount = 0;
    element.innerText = "Loading";
    element.style.display = "block"
    console.log(element.style.display)
    return setInterval((element)=> {
        periodCount++;
        if(periodCount===4) {
            // console.log(element.innerText)
            element.innerText = "Loading";
            periodCount = 0;
        } else {
            element.innerText = element.innerText.concat('.')
        }
    }, 200, element)
}