

const limitElement = document.querySelector("#limit");
const offsetElement = document.querySelector("#offset");
const urlElement = document.querySelector('#api-url')
const ordersContainer = document.querySelector("#json-data");
const btn = document.querySelector("#generate");



window.addEventListener('DOMContentLoaded', generateDefaultData)
btn.addEventListener("click", generateCustomData);


function generateDefaultData(){
    generateData('/api/orders?limit=4&offset=7')
}


function generateCustomData(){
  let limit = limitElement.value
  let offset = offsetElement.value
  generateData(`/api/orders?limit=${limit}&offset=${offset}`)
}


function generateData(url) {
  urlElement.innerHTML = url
  fetch(url)
    .then((response) => response.json())
    .then((orders) => {
      ordersContainer.innerHTML = '<p>[</p>'
      
      orders.map(data => {
        let str_data = JSON.stringify(data)
        ordersContainer.innerHTML += `<p>${str_data},</p>`
      })
      ordersContainer.innerHTML += '<p>]</p>'
    })
    .catch((error) => console.error(error));
}


