import React, { useState } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-estudos.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

const Movimentacoes = ({match}) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const dataMeses = useGet(`meses/${match.params.data}`)
    const [dataPatch, patch] = usePatch()
    const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, remover]= useDelete()
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const onChangeValor = evt => {
        setValor(evt.target.value)
    }
    const onChangeDescricao = evt => {
        setDescricao(evt.target.value)
    }

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))

    const salvarMovimentacao = async() => {
        if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
            await salvar({
                descricao,
                valor: parseFloat(valor)
            })
            setDescricao('')
            setValor('')
            data.refetch()
            await sleep(5000)
            dataMeses.refetch()
        }   
    }
 
    const removerMovimentacao = async(id) => {
        await remover(`movimentacoes/${match.params.data}/${id}`)
        data.refetch()
        await sleep(5000)
        dataMeses.refetch()         
    }

    const alterarPrevisaoEntrada = (evt) => {
        patch(`meses/${match.params.data}`, { previsao_entrada: evt.target.value })
    }

    const alterarPrevisaoSaida = (evt) => {
        patch(`meses/${match.params.data}`, { previsao_saida: evt.target.value })
    }

    return(            
        <div className='container'>
<           h1>Movimentações</h1>

            {
                !dataMeses.loading && 
                <div>
                    {
                        dataMeses.data &&
                        <span>
                            Previsão entradas: {dataMeses.data.previsao_entrada} <input type='text' onBlur={alterarPrevisaoEntrada} /> /
                            Previsão saídas: {dataMeses.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoSaida} />  <br />
                            Entradas: {dataMeses.data.entradas} /
                            Saídas: {dataMeses.data.saidas} 
                        </span>
                    }
                    
                </div>
            }

            <table className='table table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    { data.data &&
                    Object
                    .keys(data.data)
                    .map(movimentacao => {
                        return (
                            <tr key={movimentacao}>
                                <td>{data.data[movimentacao].descricao}</td>
                                <td className='text-right'>
                                {data.data[movimentacao].valor} { ' ' }
                                <button className='btn btn-danger' onClick={() => removerMovimentacao(movimentacao)}>-</button>
                                </td>
                            </tr>
                        )
                    })
                }

                <tr>
                    <td><input type='text' value={descricao} onChange={onChangeDescricao}/></td>
                    <td><input type='text' value={valor} onChange={onChangeValor}/> { ' '}
                    <button className='btn btn-success' onClick={salvarMovimentacao}> + </button>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>         
    )
  }

  export default Movimentacoes