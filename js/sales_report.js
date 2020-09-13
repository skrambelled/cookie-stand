'use strict';

console.log("JS loaded!");

// rand int using inclusive min and max
function rand(min, max) {
  console.log("rand-min: "+ min + " rand-max: " +max);
  return Math.floor(Math.random() * (max-min+1) + min);
}


var Stores = [
  new Store('seattle', 23, 65, 6.3),
  new Store('tokyo', 3, 24, 1.2),
  new Store('dubai', 11, 38, 3.7),
  new Store('paris', 20, 38, 2.3),
  new Store('lima', 2, 16, 4.6)
];

function Store(name, min, max, avg) {
  this.storeName = name;
  this.minCustPerHour = min;
  this.maxCustPerHour = max;
  this.avgCookiePerSale = avg;
  this.hourlySales = [];
  this.trafficPattern = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
  this.totalSales = 0;
}

Store.prototype.randHourly = function(hour) {
  var min = this.minCustPerHour;
  var max = this.maxCustPerHour;

  var traffic = this.trafficPattern[hour];

  max = (max - min) * traffic + min;
  if(max < min)
    max = min;

  var avg = this.avgCookiePerSale;

  var rng = Math.round(rand(min, max) * avg);
  console.log('min: ' + min, 'max: ' + max, 'avg: ' +avg, 'rng: ' + rng);
  return rng;
};

Store.prototype.generateHourlySales = function() {
  // clear out any pre-exising sales
  this.hourlySales = [];
  this.totalSales = 0;

  // generate a value for each hour we are open
  for(var i = 0; i<=queryHours(); i++) {
    // stretch goal, normalize the customers according to this time scale
    var sales = this.randHourly(i);
    this.totalSales += sales;
    this.hourlySales.push(sales);
  }
};

Store.prototype.renderInSalesTableBody = function() {
  var table = document.getElementById("salesTable");
  var tbody = table.getElementsByTagName("tbody")[0];

  // create a row
  var row = document.createElement('tr');
  tbody.append(row);
  // store name is the first cell in the row
  var cell = document.createElement('th');
  row.append(cell);
  cell.textContent = this.storeName;

  // create a new cell for each hour
  for(var i = 0; i<this.hourlySales.length; i++) {
    cell = document.createElement('td');
    row.append(cell);
    cell.textContent = this.hourlySales[i];
  }

  var tot = document.createElement('td');
  row.append(tot);
  tot.setAttribute('class', 'total');
  tot.textContent = this.totalSales;
};

Store.prototype.renderInEmployeesTableBody = function() {
  var table = document.getElementById("employeesTable");
  var tbody = table.getElementsByTagName("tbody")[0];
  // create a row
  var row = document.createElement('tr');
  tbody.append(row);
  // store name is the first cell in the row
  var cell = document.createElement('th');
  row.append(cell);
  cell.textContent = this.storeName;

  // create a new cell for each hour
  for(var i = 0; i<this.hourlySales.length; i++) {
    let employees = Math.ceil(this.hourlySales[i] / 20);
    if(employees < 2)
      employees = 2;
    cell = document.createElement('td');
    row.append(cell);
    cell.textContent = employees;
  }
};

// hardcoded number of hours we are open
function queryHours() {
  return 13;
}

function createTableHead(table) {
  var thead = document.createElement('thead');
  table.append(thead);

  var row = document.createElement('tr');
  thead.append(row);

  // insert an empty spacer cell
  var cell = document.createElement('td');
  row.append(cell);

  // insert a new cell for each hour
  for(let i = 0; i<=queryHours(); i++) {
    cell = document.createElement('th');
    row.append(cell);
    // element 0 represent 6am
    if(i+6 < 12) // am
      cell.textContent = (i+6)+"am";
    else { // pm
      if(i+6 === 12) // noon, which is a subset of pm
        cell.textContent = "12pm";
      else
        cell.textContent = (i-6)+"pm";
    }
  }
  return thead;
}

function createTableBody(table) {
  var tbody = document.createElement('tbody');
  table.append(tbody);
  return tbody;
}

function createTableFoot(table) {
  var tfoot = document.createElement('tfoot');
  table.append(tfoot);

  // now lets makes totals row for each hour, and also for the store totals
  var row = document.createElement('tr');
  tfoot.append(row);
  var cell = document.createElement('td');
  row.append(cell); // empty cell as placeholder

  for(let i = 0; i<=queryHours(); i++) {
    cell = document.createElement('td');
    row.append(cell);
  }

  // if this is the sales table, we want one additional totals col
  if(table.id === 'salesTable') {
    cell = document.createElement('td');
    row.append(cell);
  }

  return tfoot;
}

function calcFooterTotals() {
  var table = document.getElementById("salesTable");
  var tfoot = table.getElementsByTagName("tfoot")[0];
  var row = tfoot.firstElementChild;

  // grab the cells on the footer row
  var cells = row.childNodes;

  var hourlyTotal = 0;
  for(var i=1; i<cells.length-1; i++) {
    hourlyTotal = 0;
    for(var j=0; j<Stores.length; j++){
      hourlyTotal += parseInt(Stores[j].hourlySales[i-1]);
    }
    cells[i].textContent = hourlyTotal;
  }

  // grand total
  hourlyTotal = 0;
  for(i=0; i<Stores.length; i++) {
    hourlyTotal += Stores[i].totalSales;
  }

  row.lastElementChild.textContent = hourlyTotal;
}


// Event listeners!
function createListeners() {
  console.log("createListeners was called");

  var submit = document.getElementById("create-a-store");
  submit.addEventListener('submit', createNewStore);

  var location = document.getElementById("form_location");
  var min = document.getElementById("form_min");
  var max = document.getElementById("form_max");
  var avg = document.getElementById("form_max");

  location.addEventListener("input",logger);
  min.addEventListener("input",logger);
  max.addEventListener("input",logger);
  avg.addEventListener("input",logger);
}

// debugging function
function logger(event) {
  console.log("Event: "+event.target.name, "Value: "+event.target.value);
}

// create a new store from the form inputs
function createNewStore(event) {
  event.preventDefault();

  console.log("createNewStore was called");

  var location = event.target.form_location.value;

  location = location.toLowerCase();

  location = location.charAt(0).toUpperCase()+location.slice(1);

  for(var i = 0; i<Stores.length; i++) {
    if(Stores[i].storeName === location) {
      alert(location + " already exists!");
      return;
    }
  }

  var min = parseInt(event.target.form_min.value);
  var max = parseInt(event.target.form_max.value);
  var avg = parseFloat(event.target.form_avg.value);

  var newStore = new Store(location, min, max, avg);
  Stores.push(newStore);

  newStore.generateHourlySales();
  newStore.renderInSalesTableBody();
  newStore.renderInEmployeesTableBody();
  calcFooterTotals();
}

function buildTables() {
  // find our existing table
  var salesTable = document.getElementById("salesTable");
  var employeesTable = document.getElementById("employeesTable");

  // create the sections of the sales table
  createTableHead(salesTable);
  createTableBody(salesTable);
  createTableFoot(salesTable);

  // now for the employee table
  createTableHead(employeesTable);
  createTableBody(employeesTable);
  //createTableFoot(employeesTable);
}

function buildStores() {
  for(let i=0; i<Stores.length; i++) {
    Stores[i].generateHourlySales();
    Stores[i].renderInSalesTableBody();
    Stores[i].renderInEmployeesTableBody();
  }
  calcFooterTotals();
}

buildTables();
buildStores();
createListeners();
