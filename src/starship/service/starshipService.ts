/**
 * Created by bartoszlach on 06.05.2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class StarshipService {
  constructor(private http: Http) {
  }

  public getStarship(url: string) {
    return this.http.get(url);
  }
}
