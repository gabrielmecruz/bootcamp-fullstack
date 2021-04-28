import React from 'react';
import './style.css'

export default (props) => {
 return (
  <div className='graph-main'>
   <div className="graph-desconto-inss graph-item" style={{width:`${props.descontoInss}%`}}></div>
   <div className="graph-desconto-irpf graph-item" style={{ width: `${props.porcentagemIrpf }%`}}></div>
   <div className="graph-salario-liquido graph-item" style={{ width: `${props.salarioLiquido}%` }}></div>
  </div>
 )
}