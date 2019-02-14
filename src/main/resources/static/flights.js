let baseURL = "http://localhost:9595/flight/all";
let postURL = "http://localhost:9595/flight";
let customerURL = "http://localhost:9595/customer/all";

function ajaxRequest(method, url, callback){
	let xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			callback(this);
		}
	}
	xhr.send();
}

function ajaxPOST(url, newFlightObj){
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 201){
			console.log("It's working!!");
		}
	}
	xhr.setRequestHeader("Content-Type", "application/json");
	let flightJSON = JSON.stringify(newFlightObj);
	xhr.send(flightJSON);
}

function ajaxPUT(url, editFlightObj){
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", url);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 201){
			console.log("Flight edited.");
		}

	}
	xhr.setRequestHeader("Content-Type", "application/json");
	let flightJSON = JSON.stringify(editFlightObj);
	xhr.send(flightJSON);
}

function ajaxDELETE(url, deletFlightObj){
	let xhr = new XMLHttpRequest();
	xhr.open("DELETE", url);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 201){
			console.log("It's working!!");
		}
	}
	xhr.setRequestHeader("Content-Type", "application/json");
	let flightJSON = JSON.stringify(deletFlightObj);
	xhr.send(flightJSON);
}

window.onload = function(){
	ajaxRequest("GET", baseURL, displayFlights);
	ajaxRequest("GET", customerURL, displayCustomers);
	ajaxRequest("GET", customerURL, displayCustomerChoice);
}

function displayFlights(xhr){
	let flightsArr = JSON.parse(xhr.response);
	console.log(flightsArr);
	console.log(flightsArr.length);
	for(i = 0; i < flightsArr.length; i++){
		if(flightsArr[i].customer != null){
			flightsArr[i].customer.id = flightsArr[i].flightNumber;
			console.log(flightsArr[i].customer.id)
			addRow(flightsArr[i].customer.firstName, flightsArr[i].departsFrom, flightsArr[i].destination, flightsArr[i].flightNumber, flightsArr[i].ticketPrice);	
		} else {
			addRow(flightsArr[i].customer, flightsArr[i].departsFrom, flightsArr[i].destination, flightsArr[i].flightNumber, flightsArr[i].ticketPrice);
		}
	}
	// for(j = 25; j < flightsArr.length; j++){
	// 	flightsArr[j].customer.id = flightsArr[j].flightNumber;
	// 	console.log(flightsArr[j].customer.firstName);
	// 	console.log(flightsArr);
	// 	addRow(flightsArr[j].customer.firstName, flightsArr[j].departsFrom, flightsArr[j].destination, flightsArr[j].flightNumber, flightsArr[j].ticketPrice);
	// }
	delcount = 0;
}

function displayCustomers(xhr){
	let customerArr = JSON.parse(xhr.response);
	for(customer of customerArr){
		addCustomer(customer.firstName, customer.lastName, customer.id);
	}
}

function displayCustomerChoice(xhr){
	let i = 0;
	let customerArr = JSON.parse(xhr.response);
	for(customer of customerArr){
		i++;
		addChoice(customer.firstName, i);
	}
}

function addChoice(customer, i){
	let dropdown = document.getElementById("customerselect");
	let choice = document.createElement("option");
	dropdown.appendChild(choice);
	choice.innerHTML = i + " - " + customer;
}

function addRow(customer, from, to, number, price){

	let row = document.createElement("tr");
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	let cell4 = document.createElement("td");
	let cell5 = document.createElement("td");
	
	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	row.appendChild(cell4);
	row.appendChild(cell5);
	
	cell1.innerHTML=customer;
	cell2.innerHTML=from;
	cell3.innerHTML=to;
	cell4.innerHTML=number;
	cell5.innerHTML=price;
	
	document.getElementById("flights").appendChild(row);	
}

function addCustomer(fname, lname, id){

	let row = document.createElement("tr");
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	
	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	
	cell1.innerHTML=fname;
	cell2.innerHTML=lname;
	cell3.innerHTML=id;
	
	document.getElementById("customers").appendChild(row);	
}

document.getElementById("addFlight").addEventListener("click", addFlight);
document.getElementById("addFlight").addEventListener("click", refresh);
document.getElementById("editFlight").addEventListener("click", editFlight);
document.getElementById("editFlight").addEventListener("click", refresh);
document.getElementById("deleteFlight").addEventListener("click", deleteFlight);
document.getElementById("editFlight").addEventListener("click", refresh); 
function refresh(){
	location.reload();
}

function addFlight(){

	let selection =  document.getElementById("customerselect").value;
	let selectionArr = selection.split(" ");
	let id = selectionArr[0];
	let fname = selectionArr[2];

	let newFlight =
		{
			  "customer" : {
					"firstName": fname,
					"id": id,
					"lastName": "blah",
				  },
			  "departsFrom": document.getElementById("from").value,
			  "destination": document.getElementById("to").value,
			  "flightNumber": document.getElementById("number").value,
			  "ticketPrice": document.getElementById("price").value
		}
		  
		  console.log(newFlight);
	ajaxPOST(postURL, newFlight);
}

function editFlight(){

	let selection =  document.getElementById("customerselect").value;
	let selectionArr = selection.split(" ");
	let id = selectionArr[0];
	let fname = selectionArr[2];

	let editedFlight =
		{
			  "customer" : {
					"firstName": fname,
					"id": id,
					"lastName": "blah",
				  },
			  "departsFrom": document.getElementById("from").value,
			  "destination": document.getElementById("to").value,
			  "flightNumber": document.getElementById("number").value,
			  "ticketPrice": document.getElementById("price").value
		}
	console.log(editedFlight);
	console.log(editedFlight.customer.firstName);
	console.log("you just edited flight");
	ajaxPUT(postURL, editedFlight);
}

function deleteFlight(){

	let selection =  document.getElementById("customerselect").value;
	let selectionArr = selection.split(" ");
	let id = selectionArr[0];
	let fname = selectionArr[2];

	let deletDis = 
		{
			"customer" : {
				"firstName": fname,
				"id": id,
				"lastName": "blah",
			  },
		  "departsFrom": "string",
		  "destination": "string",
		  "flightNumber": document.getElementById("toDelete").value,
		  "ticketPrice": 0
		}
	ajaxDELETE(postURL, deletDis);	
}