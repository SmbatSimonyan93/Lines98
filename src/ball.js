import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.js'


export default class extends Component {
    constructor() {
        super();
    }

    render() {
        var isSelected = this.props.isSelected;
        var obj = null;
        
        obj = isSelected ? {...styles.ballStyles.selectedBall} : {...styles.ballStyles.ball};

        // if (isSelected) {
        //     obj = {...styles.ballStyles.selectedBall}
        // } else {
        //     obj = {...styles.ballStyles.ball}
        // }

        obj.background = this.props.color;
        
        return (
            <div style={obj}></div>
        )
    }
}

{/* <div style={isSelected ? styles.ballStyles.selectedBall : styles.ballStyles.ball}></div> */}
