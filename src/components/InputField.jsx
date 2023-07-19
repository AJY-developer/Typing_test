import React from 'react'


export default function InputField(props) {

    return (
        <div id="23" className="typeText">
            <input type="text" id = "inputField" value={props.current} onChange={props.updateInputValue} onKeyDown={props.targetKey} />
            <div className="timer">60</div>
            <button className="restart" onClick={props.restartFunc}>
                <i className="fa fa-refresh"></i>
            </button>
        </div>
    )
}
