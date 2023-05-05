import React from 'react'
import Table from './Table'
import Form from './Form'

function Base(props){
    return(
        <div className="container">
            <Table characterData={props.characterData} removeCharacter={props.removeCharacter}/>
            <Form handleSubmit={props.handleSubmit}/>
        </div>
    );
}

export default Base;