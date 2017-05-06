import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ServiceSettings} from "../../common/service/serviceSettings";
/**
 * Created by bartoszlach on 06.05.2017.
 */
@Injectable()
export class PersonService {
  private readonly PERSON_PATH = "people/";

  constructor(private http: Http) {
  }

  public loadPerson(id: number) {
    let requestUrl = ServiceSettings.SW_API_PATH + this.PERSON_PATH + id;
    return this.http.get(requestUrl);
  }

  public getPersonsCount() {
    let requestUrl = ServiceSettings.SW_API_PATH + this.PERSON_PATH;
    return this.http.get(requestUrl);
  }
}
