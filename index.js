

function Button(props) {
  var style = {
    height: 50,
    width: 200,
    border: "1px solid black",
    backgroundColor: "white",
    fontSize: 30
  }

  return (
    <button style={style} onClick={() => { props.click(props.select) }}>{props.select}
    </button>
  )
}
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = { correct: false, hidden: true, l: 0, r: 0, sum: 0, list:0 }
    this.click = this.handleclick.bind(this)
    this.new=this.new.bind(this)
  }

  componentDidMount() {
    var list = [-2, -1, 0, 1, 2]
    for (let i = 0; i < 5; i++) {
      let n = Math.round(Math.random() * 4);
      let m = list[0];
      list[0] = list[n];
      list[n] = m;
    }
    var l = Math.round(Math.random() * 100)
    var r = Math.round(Math.random() * 100)
    var sum = l + r
    this.setState({
      correct: false, hidden: true,l: l, r: r, sum: sum, list:list
    });
  }

  handleclick(props) {
    if (this.state.sum === props) {
      this.setState({
        correct: true,
      });
    }
    this.setState({
      hidden: false
    });
  }

  new(props){
    this.componentDidMount();
  }

  render() {
    var style = { paddingLeft: "20%", }
    if (this.state.correct)
      var res1 = "correct: " + this.state.sum
    else
      var res2 = "incorrect: " + this.state.sum
    return (
      <div>
        <h1>What is {this.state.l} + {this.state.r} ?</h1>
        <div><Button click={this.click} select={this.state.sum - this.state.list[0]} /></div>
        <div><Button click={this.click} select={this.state.sum - this.state.list[1]} /></div>
        <div><Button click={this.click} select={this.state.sum - this.state.list[2]} /></div>
        <div><Button click={this.click} select={this.state.sum - this.state.list[3]} /></div>
        <div><Button click={this.click} select={this.state.sum - this.state.list[4]} /></div>
        <div><Button click={this.new} select={"next"}/></div>
        <div style={style}>{this.state.hidden ? null : this.state.correct ? res1 : res2}</div>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
