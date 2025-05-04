var customizationStrings = new Object();
	customizationStrings.QADS = "Quick Aim";
	customizationStrings.ADSM = "Custom Stock";
	customizationStrings.MoAD = "Lightened Stock";
	customizationStrings.Bayo = "Bayonet";
	customizationStrings.QRel = "Quick Reload";
	customizationStrings.QDep = "Slings and Swivels";
	customizationStrings.QCyc = "Machined Bolt";
	customizationStrings.Zero = "Variable Zeroing";
	customizationStrings.VRec = "Recoil Buffer";
	customizationStrings.ITri = "Trigger Job";
	customizationStrings.Hipf = "Enhanced Grips";
	customizationStrings.IADS = "Barrel Bedding";
	customizationStrings.DMag = "Detachable Magazines";
	customizationStrings.Bipo = "Bipod";
	customizationStrings.FBul = "High Velocity Bullets";
	customizationStrings.Long = "Low Drag Rounds";
	customizationStrings.ADSS = "Barrel Bedding";
	customizationStrings.HRec = "Ported Barrel";
	customizationStrings.Heav = "Heavy Load";
	customizationStrings.Pene = "Penetrating Shot";
	customizationStrings.ExMa = "Extended Magazine";
	customizationStrings.Slug = "Slugs";
	customizationStrings.Head = "Solid Slug";
	customizationStrings.IBip = "Improved Bipod";
	customizationStrings.Flas = "Flashless Propellant";
	customizationStrings.IROF = "Light Bolt";
	customizationStrings.Ince = "Incendiary Bullets";
	customizationStrings.Cool = "Chrome Lining";
	customizationStrings.Magd = "Polished Action";
	customizationStrings.Chok = "Internal Choke";
	customizationStrings.ExBe = "Extended Belt";
	customizationStrings.Drum = "Double Drum Magazine";
	customizationStrings.Gren = "Improved Grenades"
	customizationStrings.APCR = "APCR Bullets";
	customizationStrings.QBCy = "Light Bolt";
	customizationStrings.BROF = "Trigger Job";
	customizationStrings.GLau = 'Grenade Launcher'
	customizationStrings.Fire = 'Fully Automatic Fire'
	customizationStrings.QCyP = 'Machined Bolt'
	customizationStrings.Supp = 'Suppressor'
	customizationStrings.TopU = 'Top Up'
	customizationStrings.HiPo = 'High Power Optics'

	var customizations = new Object();

	let currentWeaponName = '';

	data.forEach(function(weapon, index) {
	if(customizations[weapon.WeapShowName] == undefined){
		customizations[weapon.WeapShowName] = new Array({a:"",b:""}, {a:"",b:""}, {a:"",b:""}, {a:"",b:""});
	}
	if (weapon.Attachments_short.length > 0){
		var short_attachments = weapon.Attachments_short.split("+")
		for (var i = 0; i < short_attachments.length; i++){
			if ((customizations[weapon.WeapShowName][i].a.localeCompare(short_attachments[i]) != 0) && (customizations[weapon.WeapShowName][i].b.localeCompare(short_attachments[i]) != 0)){
				if (customizations[weapon.WeapShowName][i].a.length == 0){
					customizations[weapon.WeapShowName][i].a = short_attachments[i];
				} else {
					customizations[weapon.WeapShowName][i].b = short_attachments[i];
				}
			}
		}
	}
	})
  
	function getWeaponWithAttachments(attachments) {
		return data.indexOf(data.filter(function(weapon) { return weapon.WeapShowName == data[currentWeaponIndex].WeapShowName && weapon.Attachments_short == attachments })[0])
	}

/*
function getUniqueAttachmentValues(array) {
  const uniqueValues = new Set();

  array.forEach(obj => {
    const value = obj.Attachments_short;
    if (typeof value === 'string') {
      value.split('+').forEach(item => {
        const trimmed = item.trim();
        if (trimmed) {
          uniqueValues.add(trimmed);
        }
      });
    }
  });

  return Array.from(uniqueValues);
}
*/

//getUniqueAttachmentValues(data.filter(function(weapon) { return weapon.WeapShowName == data[currentWeaponIndex].WeapShowName }))
  
    const weaponList = document.getElementById('weaponList');

let currentWeaponIndex = 0; // Default to first weapon
let damageChart = null; // Store chart instance


