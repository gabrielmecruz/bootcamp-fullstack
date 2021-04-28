import CalcDiscountInss from './discountInss';
import CalcDiscountIrpf from './discountIrrf';
import GenerateStatistics from './statistics';

export default (props) => {
 const { salario } = props;
 const salarioNumber = parseFloat(salario);

 const discontoInss = CalcDiscountInss(salarioNumber);
 const discontoIrpf = CalcDiscountIrpf((salarioNumber - discontoInss));
 const result = GenerateStatistics({ discontoInss, discontoIrpf, salarioNumber });
 return result;
}
