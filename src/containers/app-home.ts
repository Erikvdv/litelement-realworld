import { html, customElement, property } from "lit-element";
import { PageViewElement } from "../components/page-view-element";
import "../components/home/home-banner";
import "../components/home/home-tags";
import "../components/home/home-feed-navigation";
import '../components/articles/app-article-list';
import { fetchTags } from '../actions/home';
import { fetchArticleList } from '../actions/article-list'
import { store, RootState } from '../store';
import home, { homeSelector, HomeState } from "../reducers/home";
import { connect } from "pwa-helpers/connect-mixin";
import articleList, { ArticleListState, articleListSelector } from "../reducers/article-list";
import { Article } from "../models/article.model";


store.addReducers({
  home,
  articleList
});

@customElement("app-home")
export class AppHome extends connect(store)(PageViewElement) {

  @property({ type: Array })tags: string[] = [];
  @property({ type: Boolean })tagsIsLoading: boolean = false;
  @property({ type: Array }) articleList: Article[] = [];

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`    
        <div class="home-page">
          <home-banner token="testtoken" appName="conduit"></home-banner>
          <div class="container page">
            <div class="row">
              <div class="col-md-9">
                <home-feed-navigation></home-feed-navigation>
                <app-article-list .articleList=${this.articleList}></app-article-list>
              </div>
              <div class="col-md-3">
                <div class="sidebar">
                  <home-tags .tags=${this.tags} .isLoading=${this.tagsIsLoading}></home-tags>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    `;
  }

  // Tags = (tags: string[], isLoading: boolean) => {
  //   if (isLoading) {
  //     return html`
  //       <div class="tag-list">
  //         <div>Loading tags...</div>
  //       </div>
  //     `;
  //   } else if (tags.length === 0){
  //     return html`
  //       <div class="tag-list">
  //         <div>No tags are here... yet.</div>
  //       </div>
  //     `;
  //   } else {
  //     return html`
  //       <div class="tag-list">
  //         ${tags!.map(tag => {
  //           return html`
  //               <a href="" class="tag-default tag-pill">
  //                 ${tag}
  //               </a>
  //             `;
  //           })}
  //       </div>
  //     `;
  //   }
    
  // }

  stateChanged(state: RootState) {
    const homeState: HomeState | undefined = homeSelector(state);
    (homeState!.tags !== undefined) ? this.tags = homeState!.tags : this.tags = [];
    homeState!.isFetching ? this.tagsIsLoading = true : this.tagsIsLoading = false;

    const articleListState: ArticleListState | undefined = articleListSelector(state);
    (articleListState!.articleList !== undefined) ? this.articleList = articleListState!.articleList : this.articleList = []
    
  }
}

export { fetchTags, fetchArticleList }
