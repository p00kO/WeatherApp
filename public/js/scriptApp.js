


const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const search = document.querySelector('input');
messageOne.textContent = '';
messageTwo.textContent = '';


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch('http://localhost:3000/weather?address='+search.value).then((response)=> {
  response.json().then((data) =>{
    if(data.error){
      messageOne.textContent= data.error;
    }else{
      messageOne.textContent=data.location + ' : ' + data.weather;
      search.value= '';
      messageTwo.textContent='The temperature is : ' + data.temp + ' °C';
    }
  });

});
})