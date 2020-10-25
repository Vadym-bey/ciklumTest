import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
  SET_NEW_ARTICLE_TITLE,
  DELETE_CURRENT_ARTICLE,
  RESTORE_CURRENT_ARTICLE,
  OPEN_DIALOG_WINDOW,
  CLOSE_DIALOG_WINDOW,
  AGREE_FOR_RESTORE
} from "../constants/index";
import { articlesApi } from "../../helpers/api";

export const articlesDataRequest = () => {
  return async dispatch => {
    dispatch({ type: GET_ARTICLES_REQUEST });

    let articlesData = null;

    try {
      const response = await fetch(articlesApi);
      const result = await response.json();
      articlesData = result;
    } catch (error) {
      console.error("Error fetching article data from the server", error);
    }

    if (!articlesData) {
      return dispatch({ type: GET_ARTICLES_ERROR });
    }

    return dispatch({
      type: GET_ARTICLES_SUCCESS,
      articlesData
    });
  };
};

export const setNewArticleTitle = (id, payload) => {
  return ({
    type: SET_NEW_ARTICLE_TITLE,
    id,
    payload
  })
};

export const deleteCurrentArticle = (id) => {
  return ({
    type: DELETE_CURRENT_ARTICLE,
    id
  })
};

export const restoreCurrentArticle = () => ({
  type: RESTORE_CURRENT_ARTICLE,
})

export const openModal = () => ({
  type: OPEN_DIALOG_WINDOW
});

export const closenModal = () => ({
  type: CLOSE_DIALOG_WINDOW
});

export const setAgreeForRestore = (index, payload, rowIndex) => {
  return ({
    type: AGREE_FOR_RESTORE,
    index,
    payload,
    rowIndex
  })
}