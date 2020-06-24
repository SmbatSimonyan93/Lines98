import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ball from './ball.js'
import styles from './styles.js'


export default class Board extends Component {
    constructor(props) {
        super(props);

        var arr = [];

        for (let i = 1; i <= this.props.boardSize; i++) {
            arr.push(new Array(this.props.boardSize).fill(null));
        }

        var abc = Math.floor((Math.random() * 8) + 1);
        var cba = Math.floor((Math.random() * 8) + 1);

        console.log(abc, cba)

        arr[0][0] = {isSelected: false, color: "yellow", row: 0, column: 0};
        arr[1][0] = {isSelected: false, color: "red", row: 1, column: 0};
        arr[2][0] = {isSelected: false, color: "blue", row: 2, column: 0};
        arr[0][2] = {isSelected: false, color: "green", row: 0, column: 2};
        arr[1][2] = {isSelected: false, color: "pink", row: 1, column: 2};
        arr[2][1] = {isSelected: false, color: "black", row: 2, column: 1};
        arr[2][2] = {isSelected: false, color: "purple", row: 2, column: 2};
        // arr[3][5] = {isSelected: false, color: "brown", row: 3, column: 5};
        arr[abc][cba] = {isSelected: false, color: "brown", row: abc, column: cba};



        this.state = { ballsMatrix: arr };
        this.handleClick = this.handleClick.bind(this);
        this.clickedBall = null;
        this.color = null;
    }

    willPassTheWay(row, column) {    
        var leeNumbers = [];
        var secondArr = [];
        var clickedElementRow = this.clickedBall.row;
        var clickedElementColumn = this.clickedBall.column;

        var ballsMatrix = this.state.ballsMatrix.map((item, index) => {
            var newArr = [];
        
            this.state.ballsMatrix[index].forEach((val) => {
                if(val instanceof Object) {
                    newArr.push({...val});
                } else {
                    newArr.push(null);
                }
            });
            return newArr;
        });

        [
            {nextRow: 0, nextColumn: 1}, 
            {nextRow: 1, nextColumn: 0},
            {nextRow: 0, nextColumn: -1},
            {nextRow: -1, nextColumn: 0}
        ].forEach((item) => {
            if(clickedElementRow + item.nextRow >= 0 && clickedElementRow + item.nextRow < 9 && clickedElementColumn + item.nextColumn >= 0 && clickedElementColumn + item.nextColumn < 9){
            if(null == ballsMatrix[clickedElementRow + item.nextRow][clickedElementColumn + item.nextColumn]) {
                leeNumbers.push({"row": clickedElementRow + item.nextRow, "column": clickedElementColumn + item.nextColumn});
                ballsMatrix[clickedElementRow + item.nextRow][clickedElementColumn + item.nextColumn] = 1;
            }
        }
    });


        // var n = 0;
        while(true) {
            // n++;
        for (let i = 0; i < leeNumbers.length; i++) {
            if (leeNumbers[i].column + 1 < this.props.boardSize) {
                if(null == ballsMatrix[leeNumbers[i].row][leeNumbers[i].column + 1]) {
                    secondArr.push({"row": leeNumbers[i].row, "column": leeNumbers[i].column + 1});
                    ballsMatrix[leeNumbers[i].row][leeNumbers[i].column + 1] = 1 + ballsMatrix[leeNumbers[i].row][leeNumbers[i].column];
                }
            }
            if(leeNumbers[i].row + 1 < this.props.boardSize) {
                if(null == ballsMatrix[leeNumbers[i].row + 1][leeNumbers[i].column]) {
                    secondArr.push({"row": leeNumbers[i].row + 1, "column": leeNumbers[i].column});
                    ballsMatrix[leeNumbers[i].row + 1][leeNumbers[i].column] = 1 + ballsMatrix[leeNumbers[i].row][leeNumbers[i].column];
                }
            }
            if(leeNumbers[i].column - 1 >= 0) {
                if(null == ballsMatrix[leeNumbers[i].row][leeNumbers[i].column - 1]) {
                    secondArr.push({"row": leeNumbers[i].row, "column": leeNumbers[i].column - 1});
                    ballsMatrix[leeNumbers[i].row][leeNumbers[i].column - 1] = 1 + ballsMatrix[leeNumbers[i].row][leeNumbers[i].column];
                }
            }
            if(leeNumbers[i].row - 1 >= 0) {
                if(null == ballsMatrix[leeNumbers[i].row - 1][leeNumbers[i].column]) {
                    secondArr.push({"row": leeNumbers[i].row - 1, "column": leeNumbers[i].column});
                    ballsMatrix[leeNumbers[i].row - 1][leeNumbers[i].column] = 1 + ballsMatrix[leeNumbers[i].row][leeNumbers[i].column];
                }
            }
        }
        leeNumbers = secondArr;
        secondArr = [];
        console.log(ballsMatrix)

        if("number" == typeof ballsMatrix[row][column]) {
            return true
        }
        
        if(leeNumbers.length == 0) {
            return false
        }
        // if(n == 4) {
        //     console.log(ballsMatrix)
        // }
    }
    }


