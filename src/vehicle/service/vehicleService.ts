/**
 * Created by bartoszlach on 06.05.2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class VehicleService {
  constructor(private http: Http) {
  }

  public getVehicle(url: string) {
    return this.http.get(url);
  }
}
