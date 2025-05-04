let sheetsData = null;
let currentSheetsRow = null;

const spreadsheetId = '135tC-PD5oIkA8KR56DH2rplX4c8D1RkGlGZ3vuL0SCg';
const apiKey = 'AIzaSyActnq1wj0Fxvm8CqslovO4AfBDadbjykk';

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:G83?key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
	  sheetsData = data.values;
	  console.log(sheetsData);
	  showRatingsForWeapon();
  });

/*
function addRating(col, value) {
	
	const row = 5;
	const cell = columnNumberToLetter(col) + currentSheetsRow;  // "C5"

	const range = 'Sheet1!'+cell;  // Solu, jonka haluat päivittää

	fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW&key=${apiKey}`, {
	  method: 'PUT',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
		range: range,
		majorDimension: 'ROWS',
		values: [[value]]  // Huomaa: 2D-taulukko, vaikka vain yksi solu
	  }),
	})
	  .then(response => response.json())
	  .then(data => console.log('Päivitetty:', data))
	  .catch(error => console.error('Virhe:', error));
} 

*/

function addRating(col, value) {

	const cell = columnNumberToLetter(col) + currentSheetsRow;  // "C5"

fetch(`https://script.google.com/macros/s/AKfycbzM1RWnZw2YgN5qVId6DrNFh7YFjNMrG-iKQ-l9DGtqvihQgTFWcR2F-ZRP71lzdfNQ/exec?range=${cell}&value=${value}`)
  .then(response => response.json())
  .then(data => console.log("Success:", data))
  .catch(error => console.error("Error:", error));
} 



function showRatingsForWeapon() {
	if(!sheetsData)
		return;
	let users = [];
	document.querySelector('.ratings').innerHTML = '';
	
	for(let i = 1; i < sheetsData[0].length; i++) {
		users.push(sheetsData[0][i]);
	}
	
	let row = sheetsData.find(function(row) { return row[0] == currentWeaponName })
	currentSheetsRow = sheetsData.indexOf(row);
	users.forEach(function(user, index) {
		document.querySelector('.ratings').innerHTML += `
		<div class="rating">
			<h3>${user}</h3>
			<p>${!row[index+1] ? 'N/A' : row[index+1]}</p>
		</div>
		`; 
	});	
}

function columnNumberToLetter(columnNumber) {
  let letter = '';
  while (columnNumber > 0) {
    let mod = (columnNumber - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    columnNumber = Math.floor((columnNumber - 1) / 26);
  }
  return letter;
}
