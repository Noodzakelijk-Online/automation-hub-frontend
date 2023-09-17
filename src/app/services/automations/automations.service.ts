import {Injectable} from '@angular/core';
import {IAutomationsService} from '../automations.service.interface';
import {IAutomationModel} from "../../models/automation.model.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AutomationsService implements IAutomationsService {
  private apiUrl = '/api/v1/automation';

  constructor(private http: HttpClient) {
  }

  getAutomations(): Observable<IAutomationModel[]> {
    return this.http.get<IAutomationModel[]>(`${this.apiUrl}/`);
  }

  addAutomation(automation: IAutomationModel): Observable<IAutomationModel> {
    console.log('sending in service frontend: ', automation)
    return this.http.post<IAutomationModel>(`${this.apiUrl}/`, automation);
  }

  deleteAutomation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAutomation(id: string): Observable<IAutomationModel> {
    return this.http.get<IAutomationModel>(`${this.apiUrl}/${id}`);
  }

  updateAutomation(automation: IAutomationModel): Observable<IAutomationModel> {
    console.log('sending: ', automation)
    return this.http.patch<IAutomationModel>(`${this.apiUrl}/`, automation);
  }

  swapAutomations(automation_id1: string, automation_id2: string): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/swap/${automation_id1}/${automation_id2}`);
  }

}
