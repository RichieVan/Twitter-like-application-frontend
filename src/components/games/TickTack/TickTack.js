import React from 'react';
import "./TickTack.css";

function calculateWinner (squares) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {player: squares[a], combination: winningLines[i]};
      }
    }
    return null;
  }
  
  function Square (props) {
    return (
      <button 
        className={'square ' + props.addClasses}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }

  
  class Board extends React.Component {
    renderSquare (i, uniqueKey, additionalClasses) {
      return (
        <Square 
          key = {uniqueKey}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          addClasses={additionalClasses}
        />
      )
    }
  
    render () {
      let renderedSquares = [];
      let content = [];
      for (let j = 0; j < 9; j++) {
        const additionalClasses = [
          this.props.activeSquare == j ? 'active' : '',
          this.props.winningCombination.includes(j) ?  'winning' : ''
        ];
        renderedSquares.push(this.renderSquare(j, j % 3, additionalClasses.join(' ')));
  
        if (j % 3 == 2) {
          content.push(<div key={Math.floor(j / 3)} className='board-row'>{renderedSquares}</div>);
          renderedSquares = [];
        }
      }
  
      return (
        <div>
          {content}
        </div>
      );
    }
  }
  
  class TickTack extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          addedCell: null
        }],
        stepNumber: 0,
        isCurrentPlayerX: true
      }
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const squares = history[history.length - 1].squares.slice();
      if (squares[i] || calculateWinner(squares) || history.length == 10) return;
      else {
        squares[i] = this.state.isCurrentPlayerX ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares, addedCell: i}]),
            stepNumber: history.length,
            isCurrentPlayerX: !this.state.isCurrentPlayerX
        })
      }
    }
  
    jumpTo (turn) {
      //const turnSquares = this.state.history[turn];
      this.setState({stepNumber: turn, isCurrentPlayerX: (turn % 2) === 0});
    }
  
    render () {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const win = calculateWinner(current.squares);
  
      const historyList = history.map((turn, turnId) => {
        const desc = turnId ? 'Ход ' + turnId + ' (Col: ' + (turn.addedCell % 3 + 1) + ', Row: ' + (Math.floor(turn.addedCell / 3) + 1) + ')' : 'Перейти к началу игры';
  
        return (
          <li key={turnId}>
            <a href='#' onClick={() => this.jumpTo(turnId)}>{desc}</a>
          </li> 
        )
        
      });
  
      let status;
      if (win) status = "Победил игрок: " + win.player;
      else {
        if (this.state.stepNumber == 9) status = "Игра завершилась вничью";
        else status = "Ходит игрок: " + ( this.state.isCurrentPlayerX ? 'X' : 'O');
      }
  
      return (
        <div className='game'>
          <div className='game-board'>
            <Board squares={current.squares} winningCombination={win ? win.combination : []} activeSquare={current.addedCell} onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className='game-info'>
            <div className='status'>{status}</div>
            <div className='turnsHistory'>{historyList}</div>
          </div>
        </div>
      )
    }
  }

  export default TickTack;