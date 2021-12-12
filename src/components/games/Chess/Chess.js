import React from 'react';
import './Chess.css';

class Piece extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selected : false
        };
    }

    render () {
        
        return (
            <div 
                className='piece'
                onClick={() => {this.state.selected = true;}}
            >Конь</div>
        );
    }
}

const startLayout = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        null,
        <Piece type={'knight'} side={'white'}/>,
        null,
        null,
        null,
        null,
        null,
        null
    ]
]

class Square extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            clicked : false
        }
    }

    render () {
        let piece = startLayout[this.props.row][this.props.cell];
        return(
            <div
                className={'square' + (this.state.clicked ? ' active' : '')}
                onClick={() => {this.setState({clicked : true})}}
            >
            {piece !== null ? piece : ''}
            </div>
        );
    }
}

class Board extends React.Component {
    renderSquare (row, cell) {
        return (
            <Square row={row} cell={cell}/>
        );
    }

    render () {
        let board = [];

        for (let i = 0; i < 8; i++) {
            let tempRow = [];
            for (let j = 0; j < 8; j++) {
                tempRow.push(<div key={j} className='board-cell'>{this.renderSquare(i, j)}</div>);
            }
            board.push(<div key={i} className='board-row'>{tempRow}</div>);
        }

        return (
            <div className='board'>
                {board}
            </div>
        );
    }
}

class Chess extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className='chess-game'>
                <Board />
                <div className='history'></div>
            </div>
        );
    }
}

export default Chess;