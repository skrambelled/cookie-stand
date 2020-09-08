'using strict';

console.log("JS loaded!");

var Seattle;
var Tokyo;
var Dubai;
var Paris;
var Lima;

// rand int using inclusive min and max
function rand(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

Seattle = {
  name             : "Seattle",
  minCustPerHour   : 23,
  maxCustPerHour   : 65,
  avgCookiePerSale : 6.3,
  hourlySales: [],
  totalSales: 0,

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // clear out any pre-exising sales
    this.hourSales = [];
    this.totalSales = 0;

    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      var sales = this.hourlySales.push(Math.floor(this.randHourly()+0.5));
      this.totalSales += sales;
    }
  }
};

Tokyo = {
  name             : "Tokyo",
  minCustPerHour   : 3,
  maxCustPerHour   : 24,
  avgCookiePerSale : 1.2,
  hourlySales: [],
  totalSales: 0,

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // clear out any pre-exising sales
    this.hourSales = [];
    this.totalSales = 0;

    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      var sales = this.hourlySales.push(Math.floor(this.randHourly()+0.5));
      this.totalSales += sales;
    }
  }
};

Dubai = {
  name             : "Dubai",
  minCustPerHour   : 11,
  maxCustPerHour   : 38,
  avgCookiePerSale : 3.7,
  hourlySales: [],
  totalSales: 0,

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // clear out any pre-exising sales
    this.hourSales = [];
    this.totalSales = 0;

    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      var sales = this.hourlySales.push(Math.floor(this.randHourly()+0.5));
      this.totalSales += sales;
    }
  }
};

Paris = {
  name             : "Paris",
  minCustPerHour   : 20,
  maxCustPerHour   : 38,
  avgCookiePerSale : 2.3,
  hourlySales: [],
  totalSales: 0,

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // clear out any pre-exising sales
    this.hourSales = [];
    this.totalSales = 0;

    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      var sales = this.hourlySales.push(Math.floor(this.randHourly()+0.5));
      this.totalSales += sales;
    }
  }
};

Lima = {
  name             : "Lima",
  minCustPerHour   : 2,
  maxCustPerHour   : 16,
  avgCookiePerSale : 4.6,
  hourlySales: [],
  totalSales: 0,

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // clear out any pre-exising sales
    this.hourSales = [];
    this.totalSales = 0;

    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      var sales = this.hourlySales.push(Math.floor(this.randHourly()+0.5));
      this.totalSales += sales;
    }
  }
};

function do_the_DOM() {
  var storesList = document.getElementById("storesList");
  var Stores = [Seattle, Tokyo, Dubai, Paris, Lima];

  for(var i = 0; i<Stores.length; i++) {
    // For each store generate hourly sales
    Stores[i].generateHourlySales();

    // For each store create a section
    var section = document.createElement("section");
    storesList.append(section);
    section.setAttribute("id", Stores[i].name);
    section.setAttribute("class", "salesList");

    // For each store section, create an unordered list
    var ul = document.createElement("ul");
    section.append(ul);
    var lh = document.createElement("lh");
    ul.append(lh);
    lh.textContent = Stores[i].name;

    // For earch store ul, create an hourly breakdown
    var hSales = Stores[i].hourlySales;
    var salesTotal = 0;
    for(var j = 0; j<hSales.length; j++) {
      //console.log(Stores[i].name + " : (j) "+hSales[j]);
      var li = document.createElement('li');
      // element 0 represent 6am, so we start at j+6
      if(j+6 < 12) // am
        li.textContent = (j+6)+"am: " + hSales[j] +" cookies";
      else { // pm
        if(j+6 === 12) // noon, which is a subset of pm
          li.textContent = "12pm: " + hSales[j] +" cookies";
        else
          li.textContent = (j-6)+"pm: " + hSales[j] +" cookies";
      }
      salesTotal += hSales[j];
      ul.append(li);
    }

    // create one last line for the total sales
    var myTotal = document.createElement('p');
    myTotal.setAttribute("class", "salesTotal");
    myTotal.textContent = "Total: "+salesTotal;
    section.append(myTotal);
  }
}

do_the_DOM();
