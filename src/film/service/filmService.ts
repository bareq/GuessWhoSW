/**
 * Created by bartoszlach on 06.05.2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class FilmService {
  constructor(private http: Http) {
  }

  public getFilm(url: string) {
    return this.http.get(url);
  }
}
