import React, { useState, useCallback, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewArticleTitle,
  deleteCurrentArticle,
  openModal,
  setAgreeForRestore,
  closenModal
} from "../../redux/actions/articlesActions";

import "./styles.scss";

const Article = ({ article, index, rowIndex }) => {
  const dispatch = useDispatch();
  const [activeTitleInput, setActiveTitleInput] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [deleteArticleId, setDeleteArticleId] = useState("");
  const [restoreArticleIndex, setRestoreArticleIndex] = useState("");
  const [rowForRestoreArticle, setRowForRestoreArticle] = useState("");
  const [restoreArticle, setRestoreArticle] = useState(null);
  const articleDataFromStore = useSelector(state => state.articles);
  const { restoreArticleData } = articleDataFromStore;

  const saveArticleTitle = () => ({ target }) => {
    const { value } = target;
    setArticleTitle(value);
  };

  const setActiveInput = () => {
    setActiveTitleInput(prev => !prev);
  };

  const setSaveNewTitle = useCallback(
    (id, articleTitle) => {
      setActiveTitleInput(false);
      dispatch(setNewArticleTitle(id, articleTitle));
    },
    [dispatch]
  );

  const handleDeleteArticle = useCallback(
    (id, index, article) => {
      setRowForRestoreArticle(rowIndex);
      setDeleteArticleId(id);
      setRestoreArticleIndex(index);
      setRestoreArticle(article);
    },
    [rowIndex]
  );

  useEffect(() => {
    if (deleteArticleId) {
      dispatch(
        setAgreeForRestore(
          restoreArticleIndex,
          restoreArticle,
          rowForRestoreArticle
        )
      );
      dispatch(openModal());
      dispatch(deleteCurrentArticle(deleteArticleId));
    }
  }, [
    deleteArticleId,
    dispatch,
    restoreArticle,
    restoreArticleIndex,
    rowForRestoreArticle
  ]);

  useEffect(() => {
    let closeDialog;
    if (restoreArticleData) {
      closeDialog = setTimeout(() => {
        dispatch(closenModal());
      }, 3000);
    }

    return () => {
      clearTimeout(closeDialog);
    };
  }, [deleteArticleId, dispatch, restoreArticleData]);

  const showEachArticle = useCallback(() => {
    const { id, width, title, imageUrl, url } = article;
    return (
      <Grid className="article-container" item xl={width} md={width}>
        <div className="article-wrapper">
          <div className="article-title">
            {!activeTitleInput ? (
              <span className="title">{title}</span>
            ) : (
              <input
                className="title-input"
                name="title"
                type="text"
                defaultValue={title}
                onChange={saveArticleTitle()}
                placeholder="Please type article title"
              />
            )}
          </div>
          <a
            target="_blank"
            href={url}
            className="article-image"
            style={{
              backgroundImage: `url(${imageUrl}&width=${1280}&height=${720})`
            }}
          ></a>
          <div className="article-buttons-group">
            <Button
              className="button title-edit-button"
              variant="contained"
              color="primary"
              onClick={setActiveInput}
            >
              Edit
            </Button>
            <Button
              className="button title-save-button"
              variant="contained"
              color="default"
              disabled={!activeTitleInput}
              onClick={() => setSaveNewTitle(id, articleTitle)}
            >
              Save
            </Button>
            <Button
              className="button delete-article-button"
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteArticle(id, index, article)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Grid>
    );
  }, [
    activeTitleInput,
    article,
    articleTitle,
    handleDeleteArticle,
    index,
    setSaveNewTitle
  ]);

  return <>{showEachArticle()}</>;
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default Article;
