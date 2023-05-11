import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';


import { TypographyComponent } from '../../page/typography/typography.component';
import { IconsComponent } from '../../page/icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { TableListComponent } from '../../page/table-list/table-list.component';
import { UserProfileComponent } from 'app/page/user-profile/user-profile.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'  

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule

    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent
  ]
})

export class AdminLayoutModule {}
