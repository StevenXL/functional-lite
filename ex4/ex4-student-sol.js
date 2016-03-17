function foo(val) {
  return function(){
    return val;
  };
}

function add(x, y) {
  return x + y;
}

function add2(fn1, fn2) {
  return add(fn1(), fn2());
}

function addNLoop(...args) {
  var total = 0;

  function totalFn() {
    return total;
  }

  function id(x) {
    return function() {
      return x;
    };
  }

  for (var i = 0; i < args.length; i++) {
    total = add2(totalFn, id(args[i]));
  }

  return total;
}

function addNRecursion(arr) {
  if (arr.length <= 1) {
    return arr[0]();
  } else if (arr.length == 2) {
    return add2(arr[0], arr[1]);
  } else {
    return add2(arr[0], arr[1]) + addNRecursion(arr.slice(2));
  }
}

function addNList(arr) {
  return arr.reduce(function(prev, cur) {
    return function() {
      return add2(prev, cur);
    }
  }, function() { return 0; });
}

function one() {
  return 1;
}

function two() {
  return 2;
}

function three() {
  return 3;
}

// Simply function that tests if an integer is odd.
function isOdd(num) {
  return (num % 2 === 1);
}

// A function that does function composition for me. It takes an function as an
// argument, and returns a new function that also takes an argument, applies the
// original function to that argument, and then negates the return.
function negateBool(func) {
  return function(arg) {
    return !func(arg);
  }
}

// usage of negateBool to create an isEven function using isOdd.
// negateBool is only useful if we do this often
var isEven = negateBool(isOdd);

var list = [one, two, three];
var test = addNList(list);
console.log(test);
