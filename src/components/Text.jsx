import React from 'react'
import {v4 as uuid} from 'uuid';
import './css/text.css'


export default function Text({ show}) {
    
    return (
        <div className="showText">
          {show}

        </div>

    )
}
