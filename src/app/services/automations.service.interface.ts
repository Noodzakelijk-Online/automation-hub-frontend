import {IAutomationModel} from "../models/automation.model.interface";
import {Observable} from "rxjs";
export interface IAutomationsService {
  getAutomations(): Observable<IAutomationModel[]>;
  getAutomation(id: string): Observable<IAutomationModel>;
  addAutomation(automation: IAutomationModel): Observable<IAutomationModel>;
  updateAutomation(automation: IAutomationModel): Observable<IAutomationModel>;
  deleteAutomation(id: string): Observable<void>;
  swapAutomations(automation_id1: string, automation_id2: string): Observable<void>;
}

