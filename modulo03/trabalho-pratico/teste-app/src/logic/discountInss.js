const INSS_TABLE = [
    {
      id: 1,
      minValue: 0,
      maxValue: 1045,
      difference: 1045 - 0,
      discountPercentage: 0.075,
      discountValue: -1,
    },
    {
      id: 2,
      minValue: 1045.01,
      maxValue: 2089.6,
      difference: 2089.6 - 1045,
      discountPercentage: 0.09,
    },
    {
      id: 3,
      minValue: 2089.61,
      maxValue: 3134.4,
      difference: 3134.4 - 2089.6,
      discountPercentage: 0.12,
    },
    {
      id: 4,
      minValue: 3134.41,
      maxValue: 6101.06,
      difference: 6101.06 - 3134.4,
      discountPercentage: 0.14,
    },
];

export default (salario) => {
    let discountINSS = 0;
  
    if (salario > 6101.07) {
      return 713.1;
    }
  
    for (var i = 0; i < INSS_TABLE.length; i++) {
      var currentItem = INSS_TABLE[i];
      let discountValue = 0;
  
      if (salario > currentItem.maxValue) {
        // prettier-ignore
        discountValue = 
          round(currentItem.difference * currentItem.discountPercentage);
  
        discountINSS += discountValue;
      } else {
        // prettier-ignore
        discountValue = 
          round((salario - currentItem.minValue) * currentItem.discountPercentage);
  
        discountINSS += discountValue;
        break;
      }
    }
  
    discountINSS = round(discountINSS);
  
    return parseFloat(discountINSS);
}

function round(value) {
    return +value.toFixed(2);
}