function showWeaponWithAttachments(elem) {
	let selectedAttachments = [];
	
	let currentIndex = Number(elem.parentNode.parentNode.dataset.row);
	let currentDisableIndex = currentIndex;
	
	if(elem.classList.contains('active') && currentIndex > 0)
		currentDisableIndex -= 1;
	
	let rows = document.querySelectorAll('#attachmentsButtons tr');
	for(let i = 0; i < rows.length; i++) {
		if(i > currentIndex) {
			rows[i].querySelectorAll('button').forEach(function(btn) {
				btn.classList.remove('active');
			})
		}
		
		if(i > currentDisableIndex+1) {
			rows[i].querySelectorAll('button').forEach(function(btn) {
				btn.setAttribute('disabled','');
			})
		} else {
			rows[i].querySelectorAll('button').forEach(function(btn) {
				btn.removeAttribute('disabled');
			})
		}
		
		if(currentIndex == 1) {
			rows[currentIndex + 1].querySelectorAll('button').forEach(function(btn) {
				btn.classList.remove('active');
			})
			
			rows[currentIndex].querySelector('button[data-button="'+(elem.dataset.button == 'a' ? 'b' : 'a')+'"]').setAttribute('disabled','');
			
			rows[currentIndex+1].querySelector('button[data-button="'+(elem.dataset.button == 'a' ? 'b' : 'a')+'"]').setAttribute('disabled','');
		}
		
		if(currentIndex == 2) {
			rows[currentIndex-1].querySelector('button[data-button="'+(elem.dataset.button == 'a' ? 'b' : 'a')+'"]').classList.remove('active');
			
			rows[currentIndex].querySelector('button[data-button="'+(elem.dataset.button == 'a' ? 'b' : 'a')+'"]').setAttribute('disabled','');
			
			rows[currentIndex-1].querySelector('button[data-button="'+(elem.dataset.button == 'a' ? 'b' : 'a')+'"]').setAttribute('disabled','');
		}
		
		if(currentIndex == 3) {
			rows[currentIndex-1].querySelector('button:not(.active)').setAttribute('disabled','');
			rows[currentIndex-2].querySelector('button:not(.active)').setAttribute('disabled','');
		}
	}
	
	if(elem.classList.contains('active')) {
		elem.classList.remove('active');
	} else {
		if(elem.parentElement.nextSibling)
			elem.parentElement.nextSibling.children[0].classList.remove('active');
		
		if(elem.parentElement.previousSibling)
			elem.parentElement.previousSibling.children[0].classList.remove('active');
		
		elem.classList.add('active');
	}
	
	let attachmentsQuery = '';
	document.querySelectorAll('button.active').forEach(function(btn, index) {
		attachmentsQuery += (index == 0 ? '' : '+') + btn.dataset.attachment;
		
	})
	
	showWeapon(getWeaponWithAttachments(attachmentsQuery));
}

