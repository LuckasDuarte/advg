import {FiSearch} from 'react-icons/fi'
import './style.css';
import {useState} from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});



  async function handleSearch(){
    // API - https://viacep.com.br/ws/01001000/json/

    if (input == ''){
      alert("Preencha um Valor Correto")
      return;
    }


    try {
      const res = await api.get(`${input}/json`)
      setCep(res.data)
      setInput("")
    }catch{
      alert("Erro ao buscar os Dados requeridos")
      setInput("")
    }

  }


  return (
    <div className='container'>
      <h1 className='title'>Buscar CEP</h1>

      <div className='containerInput'>
        <input
          type='text'
          placeholder='Insira o CEP'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch 
            size={25}
            color='#fff'
          />
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && (
          <main className='main'>
          <h2>CEP: {cep.cep}</h2>
  
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main> 
      )}
    </div>
  );
}

export default App;
