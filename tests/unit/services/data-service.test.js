QUnit.module('Data Service', {
  before: function() {
    this.dataService = new DataApi();
  },
  beforeEach: function() {
    this.dataService.addValues("[[\"lnkd\",76.6846786993835],[\"eva\",42.53847536616615],[\"tck\",32.640924392858935]]");
  },
  afterEach: function() {
    this.dataService.clearData();
  },
  after: function() {
    delete this.dataService;
  }
});

QUnit.test('Passing invalid message data format', function( assert ) {
  var dataService = new DataApi();

  assert.throws(function(){
    dataService.addValues("{\"lnkd\":76.6846786993835,\"eva\":42.53847536616615,\"tck\":32.640924392858935}");
  }, /Invalid message data format!/, 'Thrown error contains string "Invalid message data format!"');
});

QUnit.test('Passing invalid stock data', function( assert ) {
  var dataService = new DataApi();

  assert.throws(function(){
    dataService.addValues("[{\"lnkd\":76.6846786993835},{\"eva\":42.53847536616615},{\"tck\":32.640924392858935}]");
  }, /Invalid stock data!/, 'Thrown error contains string "Invalid stock data!"');
});

QUnit.test("Adding new stocks", function( assert ) {
  assert.equal(this.dataService.fetchStocks().get("lnkd").value, 76.6846786993835, 'Stock values for lnkd should match');
  assert.equal(this.dataService.fetchStocks().get("lnkd").delta, 0, 'Delta values for lnkd should match');

  assert.equal(this.dataService.fetchStocks().get("eva").value, 42.53847536616615, 'Stock values for eva should match');
  assert.equal(this.dataService.fetchStocks().get("eva").delta, 0, 'Delta values for eva should match');

  assert.equal(this.dataService.fetchStocks().get("tck").value, 32.640924392858935, 'Stock values for tck should match');
  assert.equal(this.dataService.fetchStocks().get("tck").delta, 0, 'Delta values for tck should match');
});

QUnit.test("Updating existing stocks", function( assert ) {
  this.dataService.addValues("[[\"lnkd\",42.53847536616615],[\"eva\",32.640924392858935],[\"tck\",76.6846786993835]]");

  assert.equal(this.dataService.fetchStocks().get("lnkd").value, 42.53847536616615, 'Stock values for lnkd should match');
  assert.equal(this.dataService.fetchStocks().get("lnkd").delta, -34.14620333321734, 'Delta values for lnkd should match');

  assert.equal(this.dataService.fetchStocks().get("eva").value, 32.640924392858935, 'Stock values for eva should match');
  assert.equal(this.dataService.fetchStocks().get("eva").delta, -9.897550973307219, 'Delta values for eva should match');

  assert.equal(this.dataService.fetchStocks().get("tck").value, 76.6846786993835, 'Stock values for tck should match');
  assert.equal(this.dataService.fetchStocks().get("tck").delta, 44.04375430652456, 'Delta values for tck should match');
});

QUnit.test("Clearing stocks data", function( assert ) {
  this.dataService.clearData();
  assert.deepEqual(this.dataService.fetchStocks(), new Map(), 'All data should be cleared');
});