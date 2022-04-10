import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { RoleComponent } from '@pages/role/role.component';
import { UsersComponent } from '@modules/users/users.component';
import { AccessComponent } from '@pages/access/access.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                data:{
                    breadcrumb:'Profile'
                }
            },
            {
                path: '500',
                component: AccessComponent,
                data:{
                    breadcrumb:'Access Denied'
                }
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent,
                data:{
                    breadcrumb:'Profile'
                }
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent,
                data:{
                    breadcrumb:'Profile'
                }
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                data:{
                    breadcrumb:'Dashboard'
                }
            },
            { 
                path: 'Admin/masters', 
                loadChildren: () => import('./modules/masters/masters.module').then(m => m.MastersModule) 
            },
            { 
                path: 'Admin/channel', 
                loadChildren: () => import('./modules/channel/channel.module').then(m => m.ChannelModule) 
            },
            { 
                path: 'Admin/inhouse', 
                loadChildren: () => import('./modules/inhouse/inhouse.module').then(m => m.InhouseModule) 
            },
            { 
                path: 'Admin/loan', 
                loadChildren: () => import('./modules/loan/loan.module').then(m => m.LoanModule) 
            },
            { 
                path: 'Admin/reports', 
                loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule) 
            },
            { 
                path: 'Admin/payment', 
                loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule) 
            },
            {
                path: 'users',
                data:{
                    breadcrumb:'Users',
                    code:'user'
                },
                children:[
                    {
                        path: 'list',
                        component: UsersComponent,
                        data:{
                            breadcrumb:'User List',
                            code:'v_user'
                        }
                    },
                    {
                        path: 'role',
                        component: RoleComponent,
                        data:{
                            breadcrumb:'Role',
                            code:'role'
                        }
                    }
                ]
            } 
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
