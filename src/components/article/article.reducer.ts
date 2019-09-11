import * as articleActions from './article.actions';
import { ActionType, getType } from 'typesafe-actions';
import { RequestStatus } from '../../models/request-status.model';
import { Article, Comment } from '../../models';

type ArticleAction = ActionType<typeof articleActions>;

export interface ArticleState {
  selectedArticle?: Article;
  fetchArticleStatus: RequestStatus;
  deleteArticleStatus: RequestStatus;
  comments: Comment[];
  fetchCommentsStatus: RequestStatus;
  addCommentStatus: RequestStatus;
  deleteCommentStatus: RequestStatus;
}

const initialState: ArticleState = {
  fetchArticleStatus: RequestStatus.notStarted,
  deleteArticleStatus: RequestStatus.notStarted,
  fetchCommentsStatus: RequestStatus.notStarted,
  comments: [],
  addCommentStatus: RequestStatus.notStarted,
  deleteCommentStatus: RequestStatus.notStarted,
};

export default (state: ArticleState = initialState, action: ArticleAction) => {
  switch (action.type) {
    case getType(articleActions.fetchArticle.request):
      return {
        ...initialState,
        fetchArticleStatus: RequestStatus.fetching,
      };
    case getType(articleActions.fetchArticle.failure):
      return {
        ...state,
        fetchArticleStatus: RequestStatus.failed,
      };
    case getType(articleActions.fetchArticle.success):
      return {
        ...state,
        fetchArticleStatus: RequestStatus.completed,
        selectedArticle: action.payload,
      };
    case getType(articleActions.deleteArticle.request):
      return {
        ...state,
        deleteArticleStatus: RequestStatus.fetching,
      };
    case getType(articleActions.deleteArticle.failure):
      return {
        ...state,
        deleteArticleStatus: RequestStatus.failed,
      };
    case getType(articleActions.deleteArticle.success):
      return {
        ...state,
        deleteArticleStatus: RequestStatus.completed,
        selectedArticle: undefined,
      };
    case getType(articleActions.fetchComments.request):
      return {
        ...state,
        fetchCommentsStatus: RequestStatus.fetching,
      };
    case getType(articleActions.fetchComments.failure):
      return {
        ...state,
        fetchCommentsStatus: RequestStatus.failed,
      };
    case getType(articleActions.fetchComments.success):
      return {
        ...state,
        fetchCommentsStatus: RequestStatus.completed,
        comments: (action.payload as unknown) as Comment[],
      };
    case getType(articleActions.deleteComment.request):
      return {
        ...state,
        deleteCommentStatus: RequestStatus.fetching,
      };
    case getType(articleActions.deleteComment.failure):
      return {
        ...state,
        deleteCommentStatus: RequestStatus.failed,
      };
    case getType(articleActions.deleteComment.success):
      return {
        ...state,
        deleteCommentStatus: RequestStatus.completed,
        comments: state.comments.filter(comment => {
          if (comment.id === action.payload) {
            return;
          } else {
            return comment;
          }
        }),
      };
    case getType(articleActions.addComment.request):
      return {
        ...state,
        addCommentStatus: RequestStatus.fetching,
      };
    case getType(articleActions.addComment.failure):
      return {
        ...state,
        addCommentStatus: RequestStatus.failed,
      };
    case getType(articleActions.addComment.success):
      return {
        ...state,
        addCommentStatus: RequestStatus.completed,
        comments: [(action.payload as unknown) as Comment, ...state.comments],
      };
    default:
      return state;
  }
};
