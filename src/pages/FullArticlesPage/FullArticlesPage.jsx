import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Article from "../../components/Article/Article";
import Loader from "../../components/Loader/Loader";
import { articlesDataRequest } from "../../redux/actions/articlesActions";
import uuid from "react-uuid";
import Modal from "../../components/Modal/Modal";

import "./styles.scss";

const FullArticlesPage = () => {
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

    return articles.map((row, rowIndex) =>
      row.map((article, index) => (
        <Article
          key={uuid()}
          article={article}
          index={index}
          rowIndex={rowIndex}
        />
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
        <Grid className="articles-wrapper" container>
          <>{showArticles()}</>
        </Grid>
      )}
      <Modal />
    </div>
  );
};

export default FullArticlesPage;
