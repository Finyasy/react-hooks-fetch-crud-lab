import React from "react";


function QuestionItem({ question, onDeleteQuestion ,onUpdateQuestion}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => onDeleteQuestion(question));
  }

  function handleUpdateClick(event){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        correctIndex:event.target.value
      })
    })
    .then(res => res.json())
    .then((updatedItem) => onUpdateQuestion(updatedItem));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onClick={handleUpdateClick}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
