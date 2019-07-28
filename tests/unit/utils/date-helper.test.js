QUnit.module( "Date Helper Utility" );
QUnit.test("Last update within 60 sec", function( assert ) {
  var dateUtil = new DateHelper();
  assert.equal(dateUtil.timeStamp(new Date()), 'A few seconds ago', 'Should return string "A few seconds ago"');
});

QUnit.test("Last update within 10 min", function( assert ) {
  var dateUtil = new DateHelper();
  assert.equal(dateUtil.timeStamp(new Date (new Date() - 120000)), 'A few minutes ago', 'Should return string "A few minutes ago"');
});

QUnit.test("Last update after 24 hr", function( assert ) {
  var dateUtil = new DateHelper();
  assert.equal(dateUtil.timeStamp(new Date ('2019/07/26 22:23:30')), '26 July 10:23 pm', 'Should return string "26 July 10:23 pm"');
});

QUnit.test("Invalid date value", function( assert ) {
  var dateUtil = new DateHelper();
  assert.throws(function() {
    dateUtil.timeStamp('foo');
  }, /Invalid date value!/, 'Thrown error contains string "Invalid date value!"');
});