(function(global, DateHelper){
  global.DateHelper = DateHelper();
})(this, function() {
  function DateHelper() {}

  function getMonth(month) {
    switch(month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
          return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
          return 'October';
      case 1:
        return 'November';
      case 12:
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