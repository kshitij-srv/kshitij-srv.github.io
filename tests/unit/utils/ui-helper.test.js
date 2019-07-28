QUnit.module('UI Helper Utility', {
  before: function() {
    var wrapper = document.createElement('table');
    wrapper.id = 'stock-data-wrapper';
    wrapper.classList.add('stock-data-wrapper');
    document.body.appendChild(wrapper);

    this.uiHelper = new UIHelper();
  },
  beforeEach: function() {
    this.uiHelper.updateStockItem('goog', {
      value: 42.53847536616615,
      delta: 0,
      time: new Date()
    });
  },
  afterEach: function() {
    document.getElementById('stock-data-wrapper').removeChild(document.getElementById('goog'));
  },
  after: function() {
    document.body.removeChild(document.getElementById('stock-data-wrapper'));
  }
});

QUnit.test('Creating new stock entry', function( assert ) {
  this.uiHelper.updateStockItem('ebr', {
    value: 34.14620333321734,
    delta: 0,
    time: new Date()
  });

  var stockItems = document.getElementsByClassName('stock-item');

  assert.equal(stockItems.length, 2, 'Number od stock items should be 2 including existing');
  assert.equal(document.getElementById('value-goog').textContent, '42.53847536616615', 'Stock entry values for goog should match');
  assert.equal(document.getElementById('value-ebr').textContent, '34.14620333321734', 'Stock entry values for ebr should match');

  document.getElementById('stock-data-wrapper').removeChild(document.getElementById('ebr'));
});

QUnit.test('Updating existing stock entry', function( assert ) {
  this.uiHelper.updateStockItem('goog', {
    value: 76.6846786993835,
    delta: 34.14620333321734,
    time: new Date()
  });

  var stockItems = document.getElementsByClassName('stock-item');

  assert.equal(stockItems.length, 1, 'Number od stock items should be 1 including existing');
  assert.equal(document.getElementById('value-goog').textContent, '76.6846786993835', 'Updated stock entry values for goog should match');
});