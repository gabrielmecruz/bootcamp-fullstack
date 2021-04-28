import React, {Component} from "react";
import Title from '../components/Title'
import InputField from '../components/Field/input'
import Graph from '../components/Graph/index'
import Calc from '../logic/calc';
import './style.css';


export default class Layout extends Component {

constructor() {
super()

this.state = {
salario:'',
baseInss: '',
descontoInss: '',
porcentagemInss: '',
baseIrpf: '',
descontoIrpf: '',
porcentagemIrpf: '',
salarioLiquido:''
}
}

calculate = (event) => {
const salario = event.target.value;
const result = Calc({ salario });

this.setState({
salario:event.target.value,
baseInss: result.baseInss | '',
descontoInss: result.descontoInss | '',
porcentagemInss: result.porcentagemInss | '',
baseIrpf: result.baseIrpf | '',
descontoIrpf: result.descontoIrpf | '',
porcentagemIrpf: result.porcentagemIrpf | '',
salarioLiquido:result.salarioLiquido | ''
})
}

formatReal = (valor) => {
return String(this.formatNumber(valor));
}

formatRealComPorcentagem = (valor, porcentagem) => {
return `${this.formatReal(valor)} (${this.formatPercent(porcentagem)}%)`
}

gerarSalarioEPorcentagemSalarioLiquido = (salario, porcentagemIrpf, porcentagemInss) => {
return `${this.formatReal(salario)} 
(${(this.formatPercent(100-parseFloat(porcentagemIrpf)-parseFloat(porcentagemInss)))|'0'}%)`
}

formatNumber =(number)=> new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(number);
formatPercent = (number) => new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);

render() {

const { salario=0, baseInss=0, descontoInss=0, porcentagemInss=0, baseIrpf=0, descontoIrpf=0, porcentagemIrpf=0,
salarioLiquido=0 } = this.state;

return (<>
  <main className="container">
    <header>
      <Title title="React Salário" />
    </header>
    <section>
      <InputField id="input-salario" type="number" label="Salario Bruto" value={salario} onChange={this.calculate}
        className="input-salario" />
      <article className="section-inputs">
        <InputField id="base-inss" type="text" label="Base INSS" disabled={true} value={this.formatReal(baseInss)}
          readOnly={true} className="base-inss" />
        <InputField id="desconto-inss" type="text" label="Desconto INSS" disabled={true}
          value={this.formatRealComPorcentagem(descontoInss, porcentagemInss)} readOnly={true}
          className="desconto-inss" />
        <InputField id="base-irpf" type="text" label="Base IRPF" disabled={true}
          value={String(this.formatReal(baseIrpf))} readOnly={true} className="base-irpf" />
        <InputField id="desconto-irpf" type="text" label="Desconto IRPF" disabled={true}
          value={String(this.formatRealComPorcentagem(descontoIrpf, porcentagemIrpf))} readOnly={true}
          className="desconto-irpf" />
        <InputField id="salario-liquido" type="text" label="Salario Líquido" disabled={true}
          value={this.gerarSalarioEPorcentagemSalarioLiquido(salarioLiquido, porcentagemIrpf, porcentagemInss)}
          readOnly={true} className="salario-liquido" />
      </article>
      <Graph porcentagemIrpf={porcentagemIrpf} salarioLiquido={100 - parseFloat(porcentagemIrpf) -
        parseFloat(porcentagemInss)} descontoInss={porcentagemInss}></Graph>
    </section>
  </main>
</>)
}
}
