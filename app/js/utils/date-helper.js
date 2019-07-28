(function(global, DateHelper){
  global.DateHelper = DateHelper();
})(this, function() {
  function DateHelper() {}

  function getMonth(month) {
    switch(month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
          return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
          return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        throw 'Invalid month value!';
    }
  }

  function getTwelveHourTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (hours < 0 || hours > 23) {
      throw 'Invalid time value!';
    }

    if (hours < 12) {
      return hours + ':' + minutes + ' am';
    }

    if (hours > 12) {
      return (hours - 12) + ':' + minutes + ' pm';
    }
  }

  function getDateInCurrentTimeZone(date, offset) {
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
  }

  DateHelper.prototype.timeStamp = function(date) {
    if (!(date instanceof Date)) {
      throw 'Invalid date value!';
    }
    
    // Adjusting date to Indian time zone
    var adjustedCurrentTime = getDateInCurrentTimeZone(new Date(), '+5.5');
    var adjustedArgDate = getDateInCurrentTimeZone(date, '+5.5');

    var timeDelta = (adjustedCurrentTime.getTime() - adjustedArgDate.getTime()) / 1000;

    if (timeDelta > 86400) {
      return adjustedArgDate.getDate() + ' ' + getMonth(adjustedArgDate.getMonth()) + ' ' + getTwelveHourTime(adjustedArgDate);
    }

    if (timeDelta > 600) {
      return getTwelveHourTime(adjustedArgDate);
    }

    if (timeDelta > 60) {
      return 'A few minutes ago';
    }

    if (timeDelta >= 0) {
      return 'A few seconds ago';
    }

    return adjustedArgDate;
  };

  return DateHelper;
});