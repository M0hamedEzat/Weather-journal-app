/* Global Variables */
let baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`; // BASE URL
const apiKey = `&appid=1beffd6c676675c4e120724a4e3efc05&units=imperial`; // api key

    // generate button
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// add Event listener
generate.addEventListener('click', clickAction)

    //call back function 'clickAction'
function clickAction(e) {

    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getInformation(baseUrl , zipCode ,apiKey) 
        .then(function(data){
            console.log(data);
           // POST request to add data
           postData('/dataPost' ,  {date:d , temp:data.main.temp , content:feelings})
           updateUI()
        })

        /* .then(()=>updateUI()) */ // updates UI after the data is posted
        
}

const getInformation = async (baseUrl , zip , key) =>{

    const res = await fetch(baseUrl+zip+key)
    try {
        const data = await res.json()
        return data;
         /* console.log(data);  */

    } catch (error) {
        console.log("Error" , error);
    }
}
// function to post data
const postData = async (url= '', data = {})=>{
    console.log (data);
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json()
        console.log(newData);
        return newData;

      }catch(error) {
      console.log("error", error);
      }
}
//async function to get data and updates UI
const updateUI = async() =>{
    const request = await fetch ('/dataGet')
    try {
        const allData = await request.json()
        document.getElementById('temp').innerHTML = `Today's temp is ${allData.temp}.`;
        document.getElementById('date').innerHTML = `Today's date is ${allData.date}.`;
        document.getElementById('content').innerHTML = `You feel ${allData.content} today.`;
    } catch (error) {
        console.log("Error", error);
    }
}