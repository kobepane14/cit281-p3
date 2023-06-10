function validDenomination(coin){
    /*
    let array = [1, 5, 10, 25, 50, 100];
    if (array.indexOf(coin) === -1){
        return false
    } else {
        return true
    }
    */
    return [1, 5, 10, 25, 50, 100].indexOf(coin) != -1;
}

function valueFromCoinObject(obj){
    const {denom = 0 , count = 0} = obj;
    return denom * count;
}

function valueFromArray(arr){
   return arr.reduce((acc, val) => {
    if (Array.isArray(val)){
        return acc + valueFromArray(val);
    } else{
        return acc + valueFromCoinObject(val);
    }
 }, 0);
}

function coinCount(...coinage){
    return valueFromArray(coinage);
}


//console.log("{}", coinCount({denom: 5, count: 3}));
//console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
//console.log("...[{}]", coinCount(...coins));
//console.log("[{}]", coinCount(coins));  // Extra credit


module.exports = {
    coinCount,
    coins
}

//:)
