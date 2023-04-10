// Get table by ID
const table = document.getElementById('table');


// Create <thead>
const tHead = table.createTHead();


// Create <tr> in <thead>
const headRow = tHead.insertRow();


// Create <th>
var headings = [{ id: '#' }, { name: 'NAME' }, { description: 'DESCRIPTION' }, { status: 'STATUS' }, { rate: 'RATE' }, { balance: 'BALANCE' }, { deposit: 'DEPOSIT' }, { action: 'ACTION' }];

headings.forEach(element => {
    let th = headRow.appendChild(document.createElement('th'));

    for (const key in element) {
        th.appendChild(document.createTextNode(Object.values(element)));
    }
})


// Create <tbody>
var tbody = table.createTBody();


// Get submit Button by ID
var submitBtn = document.getElementById('pushBtn');


// Show data in table on page load
document.body.onload = getData();


// Get data From Server (db.json)
async function getData() {
    let response;

    try {
        response = await fetch('http://localhost:3000/assessment2');
        let data = await response.json();
        displayData(data);

    } catch (error) {
        console.warn(error);
    }
}

function displayData(customerData) {
    table.removeChild(table.getElementsByTagName('tbody')[0]);
    let tBody = table.createTBody();

    if (customerData.length == 0) {
        let tr = tBody.insertRow();
        let td = tr.insertCell();

        td.setAttribute('colspan', '8');
        td.innerHTML = "<h2> No data to display</h2>";
    }
    else {
        customerData.forEach(customer => {
            let tr = tBody.insertRow();

            for (const key of headings) {
                var td = tr.insertCell();

                if (key.action !== 'ACTION') {
                    // set Status badges
                    if (key.status === 'STATUS') {
                        let span = document.createElement('span');

                        if (customer[Object.keys(key)] === 'Open') {
                            span.style.backgroundColor = "rgb(147, 133, 254)";
                            span.style.color = "blue";
                        }
                        else if (customer[Object.keys(key)] === 'Error') {
                            span.style.backgroundColor = "rgb(250, 186, 186)";
                            span.style.color = "red";
                        }
                        else if (customer[Object.keys(key)] === 'Success') {
                            span.style.backgroundColor = "rgb(126, 248, 130)";
                            span.style.color = "green";
                        }
                        else {
                            span.style.backgroundColor = "rgb(186, 186, 250)";
                            span.style.color = "gray";
                        }

                        let statusData = document.createTextNode(customer[Object.keys(key)]);
                        td.appendChild(span);
                        span.appendChild(statusData);
                    }
                    else if (key.balance === 'BALANCE') {

                        if (customer[Object.keys(key)] >= '0') {
                            td.style.color = "green";
                        }
                        else {
                            td.style.color = "red";
                        }
                        let val = "$" + customer[Object.keys(key)]
                        td.appendChild(document.createTextNode(val));
                    }
                    else {
                        td.appendChild(document.createTextNode(customer[Object.keys(key)]));
                    }

                }
                else {
                    td.setAttribute('id', 'action');
                    let editBtn = document.createElement('button');
                    editBtn.innerText = 'Edit';
                    editBtn.setAttribute('id', 'edit-button');
                    editBtn.onclick = function () { editData(customer) };

                    let deleteBtn = document.createElement('button');
                    deleteBtn.innerText = 'Delete';
                    deleteBtn.setAttribute('id', 'delete-button');
                    deleteBtn.onclick = function () { deleteData(customer) };

                    td.appendChild(document.innerHTML = editBtn);
                    td.appendChild(document.innerHTML = deleteBtn);
                }
            }
        })
    }
}


// Add data to server (db.json) : POST
function pushData() {

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;
    const rate = document.getElementById("rate").value;
    const balance = document.getElementById("balance").value;
    const deposit = document.getElementById("deposit").value;

    fetch('http://localhost:3000/assessment2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            status: status,
            rate: rate,
            balance: balance,
            deposit: deposit,
        })
    })
        .then(
            hideSaveButton(),
            getData(),
            formReset()
        )
}

