function runCropSpecificCode() {
    const crop = document.getElementById('crop-select').value;
    let output = document.getElementById('output');

    if (crop === "") {
        output.innerHTML = 'Please select a crop.';
        output.classList.remove('visible');
        return;
    }

    output.innerHTML = ''; // Clear previous output

    const cropData = {
        rice: {
            name: "Rice",
            temperature: "20-35°C",
            humidity: "70-80%",
            light: "Full light, 12-14 hours/day,lux",
            image: "static/images/Rice.jpeg"
        },
        tomato: {
            name: "Tomato",
            temperature: "20-25°C",
            humidity: "60-70%",
            light: "Full light, 8-10 hours/day,lux",
            image: "static/images/tomato.jpeg"
        },
        lettuce: {
            name: "Lettuce",
            temperature: "15-20°C",
            humidity: "60-70%",
            light: "Partial light, 6-8 hours/day,lux ",
            image: "static/images/lettuce.jpg"
        }
    };

    const selectedCrop = cropData[crop];

    output.innerHTML = `
        <h2>${selectedCrop.name}</h2>
        <img src="${selectedCrop.image}" alt="${selectedCrop.name}" width="200">
        <p><strong>Optimal Temperature:</strong> ${selectedCrop.temperature}</p>
        <p><strong>Optimal Humidity:</strong> ${selectedCrop.humidity}</p>
        <p><strong>Light:</strong> ${selectedCrop.light}</p>
    `;

    output.classList.add('visible');
    output.classList.remove('hidden');
}

function getSimulatedData() {
    const crop = document.getElementById('crop-select').value;
    let simulatedDataDiv = document.getElementById('simulated-data');

    if (crop === "") {
        simulatedDataDiv.innerHTML = 'Please select a crop first.';
        return;
    }

    fetch(`/simulate?crop=${crop}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                simulatedDataDiv.innerHTML = `<p>${data.error}</p>`;
            } else {
                let table = '<table border="1" cellpadding="10" cellspacing="0">';
                table += '<tr><th>Field</th><th>Value</th></tr>';

                for (let key in data) {
                    table += `<tr><td>${key}</td><td>${data[key]}</td></tr>`;
                }

                table += '</table>';

                simulatedDataDiv.innerHTML = `
                    <h3>Simulated Data for ${crop.charAt(0).toUpperCase() + crop.slice(1)}:</h3>
                    ${table}
                `;
            }
        })
        .catch(error => {
            simulatedDataDiv.innerHTML = 'No action required';
            console.error('Error:', error);
        });
}
