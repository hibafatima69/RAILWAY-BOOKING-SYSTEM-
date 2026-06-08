let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function bookTicket(){

  let name = document.getElementById("name").value;
  let train = document.getElementById("train").value;
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let date = document.getElementById("date").value;

  let mealPrice = parseInt(document.getElementById("meal").value);

  let mealName = "No Meal";

  if(mealPrice === 500){
    mealName = "Standard Meal";
  }

  if(mealPrice === 1000){
    mealName = "Premium Meal";
  }

  if(!name || !from || !to || !date || train === "Select Train"){
    alert("Please fill all fields!");
    return;
  }

  // BASE PRICE
  let basePrice = 2500;

  // TOTAL PRICE
  let totalPrice = basePrice + mealPrice;

  let id = "RLX" + Math.floor(Math.random()*100000);

  let ticket = {
    id,
    name,
    train,
    route: from + " → " + to,
    date,
    meal: mealName,
    total: totalPrice
  };

  tickets.push(ticket);

  localStorage.setItem("tickets", JSON.stringify(tickets));

  alert(
    "🎫 BOOKING CONFIRMED!\n\n" +
    "Ticket ID: " + id +
    "\nPassenger: " + name +
    "\nTrain: " + train +
    "\nRoute: " + from + " → " + to +
    "\nDate: " + date +
    "\nMeal: " + mealName +
    "\n\nBase Ticket: 2500 PKR" +
    "\nMeal Charges: " + mealPrice + " PKR" +
    "\nTotal Payment: " + totalPrice + " PKR" +
    "\n\nThank you for choosing Luxury Railway!"
  );

  document.getElementById("name").value = "";
  document.getElementById("from").value = "";
  document.getElementById("to").value = "";
  document.getElementById("date").value = "";
  document.getElementById("train").selectedIndex = 0;
  document.getElementById("meal").selectedIndex = 0;

  renderTickets();
}

function renderTickets(){

  let table = document.getElementById("ticketList");

  table.innerHTML = "";

  tickets.forEach((t,index)=>{

    table.innerHTML += `
      <tr>
        <td>${t.id}</td>
        <td>${t.name}</td>
        <td>${t.train}</td>
        <td>${t.route}</td>
        <td>${t.date}</td>
        <td>${t.meal}</td>
        <td>${t.total} PKR</td>
        <td>
          <button class="delete" onclick="deleteTicket(${index})">
            Cancel
          </button>
        </td>
      </tr>
    `;
  });
}

function deleteTicket(index){

  tickets.splice(index,1);

  localStorage.setItem("tickets", JSON.stringify(tickets));

  renderTickets();
}

renderTickets();
