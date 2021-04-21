import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Search.css'
 
import List from 'components/Promotion/List/List';
import PromotionList from 'components/Promotion/List/List';


const PromotionSearch = () => {
    const [promotions, setPromotions] = useState([])  // Contém as promoções.
    const [ search, setSearch ] = useState('')       // Contém os parâmetros de busca.

  useEffect(() => {
    const params = {};                  //
    if (search) {                      //
      params.title_like = search;     // criando condicional para parametros de busca (_like é para não precisar buscar pelo title exato)
    }

    axios.get('http://localhost:5000/promotions?_embed=comments&_order=desc&_sort=id', {params})      //Realiza a request (get) para nosso servidor (json) + adicionado os parâmetros de busca.
    .then((response) => {               // recebe a resposta do servidor com os dados em json.
      setPromotions(response.data)     // dados adicionados ao state Promotions.
    });
  }, [search]);    // att toda vez que search mudar

  return (
      <div className ="promotion-search">
          <header className="promotion-search__header">
                <h1>Promo Show</h1>
                <Link to="/create">Nova Promoção</Link>
          </header>
            <input 
                className="promotion-search__input" 
                type="search" 
                placeholder="Buscar" 
                value = {search}
                onChange = {(ev) => setSearch(ev.target.value )}  // Pegando o valor do input e setando no state Search
            />
          <PromotionList promotions = { promotions } loading= {!promotions.length}/>
      </div>
  )
}

export default PromotionSearch;