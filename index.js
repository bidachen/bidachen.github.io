import React from "react";
import ReactDOM from "react-dom";
import { Alert, Button, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import Calculation from "./calculation.js";
import Question from "./question.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculation: false,
      questionApp: false,
      question: "",
      correct: "",
      incorrect: [],
      category: [
        { id: 8, value: "simple calculation" },
        { id: 9, value: "general knowledge" },
        { id: 10, value: "entertainment: books" },
        { id: 11, value: "entertainment: film" },
        { id: 12, value: "entertainment: music" },
        { id: 13, value: "entertainment: musicals & theatres" },
        { id: 14, value: "entertainment: television" },
        { id: 15, value: "entertainment: video games" },
        { id: 16, value: "entertainment: board gmaes" },
        { id: 17, value: "science & nature" },
        { id: 18, value: "science: computers" },
        { id: 19, value: "science: mathematics" },
        { id: 20, value: "mythology" },
        { id: 21, value: "sports" },
        { id: 22, value: "geography" },
        { id: 23, value: "history" },
        { id: 24, value: "politics" },
        { id: 25, value: "art" },
        { id: 26, value: "celebrities" },
        { id: 27, value: "animals" },
        { id: 28, value: "vehicles" },
        { id: 29, value: "entertainment:comics" },
        { id: 30, value: "science: gadgets" },
        { id: 31, value: "entertainment: Japanese anime & manga" },
        { id: 32, value: "entertainment: cartoon & animations" }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    let categorySelect =
      parseInt(document.querySelector("#categorySelect").value) + 7;
    let difficultySelect = document.querySelector("#difficultySelect").value;
    let typeSelect = document.querySelector("#typeSelect").value;
    if (categorySelect === 8) {
      this.setState({ calculation: true });
      return null;
    }
    typeSelect === "multiple choices"
      ? (typeSelect = "multiple")
      : (typeSelect = "boolean");
    let url =
      "https://opentdb.com/api.php?amount=1&category=" +
      categorySelect +
      "&difficulty=" +
      difficultySelect +
      "&type=" +
      typeSelect;
    fetch(url)
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            questionApp: true,
            question: res.results[0].question,
            correct: res.results[0].correct_answer,
            incorrect: res.results[0].incorrect_answers
          });
        },
        error => {
          <Alert color="danger">Wrong selection!</Alert>;
        }
      );
  }
  render() {
    let options = this.state.category.map((item, index) => {
      return (
        <option key={index}>
          {index + 1}. {item.value}
        </option>
      );
    });
    if (this.state.questionApp)
      return (
        <Question
          question={this.state.question}
          correct={this.state.correct}
          incorrect={this.state.incorrect}
        />
      );
    if (this.state.calculation) return <Calculation />;
    return (
      <div>
        <h2>Test yourself</h2>
        <FormGroup>
          <Label for="categorySelect">Select category</Label>
          <Input type="select" name="select" id="categorySelect">
            {options}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="difficultySelect">Select difficulty</Label>
          <Input type="select" name="select" id="difficultySelect">
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="typeSelect">Select type</Label>
          <Input type="select" name="select" id="typeSelect">
            <option>multiple choices</option>
            <option>true / false</option>
          </Input>
        </FormGroup>

        <Button onClick={this.handleSubmit}>Submit</Button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
