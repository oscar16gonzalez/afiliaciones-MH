import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http: HttpClient) {
  }

  getProjects() {
    return this.http.get('http://localhost:3000/proyectos');
  }

  getProjectsId(id: string) {
    return this.http.get('http://localhost:3000/proyectos/' + id);
  }

  postProjects(dataProject) {
    console.log(dataProject);

    return this.http.post('http://localhost:3000/proyectos/', dataProject);
  }

}
