import React, { useState, Component } from 'react'
import { CSpinner } from '@coreui/react'

export default class Cspinner extends Component {

    render() {
        return (
            <CSpinner
                className="overlay" 
                position="top-center" 
                color="info"
            />
        )
    }
}