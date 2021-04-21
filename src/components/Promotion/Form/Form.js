import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import './Form.css'
 

const inicialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0,
}

const PromotionForm = () => {
    const [values, setValues] = useState(inicialValue)
    const history = useHistory()

    function onChange(ev) {
        const { name, value } = ev.target; // Target retorna um "name"(atributo colocado no input) e "value" (valor do input).

        setValues({...values, [name]: value });

        // Função com objetivo de pegar o valor atual dos inputs e atualizar o state Values.
    }

    function onSubmit(ev) {
        ev.preventDefault();

        axios.post('http://localhost:5000/promotions?_embed=comments', values)
        .then((response) => {
            history.push('/')
        })
    }

    return (
        <div>
            <h1>Promo Show</h1>
            <h2>Nova Promoção</h2>

            <form onSubmit={onSubmit}>
                <div className="promotion-form__group">
                    <label htmlFor="title"> Título </label> {/* htmlFor vai associar a label ao id do input */}

                    <input id="title" name="title" type="text" onChange = {onChange}/>
                </div>

                <div className="promotion-form__group">
                    <label htmlFor="url"> Link </label>
                    <input id="url" name="url" type="text" onChange = {onChange}/>
                </div>

                <div className="promotion-form__group">
                    <label htmlFor="imageUrl"> Imagem (URL) </label>
                    <input id="imageUrl" name="imageUrl" type="text" onChange = {onChange}/>
                </div>

                <div className="promotion-form__group">
                    <label htmlFor="price"> Preço </label>
                    <input id="price" name="price" type="number" onChange = {onChange}/>
                </div>

                <div>
                    <button type="submit"> Salvar </button>
                </div>
            </form>
        </div>
    )
}

export default PromotionForm;