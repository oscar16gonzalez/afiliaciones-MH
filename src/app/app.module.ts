import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { ModalCreateProjectComponent } from './modals/modal-create-project/modal-create-project.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ListUserSystemComponent } from './page/list-user-system/list-user-system.component';
import { CreateMembershipComponent } from 'app/page/create-membership/create-membership.component';
import { ModalInfoMembershipComponent } from './modals/modal-info-membership/modal-info-membership.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoginComponent } from './page/login/login.component';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ListUserAttendanceComponent } from './page/list-user-attendance/list-user-attendance.component';
import { PayrollSettingsComponent } from './page/payroll-settings/payroll-settings.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { InfoProjectsComponent } from './page/info-projects/info-projects/info-projects.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableListComponent } from './page/table-list/table-list.component';

import {ScrollingModule} from '@angular/cdk/scrolling';

import { ModalConfirmComponent } from './modals/modal-comfirm/modal-confirm/modal-confirm.component';
import { CreateUserComponent } from './modals/create-user/create-user.component';



import { QRCodeModule } from 'angularx-qrcode';
import { AssistanceComponent } from './assistance/assistance.component';



@NgModule({
  imports: [
    QRCodeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatCardModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    ScrollingModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CreateMembershipComponent,
    ModalCreateProjectComponent,
    ListUserSystemComponent,
    ModalInfoMembershipComponent,
    LoginComponent,
    ListUserAttendanceComponent,
    PayrollSettingsComponent,
    InfoProjectsComponent,
    ModalConfirmComponent,
    CreateUserComponent,
    AssistanceComponent
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
