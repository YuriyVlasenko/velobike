import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LocalStorageModule } from 'angular-2-local-storage';

import { TreeModule } from 'angular-tree-component';

import CategoriesManagerService from './Services/entityManagers/categories-manager.service';
import ParameterManagerService from './Services/entityManagers/parameter-manager.service';
import ProductManagerService from './Services/entityManagers/product-manager.service';
import ProductParametersManagerService from './Services/entityManagers/product-parameters-manager.service';
import ValueTypeManagerService from './Services/entityManagers/value-type-manager.service';
import ContactInformationService from './Services/entityManagers/contact-information.service';
import EntityDataProviderService from './Services/entity-data-provider.service';
import UsersManagerService from './Services/entityManagers/users-manager.service';
import AuthService from './Services/auth.service';
import AuthGuard from './Services/guards/auth.guard';
import UIEventsService from './Services/ui-events.service';

import { CategoriesListComponent } from './components/content/categories-list/categories-list.component';
import { CategoriesListItemComponent } from './components/content/categories-list-item/categories-list-item.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { MenuBarComponent } from './components/header/menu-bar/menu-bar.component';
import { SearchBarComponent } from './components/header/search-bar/search-bar.component';
import { AppHeaderComponent } from './components/header/app-header/app-header.component';
import { AppContentComponent } from './components/content/app-content/app-content.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { SitePanelComponent } from './components/site-panel/site-panel.component';
import { MainPageComponent } from './components/content/main-page/main-page.component';
import { DeliveryPageComponent } from './components/content/delivery-page/delivery-page.component';
import { ProductListItemComponent } from './components/content/product-list-item/product-list-item.component';
import { ProductDetailComponent } from './components/content/product-detail/product-detail.component';
import { ProductPictureComponent } from './components/common/product-picture/product-picture.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { EntityTypeListComponent } from './components/admin/entity-type-list/entity-type-list.component';
import { EntityItemsListComponent } from './components/admin/entity-items-list/entity-items-list.component';
import { EntityEditorComponent } from './components/admin/entity-editor/entity-editor.component';
import { DisplayNamePipe } from './pipes/display-name.pipe';
 
const appRoutes: Routes = [
  { path: 'admin', 
      component: AdminPanelComponent ,
      canActivate: [AuthGuard],
      
      children: [
        {
          path:'',
          component: EntityItemsListComponent
        },
        {
          path:':entityType',
          component: EntityItemsListComponent
        },
        {
          path: ':entityType/:entityId',
          component: EntityEditorComponent
        }
      ]
  },
  { path: 'signin', component: SignInComponent }, 
  {
    path: '',
    component: SitePanelComponent,
    children: [
      {
        path: 'delivery',
        component: DeliveryPageComponent
      },
      {
        path: ':category/:id',
        component: MainPageComponent
      },
      {
        path: ':category',
        component: MainPageComponent
      },
      {
        path: 'product/:id',
        component: MainPageComponent
      },
      {
        path: 'search/:expression',
        component: MainPageComponent
      }
    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesListComponent,
    CategoriesListItemComponent,
    LogoComponent,
    MenuBarComponent,
    SearchBarComponent,
    AppHeaderComponent,
    AppContentComponent,
    MainPageComponent,
    AdminPanelComponent,
    SitePanelComponent,
    DeliveryPageComponent,
    ProductListItemComponent,
    ProductDetailComponent,
    ProductPictureComponent,
    SignInComponent,
    EntityTypeListComponent,
    EntityItemsListComponent,
    EntityEditorComponent,
    DisplayNamePipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing:false }),
    BrowserModule,
    HttpModule,
    TreeModule,
    FormsModule,
    LocalStorageModule.withConfig({
      prefix: 'velobike',
      storageType: 'localStorage'
    })
  ],
  providers: [
    { provide: CategoriesManagerService, useClass: CategoriesManagerService },
    { provide: ParameterManagerService, useClass: ParameterManagerService },
    { provide: ProductManagerService, useClass: ProductManagerService },
    { provide: ProductParametersManagerService, useClass: ProductParametersManagerService },
    { provide: ValueTypeManagerService, useClass: ValueTypeManagerService },
    { provide: EntityDataProviderService, useClass: EntityDataProviderService },
    { provide: ContactInformationService, useClass: ContactInformationService },
    { provide: AuthService, useClass: AuthService },
    { provide: UsersManagerService, useClass: UsersManagerService },
    { provide: AuthGuard, useClass: AuthGuard },
    { provide: UIEventsService, useClass: UIEventsService }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
