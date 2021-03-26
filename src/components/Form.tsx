import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

interface category {
  name: string;
  id: number;
}

export const Form: React.FC<any> = () => {
  //   const Api =
  //     "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

  const category_api = "https://opentdb.com/api_category.php";

  const [answer, setAnswer] = useState<number>(10);
  const [category, setCategory] = useState([]);
  const [getCategory, setGetCategory] = useState<number | undefined>(undefined);
  const fetchApi = (): void => {
    axios
      .get(category_api)
      .then((res: any) => {
        // console.log(res);
        setCategory(res.data.trivia_categories);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleAnswer = (e: any): void => {
    setAnswer(e.target.value);
  };
  const handleCategoryChange = (e: any): void => {
    setGetCategory(e.target.value);
  };
  console.log(getCategory);
  if (category.length > 0) {
    return (
      <div className="form-container">
        <form>
          <label>number of question:</label>
          <input value={answer} onChange={handleAnswer} type="number" />
          <label htmlFor="category">category:</label>
          <select id="category" onChange={handleCategoryChange}>
            {category.map((category: category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="difficulty">Difficulty</label>
          <select>
            <option value="any difficulty">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">hard</option>
          </select>
          <button className="form-button">generate questions</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="loader-wrapper">
        <span className="loader">
          <span className="loader-inner"></span>
        </span>
      </div>
    );
  }
};
