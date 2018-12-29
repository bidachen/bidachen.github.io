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
    componentWillReceiveProps(props) {
        this.setState({text: props.select})
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

Button.defaultProps = {
    select: "next",
};

class Game extends React.Component {
    style = { paddingLeft: "20%", }
    constructor(props) {
        super(props)
        let list = [-2, -1, 0, 1, 2]
        this.state = { correct: false, hidden: true, l: 0, r: 0, sum: 0, list: list, operator:0}
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


    componentDidMount(){
        console.log("componendWillMount")
        this.newGame()
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
        let sum = 0
        let operator =  Math.floor(Math.random() * Math.floor(4))

        switch(operator) {
            case 0:
                sum = l+r
                break;
            case 1:
                sum = l-r
                break;
            case 2:
                sum = l*r
                break;
            default:
                sum = (l/r).toFixed(2)
        }
        console.log("left is"+l,"right is"+r,"sum is"+sum,"operatpor is"+operator)

        this.setState({ correct: false, hidden: true, l: l, r: r, sum: sum, list: list ,operator:operator })

    }

    render() {
        let operator
        switch(this.state.operator) {
            case 0:
                operator = '+'
                break;
            case 1:
                operator = '-'
                break;
            case 2:
                operator = '*'
                break;
            default:
                operator = '/'
        }

        let hint=this.state.correct?"correct: " + this.state.sum  :    "incorrect :  " + this.state.sum
        return (
            <div>
                <h1>What is {this.state.l} {operator} {this.state.r} ?</h1>

                <div>
                    {this.state.list.map((listNum,index) => (
                        <div><Button click={this.selection} select={this.state.operator == 3?(this.state.sum - listNum).toFixed(2):(this.state.sum - listNum)} key={index} /></div>
                    ))}
                </div>
                <div><Button click={this.newGame} />   </div>
                <div style={this.style}>{this.state.hidden ? null : hint}</div>
            </div>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
