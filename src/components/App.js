import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionsList, setQuestionsList] = useState([]);

  // / Add useEffect hook to handle the initial data load
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestionsList(questions));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestionsList([...questionsList, newQuestion]);
  }

  function handleDeleteQuestion(item) {
    setQuestionsList(
      questionsList.filter((question) => question.id !== item.id)
    );
  }

  function handleUpdateQuestion(item) {
    setQuestionsList(
      questionsList.map((question) => {
        if (question.id === item.id) {
          return item;
        }
        return question;
      })
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
