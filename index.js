import React from "react";
import ReactDOM from "react-dom";



let temp={first:"jie",last:"lan",activity:"Science Lab",checkValue:[false,false,false]};

class GetInput extends React.Component{
    constructor(props){
        super(props)
        this.state={value:''}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        temp[this.props.id] = event.target.value;
    }
    render(){

        return <div>
            {this.props.string} name: <br></br><input id={this.props.string} type="text" onChange={this.handleChange}/>
        </div>
    }
}


class GetSelection extends React.Component{
    constructor(props){
        super(props)
        this.state={value:'Science Lab'}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        temp[this.props.id] = event.target.value;
    }
    render(){
        return <select id="selection" value={this.state.value}onChange={this.handleChange}>
            <option>Science Lab</option>
            <option>Swimming</option>
            <option>Cooking</option>
            <option>Painting</option>
        </select>
    }
}

class CheckBox extends React.Component{
    constructor(props){
        super(props)
        this.state={checked:false}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({ checked: event.target.checked })
        temp.checkValue[this.props.index] =!temp.checkValue[this.props.index]
    }
    render(){
        return <div>
            <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>{this.props.string}<br></br>
        </div>
    }
}


function ResultTable(props) {
    return <tr>
        <th>{props.first}</th>
        <th>{props.last}</th>
        <th>{props.activity}</th>
        {props.checkValue[0]?<th>"Dietary Restrictions"</th> : <th></th>}
        {props.checkValue[1]?<th>"Physical Disabilities"</th> : <th></th>}
        {props.checkValue[2]?<th>"Medical Needs""</th> : <th></th>}

    </tr>
}

class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            checkValue:["a) Dietary Restrictions", "b) Physical Disabilities","c) Medical Needs" ]

        }
        this.addCourse=this.addCourse.bind(this)
        this.delCourse=this.delCourse.bind(this)
        this.handleChange = this.handleChange(this)
    }
    addCourse(event){

        this.setState(prevState => ({
            list: [...prevState.list, this.clone(temp)]
        }))

    }

    clone (obj){
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = new obj.constructor();
        for(var key in obj)
            temp[key] = (obj[key]);

        return temp;
    }
    handleChange(event) {

    }

    delCourse(event){

    }
    render(){
        let resultTable=this.state.list.map((item,index) => {
            return <ResultTable id={index} first={item.first} last={item.last} activity={item.activity}  checkValue= {item.checkValue}/>
        });
        return <div>
            <GetInput string={"First"} id ="first" change ={this.handleChange}/>
            <GetInput string={"Last"} id ="last" change ={this.handleChange} />

            <GetSelection id ="activity"/>

            {this.state.checkValue.map((value,index) => (
                <div><CheckBox string={value} index={index} /></div>
            ))}


            <button onClick={this.addCourse}>submit</button>
            <table>
                {resultTable}
            </table>
        </div>

    }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


