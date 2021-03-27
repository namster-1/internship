import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "./loader";
import { Link } from "react-router-dom";
interface Props {
  category: number;
  difficulty: string;
  amount: number;
}

export const Quiz: React.FC<Props> = ({ category, difficulty, amount }) => {
  const Api = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

  const [quiz, setQuiz] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);
  useEffect((): void => {
    const fetchApi = (): void => {
      axios
        .get(Api)
        .then((res: any): void => {
          const questions = res.data.results.map((question: any) => {
            return {
              ...question,
              answers: [
                question.correct_answer,
                ...question.incorrect_answers,
              ].sort(() => Math.random() - 0.5),
            };
          });
          setQuiz(questions);
        })
        .catch((err: any): void => {
          console.error(err);
        });
    };
    fetchApi();
  }, [Api]);

  const handleClick = (ans: string): void => {
    setShowAnswer(true);
    if (page >= quiz.length - 1) {
      setGameEnded(true);
    }
    if (!showAnswer) {
      if (ans === quiz[page].correct_answer) {
        setPoint(point + 1);
      }
    }
  };

  const handleNextQuestion = (): void => {
    setShowAnswer(false);
    return setPage(page + 1);
  };

  const Button = ({ answer }: any): JSX.Element => {
    let ordinaryClasses = "quiz-button ordinary";
    if (answer === quiz[page].correct_answer && showAnswer === true) {
      ordinaryClasses = replaceStr(ordinaryClasses, "ordinary", "green");
    } else {
      ordinaryClasses = replaceStr(ordinaryClasses, "ordinary", "red");
    }
    return (
      <button
        className={showAnswer ? ordinaryClasses : "quiz-button ordinary"}
        onClick={() => handleClick(answer)}
        type="submit"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    );
  };
  if (gameEnded === false) {
    if (quiz.length > 0) {
      const { question } = quiz[page];
      const answers = quiz[page].answers;

      return (
        <div className="quiz-container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div>
            <Button answer={answers[0]} />
            <Button answer={answers[1]} />
          </div>
          <div>
            <Button answer={answers[2]} />
            <Button answer={answers[3]} />
          </div>
          <div>
            {showAnswer && (
              <button
                onClick={handleNextQuestion}
                className="quiz-button ordinary"
              >
                next question
              </button>
            )}
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  } else {
    return (
      <div className="end-game">
        <h1>
          you got {point} point in {amount} questions
        </h1>
        ;
        <Link to="/">
          <button className="quiz-button ordinary">restart</button>
        </Link>
      </div>
    );
  }
};
function replaceStr(str: string, wordOne: string, wordTwo: string): string {
  let strArr = str.split(" ");
  for (let i = 0; i < strArr.length; i++) {
    if (wordOne === strArr[i]) {
      strArr[i] = wordTwo;
    }
  }
  return strArr.join(" ");
}
