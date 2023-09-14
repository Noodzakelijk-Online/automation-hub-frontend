import { InjectionToken } from '@angular/core';
import {IAutomationsService} from "../automations.service.interface";

export const AUTOMATIONS_SERVICE_TOKEN = new InjectionToken<IAutomationsService>('AUTOMATIONS_SERVICE_TOKEN');
