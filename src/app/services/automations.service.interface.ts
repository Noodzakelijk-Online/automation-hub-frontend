import {IAutomationModel} from "../models/automation.model.interface";
import {Observable} from "rxjs";
export interface IAutomationsService {
  getAutomations(): Observable<IAutomationModel[]>;
  getAutomation(id: number): Observable<IAutomationModel>;
  addAutomation(automation: IAutomationModel): Observable<IAutomationModel>;
  updateAutomation(automation: IAutomationModel): Observable<IAutomationModel>;
  deleteAutomation(id: number): Observable<void>;
  swapAutomations(automation_id1: number, automation_id2: number): Observable<void>;
}

