class Button extends React.Component {
  style = {
    height: 50,
    width: 200,
    border: "1px solid black",
    backgroundColor: "white",
    fontSize: 30
  }

  constructor(props) {
    super(props)
    this.state={text: this.props.select}
  }
  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.select})
  }

  render() {

    return (
      <button style={this.style} onClick={() => {
        this.props.click(this.state.text)}}>
        {this.state.text}
      </button>
    )
  }
}

class Game extends React.Component {
  style = { paddingLeft: "20%", }
  constructor(props) {
    super(props)
    let list = [-2, -1, 0, 1, 2]
    for (let i = 0; i < 5; i++) {
      let n = Math.round(Math.random() * 4);
      let m = list[0];
      list[0] = list[n];
      list[n] = m;
    }
    let l = Math.round(Math.random() * 100)
    let r = Math.round(Math.random() * 100)
    let sum = l + r
    this.state = { correct: false, hidden: true, l: l, r: r, sum: sum, list: list}
    this.selection = this.selection.bind(this)
    this.newGame = this.newGame.bind(this)
  }
  selection(props) {
    if (this.state.sum === props) {
      this.setState({
        correct: true,
      });
    }
    this.setState({
      hidden: false
    });
  }

  newGame(props) {
    let list = [-2, -1, 0, 1, 2]
    for (let i = 0; i < 5; i++) {
      let n = Math.round(Math.random() * 4);
      let m = list[0];
      list[0] = list[n];
      list[n] = m;
    }
    let l = Math.round(Math.random() * 100)
    let r = Math.round(Math.random() * 100)
    let sum = l + r
    this.setState({ correct: false, hidden: true, l: l, r: r, sum: sum, list: list })
  }

  render() {
    var res;
    this.state.correct?
    res = "correct: " + this.state.sum:
    res = "incorrect: " + this.state.sum
    return (
      <div>
        <h1>What is {this.state.l} + {this.state.r} ?</h1>
        <div><Button click={this.selection} select={this.state.sum - this.state.list[0]} /></div>
        <div><Button click={this.selection} select={this.state.sum - this.state.list[1]} /></div>
        <div><Button click={this.selection} select={this.state.sum - this.state.list[2]} /></div>
        <div><Button click={this.selection} select={this.state.sum - this.state.list[3]} /></div>
        <div><Button click={this.selection} select={this.state.sum - this.state.list[4]} /></div>
        <div><Button click={this.newGame} select={"next"}/></div>
        <div style={this.style}>{this.state.hidden ? null : this.state.correct ? res : res}</div>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
