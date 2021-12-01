import React, { Component } from 'react';
import Viewer from './canvas/Viewer';
import './css/main.css';

class Main extends Component {

    render() {
        return (
            <div className="mainContainer">               
                <Viewer />
            </div>
        );
    }
}

export default Main;