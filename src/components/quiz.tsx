import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "./loader";
interface Props {
  category: number;
  difficulty: string;
  amount: number;
}

interface Button {
  answer: string;
}

export const Quiz: React.FC<Props> = ({ category, difficulty, amount }) => {
  const Api = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

  const [quiz, setQuiz] = useState<any[]>([]);
  useEffect((): void => {
    const fetchApi = (): void => {
      axios
        .get(Api)
        .then((res: any): void => {
          // console.log(res);
          setQuiz(res.data.results);
        })
        .catch((err: any): void => {
          console.error(err);
        });
    };
    fetchApi();
  }, [Api]);

  const Button = ({ answer }: any): JSX.Element => {
    let ordinaryClasses = "quiz-button ";
    if (answer === quiz[0].correct_answer) {
      ordinaryClasses += "green";
    } else {
      ordinaryClasses += "red";
    }

    return <button className={ordinaryClasses}>{answer}</button>;
  };

  if (quiz.length > 0) {
    const { question, correct_answer, incorrect_answers } = quiz[0];
    const answersarr: string[] = [correct_answer, ...incorrect_answers];
    let answers = answersarr.sort((): number => Math.random() - 0.5);
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
      </div>
    );
  } else {
    return <Loader />;
  }
};
