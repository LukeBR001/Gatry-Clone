import React from 'react';
import { useParams } from 'react-router-dom';


const PagesPromotionForm = () => {
    const { id } = useParams();

    return (
        <div> 
            Form
            {id && <div> Id: {id}</div>}
        </div>
)}

export default PagesPromotionForm;