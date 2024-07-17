import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ResponseCodeCard.css'
import { PostData } from '../../utils/api';

function ResponseCodeCard({ code, name }) {
    const storedUserId = localStorage.getItem('userId');

    const handleSaveClick = async() => {
        const saveResult = await PostData('SaveRespose', {
            name,
            imageLinks: `https://http.dog/${code}.jpg`,
            responseCodes: code,
            userId:storedUserId||1

        })
        if(saveResult.id){
            alert("Save Successfully")
        }
        console.log(saveResult);
    };

    return (
        <div className="card">
            <img
                src={`https://http.dog/${code}.jpg`}
                alt={`HTTP Dog ${code}`}
                className="image"
            />
            <div className="saveIcon" onClick={handleSaveClick}>
                <FontAwesomeIcon icon={faSave} color='white' />
            </div>
        </div>
    );
}

export default ResponseCodeCard;