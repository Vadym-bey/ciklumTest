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
import uuid from "react-uuid";

const initialState = {
  success: false,
  isLoading: false,
  hasError: false,
  articles: null,
  filtered: null,
  openDialog: false,
  restoreArticleData: null
};

export default (state = initialState, action) => {
  const { type, articlesData, id, payload, index, rowIndex } = action;
  switch (type) {
    case GET_ARTICLES_REQUEST:
      return {
        ...state,
        hasError: false,
        isLoading: true
      };
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        success: true,
        articles:
          articlesData &&
          articlesData[0].map(article =>
            article.columns.map(article => {
              return {
                ...article,
                id: uuid()
              };
            })
          )
      };
    case GET_ARTICLES_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        success: false
      };
    case SET_NEW_ARTICLE_TITLE:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.map(item => {
            if (item.id === id && payload.length > 0) {
              return {
                ...item,
                title: payload
              };
            }
            return item;
          })
        )
      };
    case DELETE_CURRENT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.filter(item => item.id !== id)
        )
      };
    case RESTORE_CURRENT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((article, indexOfRow) => {
          const { index, payload, rowIndex } = state.restoreArticleData;
          if (indexOfRow === rowIndex) {
            return [
              ...article.slice(0, index),
              payload,
              ...article.slice(index)
            ];
          }
          return article;
        })
      };
    case OPEN_DIALOG_WINDOW:
      return {
        ...state,
        openDialog: true,
      };
    case CLOSE_DIALOG_WINDOW:
      return {
        ...state,
        openDialog: false
      };
    case AGREE_FOR_RESTORE:
      return {
        ...state,
        restoreArticleData: { index, payload, rowIndex }
      };
    default:
      return state;
  }
};
