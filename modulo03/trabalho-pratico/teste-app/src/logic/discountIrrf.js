export default (salario) => {
    let discountIRPF =
    salario < 1903.98
      ? 0
      : salario < 2826.65
      ? round(salario * 0.075) - 142.8
      : salario < 3751.05
      ? round(salario * 0.15) - 354.8
      : salario < 4664.68
      ? round(salario * 0.225) - 636.13
      : round(salario * 0.275) - 869.36;

    discountIRPF = round(discountIRPF);

    return discountIRPF;
}

function round(value) {
    return +value.toFixed(2);
}