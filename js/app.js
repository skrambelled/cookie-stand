'using strict';

var Seattle;
var Tokyo;
var Dubai;
var Paris;
var Lima;

var Stores = [Seattle, Tokyo, Dubai, Paris, Lima];

// rand int using inclusive min and max
function rand(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

Seattle = {
  minCustPerHour   : 23,
  maxCustPerHour   : 65,
  avgCookiePerSale : 6.3,
  hourlySales: [],

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      this.hourlySales.push(Math.floor(this.randHourly()+0.5));
    }
  }
};

Tokyo = {
  minCustPerHour   : 3,
  maxCustPerHour   : 24,
  avgCookiePerSale : 1.2,
  hourlySales: [],

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      this.hourlySales.push(Math.floor(this.randHourly()+0.5));
    }
  }
};

Dubai = {
  minCustPerHour   : 11,
  maxCustPerHour   : 38,
  avgCookiePerSale : 3.7,
  hourlySales: [],

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      this.hourlySales.push(Math.floor(this.randHourly()+0.5));
    }
  }
};

Paris = {
  minCustPerHour   : 20,
  maxCustPerHour   : 38,
  avgCookiePerSale : 2.3,
  hourlySales: [],

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      this.hourlySales.push(Math.floor(this.randHourly()+0.5));
    }
  }
};

Lima = {
  minCustPerHour   : 2,
  maxCustPerHour   : 16,
  avgCookiePerSale : 4.6,
  hourlySales: [],

  randHourly : function() {
    return rand(this.minCustPerHour, this.maxCustPerHour) * this.avgCookiePerSale;
  },

  generateHourlySales : function() {
    // generate a value for each hour 6am to 7pm, we'll use military time
    // to represent each hour
    for(var i = 6; i<=19; i++) {
      this.hourlySales.push(Math.floor(this.randHourly()+0.5));
    }
  }
};

function do_the_DOM() {
  for(var i = 0; i<Stores.length; i++) {
    // we'll manipulate the dom here shortly
  }
}

do_the_DOM();
