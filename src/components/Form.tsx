import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Quiz } from "./quiz";
import { Loader } from "./loader";
interface category {
  name: string;
  id: number;
}

export const Form: React.FC<any> = () => {
  const category_api = "https://opentdb.com/api_category.php";

  const [answer, setAnswer] = useState<number>(10);
  const [category, setCategory] = useState<any[]>([]);
  const [getCategory, setGetCategory] = useState<number>(9);
  const [getDif, setGetDif] = useState<string>("");
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
  const handleDifChange = (e: any): void => {
    setGetDif(e.target.value);
  };
  if (category.length > 0) {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
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
                <select onChange={handleDifChange}>
                  <option value="any difficulty">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">hard</option>
                </select>
                <Link to="/quiz">
                  <button className="form-button">generate questions</button>
                </Link>
              </form>
            </div>
          </Route>
          <Route path="/quiz">
            <Quiz amount={answer} category={getCategory} difficulty={getDif} />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return <Loader />;
  }
};
