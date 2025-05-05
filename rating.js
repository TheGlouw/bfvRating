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

function addRating() {
	
	let col = document.querySelector('#rate-select').selectedOptions[0].value;
	let value = document.querySelector('#rating').selectedOptions[0].value;
	const cell = columnNumberToLetter(col) + currentSheetsRow;  // "C5"

	fetch(`https://script.google.com/macros/s/AKfycbw7uaPPVxjsS5qayW-WpkpC6Jk04SR_h1MNixY7EhHit3lUdi9NwVRsCbykU3_YrxM0/exec?range=${cell}&value=${value}`)
		.then(response => response.json())
		.then(data => {
			console.log("Success:", data);
			document.querySelector('div[data-col="'+col+'"] p').innerText = value;
		})
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
	currentSheetsRow = sheetsData.indexOf(row) + 1;
	users.forEach(function(user, index) {
		document.querySelector('.ratings').innerHTML += `
		<div data-col="${index+2}" class="rating">
			<h3>${user}</h3>
			<p>${!row[index+1] ? 'N/A' : row[index+1]}</p>
		</div>
		`; 
	});	
	
	document.querySelector('.ratings').innerHTML += `
		<div class="rate">
			<select id="rate-select"></select>
			<select id="rating">
				<option value="10">10</option>
				<option value="9.5">9.5</option>
				<option value="9">9</option>
				<option value="8.5">8.5</option>
				<option value="8">8</option>
				<option value="7.5">7.5</option>
				<option value="7">7</option>
				<option value="6.5">6.5</option>
				<option value="6">6</option>
				<option value="5.5">5.5</option>
				<option value="5">5</option>
				<option value="4.5">4.5</option>
				<option value="4">4</option>
				<option value="3.5">3.5</option>
				<option value="3">3</option>
				<option value="2.5">2.5</option>
				<option value="2">2</option>
				<option value="1.5">1.5</option>
				<option value="1">1</option>
				<option value="0.5">0.5</option>
				<option value="0">0</option>
				
			</select>
			<button onclick="addRating()">Rate</button>
		</div>
	`;
	
	users.forEach(function(user, index) {
		document.querySelector('#rate-select').innerHTML += `
			<option value="${index+2}">${user}</option>
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
