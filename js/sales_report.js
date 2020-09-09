'use strict';

console.log("JS loaded!");

var Stores = [
  new Store('seattle', 23, 65, 6.3),
  new Store('tokyo', 3, 24, 1.2),
  new Store('dubai', 11, 38, 3.7),
  new Store('paris', 20, 38, 2.3),
  new Store('lima', 2, 16, 4.6)
];

function Store(name, min, max, avg, hSales = [], tSales = 0) {
  this.storeName = name;
  this.minCustPerHour = min;
  this.maxCustPerHour = max;
  this.avgCookiePerSale = avg;
  this.hourlySales = hSales;
  this.totalSales = tSales;
}

Store.prototype.randHourly = function() {
  console.log("Store.prototype.randHourly called for "+this.storeName);
  return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
};

Store.prototype.generateHourlySales = function() {
  // clear out any pre-exising sales
  this.hourlySales = [];
  this.totalSales = 0;

  // generate a value for each hour we are open
  for(var i = 0; i<=queryHours(); i++) {
    // stretch goal, normalize the customers according to this time scale
    var maxCoeff = [0.5, 0.75, 1, 0.6, 0.8, 1, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
    var sales = Math.round(this.randHourly()*maxCoeff[i]);
    this.totalSales += sales;
    this.hourlySales.push(sales);
  }
};

Store.prototype.renderInSalesTableBody = function(tbody) {
  // create a row
  var row = document.createElement('tr');
  tbody.append(row);
  // store name is the first cell in the row
  var cell = document.createElement('th');
  cell.textContent = this.storeName;
  row.append(cell);

  // create a new cell for each hour
  for(var i = 0; i<this.hourlySales.length; i++) {
    cell = document.createElement('td');
    cell.setAttribute("class", "cookiesSold perHour-"+i);
    cell.textContent = this.hourlySales[i];
    row.append(cell);
  }

  var tot = document.createElement('td');
  tot.setAttribute('class', 'total');
  tot.textContent = this.totalSales;
  row.append(tot);
};

Store.prototype.renderInEmployeesTableBody = function(tbody) {
  // create a row
  var row = document.createElement('tr');
  tbody.append(row);
  // store name is the first cell in the row
  var cell = document.createElement('th');
  cell.textContent = this.storeName;
  row.append(cell);

  // create a new cell for each hour
  for(var i = 0; i<this.hourlySales.length; i++) {
    let employees = Math.ceil(this.hourlySales[i] / 20);
    if(employees < 2)
      employees = 2;
    cell = document.createElement('td');
    cell.setAttribute("class", "employees perHour-"+i);
    cell.textContent = employees;
    row.append(cell);
  }
};

// rand int using inclusive min and max
function rand(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

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
    // element 0 represent 6am
    if(i+6 < 12) // am
      cell.textContent = (i+6)+"am";
    else { // pm
      if(i+6 === 12) // noon, which is a subset of pm
        cell.textContent = "12pm";
      else
        cell.textContent = (i-6)+"pm";
    }
    row.append(cell);
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
    let nodes = table.getElementsByClassName("perHour-"+i);
    let tot = 0;
    for(let j = 0; j<nodes.length; j++) {
      tot += parseInt(nodes[j].textContent);
    }
    cell = document.createElement('td');
    cell.textContent = tot;
    row.append(cell);
  }

  let nodes = document.getElementsByClassName("total");
  let tot = 0;
  for(let i = 0; i< nodes.length; i++) {
    tot += parseInt(nodes[i].textContent);
  }

  if(table.id === 'salesTable') {
    cell = document.createElement('td');
    cell.textContent = tot;
    cell.setAttribute("id", "grandTotal");
    row.append(cell);
  }

  return tfoot;
}

function buildTable() {
  // find our existing table
  var salesTable = document.getElementById("salesTable");
  var employeesTable = document.getElementById("employeesTable");

  // create the sections of the sales table
  createTableHead(salesTable);
  var tbody = createTableBody(salesTable);
  for(let i=0; i<Stores.length; i++) {
    Stores[i].generateHourlySales();
    Stores[i].renderInSalesTableBody(tbody);
  }
  createTableFoot(salesTable);

  // now for the employee table
  createTableHead(employeesTable);
  tbody = createTableBody(employeesTable);
  for(let i=0; i<Stores.length; i++) {
    Stores[i].renderInEmployeesTableBody(tbody);
  }
  createTableFoot(employeesTable);
}

buildTable();
