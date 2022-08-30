import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';

import { TypographyComponent } from '../../page/typography/typography.component';
import { IconsComponent } from '../../page/icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { TableListComponent } from 'app/page/table-list/table-list.component';
import { UserProfileComponent } from 'app/page/user-profile/user-profile.component';
import { CreateMembershipComponent } from 'app/page/create-membership/create-membership.component';
import { ListUserSystemComponent } from '../../page/list-user-system/list-user-system.component';
import { LoginComponent } from '../../page/login/login.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { GuardGuard } from '../../guard.guard';
import { UserGuardGuard } from 'app/user-guard.guard';
import { ListUserAttendanceComponent } from 'app/page/list-user-attendance/list-user-attendance.component';
import { PayrollSettingsComponent } from '../../page/payroll-settings/payroll-settings.component';



const newLocal = './layouts/admin-layout/admin-layout.module';
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'user-profile',     component:  UserProfileComponent},
    { path: 'user-attendance',     component:  ListUserAttendanceComponent},
    { path: 'payroll-settings',     component:  PayrollSettingsComponent},
    { path: 'table-list',       component:  TableListComponent},
    { path: 'icons',            component: IconsComponent },
    // { path: 'maps',             component: MapsComponent },
    { path: 'notifications',    component: NotificationsComponent },
    // { path: 'upgrade',          component: UpgradeComponent },
    { path: 'dashboard',        component: DashboardComponent },
    { path: 'create-membership',component: CreateMembershipComponent, canActivate: [UserGuardGuard] },
    { path: 'list-user-system',component: ListUserSystemComponent, canActivate: [GuardGuard] },
    { path: 'login',component: LoginComponent, canActivate: [GuardGuard]},
    
    
];
