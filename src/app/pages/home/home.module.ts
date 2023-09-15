import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from './home.component';
import { RouterModule, Routes } from '@angular/router';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzCardModule} from "ng-zorro-antd/card";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {NzButtonModule} from "ng-zorro-antd/button";
import {AUTOMATIONS_SERVICE_TOKEN} from "../../services/automations/automations.service.token";
import {AutomationsService} from "../../services/automations/automations.service";
import {NzUploadModule} from "ng-zorro-antd/upload";
import { AutomationsFormComponent } from './modals/automations-form/automations-form.component';
import {USER_SERVICE_TOKEN} from "../../services/user/user.service.token";
import {UserService} from "../../services/user/user.service";

const routes: Routes = [
  { path: '', component: HomeComponent },
];
@NgModule({
  declarations: [HomeComponent, AutomationsFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NzLayoutModule,
        NzDropDownModule,
        NzIconModule,
        NzCardModule,
        DragDropModule,
        NgOptimizedImage,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        FormsModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzUploadModule,
    ],
  exports: [HomeComponent],
  providers: [
    {provide: AUTOMATIONS_SERVICE_TOKEN, useClass: AutomationsService},
      {provide: USER_SERVICE_TOKEN, useClass: UserService}
  ]
})
export class HomeModule {
}
