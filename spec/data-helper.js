function using(name, values, func){
  for (var i = 0, count = values.length; i < count; i++) {
    if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
      values[i] = [values[i]];
    }
    if (values[i][0].substring) {
      func.apply(this, values[i]);
      var message = values[i][0].substring(0,30);
      jasmine.currentEnv_.currentSpec.description += ' (with "' + name + '" using ' + message + ')';
    }
  }
}