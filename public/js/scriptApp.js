const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const messageThree = document.querySelector('#messageThree');
const search = document.querySelector('input');
messageOne.textContent = '';
messageTwo.textContent = '';
messageThree.textContent = '';



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';  
  fetch('/weather?address='+search.value).then((response)=> {
  response.json().then((data) =>{
    if(data.error){
      messageOne.textContent= data.error;
    }else{
      messageOne.textContent=data.location + ' : ' + data.weather;
      search.value= '';
      messageTwo.textContent='The temperature is : ' + data.temp + ' °C';
      messageThree.textContent='With expected minimum of ' +  + data.minT + ' °C' + ' and maximum : ' + data.maxT + ' °C';
    }
  });

});
})