    handleClick(event) {
        var clickedElementRow = +event.currentTarget.getAttribute('row');
        var clickedElementColumn = +event.currentTarget.getAttribute('column');
        
        var ballsMatrix = this.state.ballsMatrix.map((item, index) => {
            var newArr = [];
        
            this.state.ballsMatrix[index].forEach((val) => {
                if(val instanceof Object) {
                    newArr.push({...val});
                } else {
                    newArr.push(null);
                }
            });
            return newArr;
        });

        
        if (event.currentTarget.hasChildNodes()) {
            if (event.target instanceof HTMLDivElement) {
                if(null != this.clickedBall) {
                    ballsMatrix[this.clickedBall.row][this.clickedBall.column].isSelected = false;
                }
                ballsMatrix[clickedElementRow][clickedElementColumn].isSelected = true;
                this.clickedBall = ballsMatrix[clickedElementRow][clickedElementColumn];
                this.setState({ ballsMatrix: ballsMatrix });
            }
        } else {
            if (null != this.clickedBall) {
                if (this.willPassTheWay(clickedElementRow, clickedElementColumn)) {
                    ballsMatrix[this.clickedBall.row][this.clickedBall.column] = null;
                    this.clickedBall.isSelected = false;
                    this.clickedBall.row = clickedElementRow;
                    this.clickedBall.column = clickedElementColumn;
                    ballsMatrix[clickedElementRow][clickedElementColumn] = this.clickedBall;
                    this.clickedBall = null;
                    this.setState({ballsMatrix: ballsMatrix});
                }
            }
        }
    }

    render() {
        var number = this.props.boardSize;
        var trElems = [];
        var elem;

        if (number) {
            for (let i = 0; i < number; i++) {
                let tdElems = [];

                for (let j = 0; j < number; j++) {
                    if (null == this.state.ballsMatrix[i][j]) {
                        tdElems.push(<td key={j} row={i} column={j} onClick={this.handleClick}></td>)
                    } else {
                        tdElems.push(<td key={j} row={i} column={j} onClick={this.handleClick}>
                            <Ball isSelected={this.state.ballsMatrix[i][j].isSelected} color={this.state.ballsMatrix[i][j].color} />
                        </td>)
                    }
                }

                trElems.push(<tr key={i}>{tdElems}</tr>);
            }

            return (
                <table>
                    <tbody>
                        {trElems}
                    </tbody>
                </table>
            );
        }

        return null
    }
}





        // if(null == ballsMatrix[row][column + 1]) {
        //     leeNumbers.push({"row": clickedElementRow, "column": clickedElementColumn + 1});
        //     ballsMatrix[row][column + 1] = 1;
        // }
        // if(null == ballsMatrix[row + 1][column]) {
        //     leeNumbers.push({"row": clickedElementRow + 1, "column": clickedElementColumn});
        //     ballsMatrix[row + 1][column] = 1;
        // }
        // if(null == ballsMatrix[row][column - 1]) {
        //     leeNumbers.push({"row": clickedElementRow, "column": clickedElementColumn - 1});
        //     ballsMatrix[row][column - 1] = 1;
        // }
        // if(null == ballsMatrix[row - 1][column]) {
        //     leeNumbers.push({"row": clickedElementRow - 1, "column": clickedElementColumn});
        //     ballsMatrix[row - 1][column] = 1;
        // }