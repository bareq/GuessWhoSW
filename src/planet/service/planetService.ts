import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class PlanetService {
  constructor(private http: Http) {
  }

  public getPlanet(url: string) {
    return this.http.get(url);
  }
}
