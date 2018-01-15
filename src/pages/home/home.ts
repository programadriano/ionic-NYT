import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NytApiProvider } from "../../providers/nyt-api/nyt-api";
import { NewsModel } from "../..//models/news-model";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  data: any;
  news: NewsModel[] = [];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(public navCtrl: NavController, private nyt: NytApiProvider) {
    this.getTopStories();
  }

  getTopStories() {
    this.nyt.getTopStories(this.page).subscribe(res => {
      this.data = res;

      for (let i = 0; i <= 10; i++) {
        let n = new NewsModel(
          this.data.results[i].title,
          this.data.results[i].published_date
        );
        this.news.push(n);
      }

      this.perPage = 10;
      this.totalData = this.data.num_results;
      this.totalPage = 10;
    }, error => (this.errorMessage = <any>error));
  }

  doInfinite(infiniteScroll) {
    this.totalPage = this.page * 10;
    setTimeout(() => {
      let result = this.data.results.slice(this.page * 10);

      for (let i = 1; i <= this.perPage; i++) {
        if (result[i] != undefined) {
          
          let n = new NewsModel(result[i].title, result[i].published_date);
          this.news.push(n);
        }
      }

      this.page += 1;

      infiniteScroll.complete();
    }, 2000);
  }
}

