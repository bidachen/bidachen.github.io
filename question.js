import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

class Question extends React.Component {
  constructor(props) {
    super(props);
    let answers = [...this.props.incorrect, this.props.correct];
    for (let i = 0; i < 5; i++) {
      let n = Math.round(Math.random() * 3);
      let m = answers[0];
      answers[0] = answers[n];
      answers[n] = m;
    }
    this.state = {
      question: this.props.question
        .replace(/&quot;/g, '"')
        .replace(/&#039?;/g, "'"),
      correct: this.props.correct,
      answers: answers,
      selection: { index: null, value: "" }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    let tempList = this.state.answers;
    let tempIndex = tempList.indexOf(event.target.innerHTML);
    let tempValue = tempList[tempIndex];
    this.state.correct === tempValue
      ? (tempList[tempIndex] = "Correct!")
      : (tempList[tempIndex] = "Incorrect!");
    if (
      this.state.selection.index !== null &&
      this.state.selection.value !== "Correct!" &&
      this.state.selection.value !== "Incorrect!"
    )
      tempList[this.state.selection.index] = this.state.selection.value;
    this.setState({
      answers: tempList,
      selection: { index: tempIndex, value: tempValue }
    });
    console.log(this.state.answers);
    console.log(this.state.selection);
  }
  handleClick(event) {}
  render() {
    let buttons = this.state.answers.map((item, index) => {
      return (
        <div key={index}>
          <Button size="lg" outline color="primary" onClick={this.handleChange}>
            {item}
          </Button>
        </div>
      );
    });
    return (
      <div>
        <h2>{this.state.question}</h2>
        {buttons}
      </div>
    );
  }
}

export default Question;