// Edit stored data : PUT
function editData(customer) {
    document.getElementById('pushBtn').style.display = "block";
    document.getElementById('pushBtn').innerText = "Update";

    document.getElementById("name").value = customer.name;
    document.getElementById("description").value = customer.description;
    document.getElementById("status").value = customer.status;
    document.getElementById("rate").value = customer.rate;
    document.getElementById("balance").value = customer.balance;
    document.getElementById("deposit").value = customer.deposit;

    let id = customer.id;

    submitBtn.onclick = async function () {
        fetch(`http://localhost:3000/assessment2/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                status: document.getElementById("status").value,
                rate: document.getElementById("rate").value,
                balance: document.getElementById("balance").value,
                deposit: document.getElementById("deposit").value,
            })
        })
        hideSaveButton();
        await getData();
        await formReset();
    }
}


// Delete Stored Data : DELETE
function deleteData(customer) {
    let id = customer.id;

    fetch(`http://localhost:3000/assessment2/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    getData();
}


// Reset form 
function formReset() {
    document.getElementById("name").value = null;
    document.getElementById("description").value = null;
    document.getElementById("status").value = null;
    document.getElementById("rate").value = null;
    document.getElementById("balance").value = null;
    document.getElementById("deposit").value = null;
}



/* Form Validation */
var flag = [0, 0, 0, 0, 0, 0];

function nameValidation() {
    let input = document.getElementById('name').value;
    let warningMessage = document.getElementById('name-warning');
    let regex = /^[A-Za-z0-9]+$/;

    if ((regex.test(input)) && (input.length >= 3 && input.length <= 25)) {
        warningMessage.style.display = "none";
        flag[0] = 1;
    }
    else {
        warningMessage.style.display = "block";
        flag[0] = 0;
    }
    checkFlags();
}

function descriptionValidation() {
    let input = document.getElementById('description').value;
    let warningMessage = document.getElementById('description-warning');

    if (input.length >= 3 && input.length <= 150) {
        warningMessage.style.display = "none";
        flag[1] = 1;
    }
    else {
        warningMessage.style.display = "block";
        flag[1] = 0;
    }
    checkFlags();
}

function statusValidation() {
    let input = document.getElementById('status');
    let warningMessage = document.getElementById('status-warning');

    let check = input.options[input.selectedIndex].value;

    if (check != 0) {
        warningMessage.style.display = "none";
        flag[2] = 1;
    }
    else {
        warningMessage.style.display = "block";
        flag[2] = 0;
    }
    checkFlags();
}


function balanceValidation() {

    var input = document.getElementById('balance').value;
    var warningMessage = document.getElementById('balance-warning');

    let regex = /^[0-9-]+$/;

    if (regex.test(input)) {
        warningMessage.style.display = "none";
        flag[3] = 1;
    }
    else {
        warningMessage.style.display = "block";
        flag[3] = 0;
    }
    checkFlags();
}

function depositValidation() {

    var input = document.getElementById('deposit').value;
    var warningMessage = document.getElementById('deposit-warning');

    let regex = /^[0-9]+$/;

    if (regex.test(input)) {
        warningMessage.style.display = "none";
        flag[4] = 1;
    }
    else {
        warningMessage.style.display = "block";
        flag[4] = 0;
    }
    checkFlags();
}

function rateValidation() {

    var input = document.getElementById('rate').value;
    var warningMessage = document.getElementById('rate-warning');

    let regex = /^[0-9]+$/;

    if (regex.test(input)) {
        warningMessage.style.display = "none";
        flag[5] = 1;
    }
    else {
        warningMessage.style.display = "block";
        flag[5] = 0;
    }
    checkFlags();
}

// show SAVE button only when all valdation are successful
function checkFlags() {

    if (flag.every(value => value == 1)) {
        document.getElementById('pushBtn').style.display = "block";
    }
    else {
        document.getElementById('pushBtn').style.display = "none";
    }
}

// Hide SAVE button
function hideSaveButton() {
    document.getElementById('pushBtn').style.display = "none";
}

