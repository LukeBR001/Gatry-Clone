import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import useApi from 'components/utils/useApi'
import './Search.css'
 
import PromotionList from 'components/Promotion/List/List';


const PromotionSearch = () => {
  const mountRef = useRef(null)
    const [ search, setSearch ] = useState('')     // Contém os parâmetros de busca.
    const [load, loadInfo] = useApi({             // HOOK CUSTOMIZADO 
      debounceDelay: 300,
      url:'/promotions',
      method: 'get',
      params: {
        _embed: 'comments',
        _order: 'desc',
        _sort: 'id',
        title_like: search || undefined,
      },
    })

  useEffect(() => {
    load({
      debounced: mountRef.current,
    });

    if (!mountRef.current) {
      mountRef.current = true
    };
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
          <PromotionList 
          promotions = { loadInfo.data } 
          loading = {loadInfo.loading}
          error = {loadInfo.error}
          />
          
      </div>
  )
}

export default PromotionSearch;