function showWeapon(index) {
    currentWeaponIndex = index;
    const weapon = data[index];
	
	currentWeaponName = weapon.WeapShowName;
	
	showRatingsForWeapon();
	
	if(weapon.Attachments_short == "") {
		const attachments = document.getElementById('attachmentsButtons');
		attachments.innerHTML = '';
		customizations[weapon.WeapShowName].forEach(function (row, index) {
			attachments.innerHTML += `<tr data-row="${index}"><td><button ${index != 0 ? 'disabled' : ''} data-button="a" onclick="showWeaponWithAttachments(this)" data-attachment="${row.a}">${customizationStrings[row.a]}</button></td><td><button ${index != 0 ? 'disabled' : ''} data-button="b"  onclick="showWeaponWithAttachments(this)" data-attachment="${row.b}">${customizationStrings[row.b]}</button></td></tr>`;
		});
	}
	
	document.getElementById('weapon-name').innerText = currentWeaponName;

    // Update general stats table
    const statsTable = document.getElementById('generalStats');
    statsTable.innerHTML = `
        <tr><th>Stat</th><th>Value</th></tr>
        <tr><td>Weapon Name</td><td>${weapon.WeapShowName}</td></tr>
        <tr><td>Max damage</td><td>${weapon.SDmg}</td></tr>
        <tr><td>Min damage</td><td>${weapon.EDmg}</td></tr>
        <tr><td>Time To Live</td><td>${weapon.TimeToLive}</td></tr>
        <tr><td>Initial Speed</td><td>${weapon.InitialSpeed}</td></tr>
        <tr><td>Deploy Time</td><td>${weapon.DeployTime}</td></tr>
        <tr><td>Reload Speed</td><td>${weapon.ReloadSpeed}</td></tr>
    `;

    // Update recoil table
    const recoilTable = document.getElementById('recoilStats');
    recoilTable.innerHTML = `
        <tr><th>Stat</th><th>Value</th></tr>
        <tr><td>Stand Recoil Up</td><td>${weapon.HIPStandRecoilUp}</td></tr>
        <tr><td>Stand Recoil Initial Up</td><td>${weapon.HIPStandRecoilInitialUp}</td></tr>
        <tr><td>Stand Recoil Decay Factor</td><td>${weapon.HIPStandRecoilDecFactor}</td></tr>
        <tr><td>Stand Recoil Decay Exponent</td><td>${weapon.HIPStandRecoilDecExponent}</td></tr>
        <tr><td>Stand Recoil Decay Offset</td><td>${weapon.HIPStandRecoilDecOffset}</td></tr>
        <tr><td>Stand Recoil Duration</td><td>${weapon.HIPStandRecoilDuration}</td></tr>
        <!-- Add more recoil stats as needed -->
    `;

    // Update spread table
    const spreadTable = document.getElementById('spreadStats');
    spreadTable.innerHTML = `
        <tr><th>Stat</th><th>Value</th></tr>
        <tr><td>Stand Base Min</td><td>${weapon.HIPStandBaseMin}</td></tr>
        <tr><td>Stand Base Max</td><td>${weapon.HIPStandBaseMax}</td></tr>
        <tr><td>Move Min</td><td>${weapon.HIPStandMoveMin}</td></tr>
        <tr><td>Move Max</td><td>${weapon.HIPStandMoveMax}</td></tr>
        <tr><td>Base Spread Increase</td><td>${weapon.HIPStandBaseSpreadInc}</td></tr>
        <tr><td>Base Spread Decay Coefficient</td><td>${weapon.HIPStandBaseSpreadDecCoef}</td></tr>
        <tr><td>Base Spread Decay Exponent</td><td>${weapon.HIPStandBaseSpreadDecExp}</td></tr>
        <!-- Add more spread stats as needed -->
    `;

    // Update reload table
    const reloadTable = document.getElementById('reloadStats');
    reloadTable.innerHTML = `
        <tr><th>Stat</th><th>Value</th></tr>
        <tr><td>Reload Empty</td><td>${weapon.ReloadEmpty}</td></tr>
        <tr><td>Reload Left</td><td>${weapon.ReloadLeft}</td></tr>
        <tr><td>Reload Speed</td><td>${weapon.ReloadSpeed}</td></tr>
        <tr><td>Num Bullets Reloaded</td><td>${weapon.NumBulletsReloaded}</td></tr>
        <!-- Add more reload stats as needed -->
    `;

    // Update the chart with the current weapon's data
    const damageData = {
        labels: weapon.Dmg_distances,
        datasets: [{
            label: 'Damage vs Distance',
            data: weapon.Damages,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0, // Set tension to 0 for straight lines
        }]
    };

    const config = {
        type: 'line',
        data: damageData,
        options: {
            responsive: true,
            animation: {
                duration: 0 // Disable animations
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Distance (m)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Damage'
                    }
                }
            }
        }
    };

    // Destroy the existing chart if it exists
    if (damageChart) {
        damageChart.destroy();
    }

    // Create a new chart
    const ctx = document.getElementById('damageChart').getContext('2d');
    damageChart = new Chart(ctx, config);
}

// Luokkien nimet ja niiden numerot
const classNames = {
    1: 'Medic',
    2: 'Assault',
    3: 'Support',
    4: 'Scout',
    8: 'Pistols',
};

// Lajitellaan aseet Class-arvon perusteella (1 -> 2 -> 3 -> 4 -> 8)
data.sort((a, b) => {
  // Ensin numerollinen vertailu class-arvoille
  if (a.class !== b.class) {
    return a.class - b.class;
  }

  // Sitten weapShowName aakkosjärjestykseen
  return a.WeapShowName.localeCompare(b.WeapShowName);
});

// Käydään data läpi
data.forEach((weapon, index) => {
    if (weapon.Attachments_short == "") {
        const li = document.createElement('li');
        li.textContent = weapon.WeapShowName || 'Unnamed';
        li.onclick = (e) => {
			document.querySelectorAll('#weaponList li').forEach(function(weap) {
				weap.classList.remove('active');
			});
			e.currentTarget.classList.add('active');
			showWeapon(index);
		} ;

        // Tarkistetaan aseiden luokka (Class) ja haetaan luokan nimi
        const className = classNames[weapon.Class] || 'Unknown';  // Jos ei löydy, käytetään 'Unknown'

        // Etsitään tai luodaan luokka sen perusteella
        let classList = document.getElementById(`class-${className}`);
        
        if (!classList) {
            // Luodaan uusi luokka, jos ei löydy olemassaolevaa
            classList = document.createElement('ul');
            classList.id = `class-${className}`;
            const classHeader = document.createElement('h3');
            classHeader.textContent = className;  // Näytetään luokan nimi
            weaponList.appendChild(classHeader);
            weaponList.appendChild(classList);
        }

        // Lisätään ase luokkaan
        classList.appendChild(li);
    }
});

document.querySelector('#class-Support li:first-child').click()
