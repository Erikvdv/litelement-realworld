import { IArticleView } from './article.container';

export interface ITestPresenter<V> {
  view: V;
  processSetLike(articleSlug: string): void;
  showLike(): void;
}

export class TestPresenter implements ITestPresenter<IArticleView> {
  view: IArticleView;
  constructor(view: IArticleView) {
    this.view = view;
  }

  processSetLike(articleSlug: string): void {
    console.log('processing set like in presenter: ' + articleSlug);
    this.view.confirmLike();
    this.view.isLiked = !this.view.isLiked;
  }
  showLike(): void {
    throw new Error('Method not implemented.');
  }
}

// export interface IBaseView {}

// export interface IBasePresenter<T> {
//   view: T;
// }

// export class BasePresenter implements IBasePresenter<IBaseView> {
//   view: IBaseView;
//   constructor(view: IBaseView) {
//     this.view = view;
//   }
// }
