import loader from './loader.js'

const loadIcon = document.getElementById('loader')
const myClear = loader(loadIcon)

const urlParams = new URLSearchParams(window.location.search)
const symbol = urlParams.get('symbol')
const stockHistory = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`

document.getElementById('body-wrapper').hidden = true

const dataArray = await fetch(stockHistory).then(res=>res.json()).then(resJson=>resJson)

function parseFirstN(data, n) {
  const parsedDataArray = []
  for(let i = n; i >= 0; i--) {
    parsedDataArray.push(
      {date: data.historical[i].date, price: data.historical[i].close}
    )
  }
  console.log(parsedDataArray)
  return parsedDataArray
}

(async function() {
  const data = parseFirstN(dataArray, 30);

  console.log(data[0].price < data[data.length-1].price)
  const fillColor = data[0].price < data[data.length-1].price ? '#dfd'  : '#ecc9c9' 
  const lineColor = data[0].price < data[data.length-1].price ? '#ACD1AF': '#880808'


  new Chart(
    document.getElementById('myChart'),
    {
      type: 'line',
      options:  {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
            y: {    
                beginAtZero: false,
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return '$' + value.toFixed(2);
                    }
                }
            }
        }
    },
      data: {
        labels: data.map(row => row.date),
        datasets: [
          {
            fill: 'origin',
            label: 'Price',
            data: data.map(row => row.price),
            borderColor: lineColor,
            backgroundColor: fillColor,
          }
        ]
      }
    }
  );
})();


document.getElementById('body-wrapper').hidden = false
loadIcon.style.display = 'none'
clearInterval(myClear)