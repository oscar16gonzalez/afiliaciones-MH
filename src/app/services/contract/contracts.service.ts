import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  WEB_URL: string = environment.serverUrl;


  constructor(private http: HttpClient) {
  }

  getProjects() {
    return this.http.get(this.WEB_URL + '/proyectos');
  }

  getProjectsId(id: string) {
    return this.http.get(this.WEB_URL + '/proyectos/' + id);
  }

  postProjects(dataProject) {
    console.log(dataProject);

    return this.http.post(this.WEB_URL + '/proyectos/', dataProject);
  }

}
