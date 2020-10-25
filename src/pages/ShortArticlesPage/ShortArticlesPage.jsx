import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Loader from "../../components/Loader/Loader";
import { articlesDataRequest } from "../../redux/actions/articlesActions";
import uuid from "react-uuid";

import "./styles.scss";

const ShortArticlesPage = () => {
  const dispatch = useDispatch();
  const articlesData = useSelector(state => state.articles);
  const { isLoading, articles } = articlesData;

  useEffect(() => {
    dispatch(articlesDataRequest());
  }, [dispatch]);

  const showArticles = useCallback(() => {
    if (!articles) {
      return;
    }

    return articles.map(row =>
      row.map(article => (
        <div key={uuid()} className="article-title-wrapper">
          <span className="article-title">{article.title}</span>
        </div>
      ))
    );
  }, [articles]);

  return (
    <div className="container">
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <Grid className="articles-container" container>{showArticles()}</Grid>
      )}
    </div>
  );
};

export default ShortArticlesPage;
