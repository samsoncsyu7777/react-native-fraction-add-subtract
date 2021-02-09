export function getPrimeNumbers() {
  var i;
  var tmpPrimeNumbersArray = [2];
  for (i = 3; i < 200; i++) {
    var isPrime = true;
    var j;
    for (j = 0; j < tmpPrimeNumbersArray.length; j++) {
      if ((i % tmpPrimeNumbersArray[j]) == 0) {
        isPrime = false;
        j = tmpPrimeNumbersArray.length;
      } else if ((tmpPrimeNumbersArray[j] ** 2) > i) {
        j = tmpPrimeNumbersArray.length;
      }
    }
    if (isPrime) {
      tmpPrimeNumbersArray.push(i);
    }
  }
  return tmpPrimeNumbersArray;
}