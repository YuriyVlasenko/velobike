import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { TreeModule} from 'angular-tree-component';

import CategoriesManagerService from './Services/entityManagers/categories-manager.service';
import ParameterManagerService from './Services/entityManagers/parameter-manager.service';
import ProductManagerService from './Services/entityManagers/product-manager.service';
import ProductParametersManagerService from './Services/entityManagers/product-parameters-manager.service';
import ValueTypeManagerService from './Services/entityManagers/value-type-manager.service';
import EntityDataProviderService from './Services/entity-data-provider.service';

import { CategoriesListComponent } from './components/content/categories-list/categories-list.component';
import { CategoriesListItemComponent } from './components/content/categories-list-item/categories-list-item.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { MenuBarComponent } from './components/header/menu-bar/menu-bar.component';
import { SearchBarComponent } from './components/header/search-bar/search-bar.component';
import { WorkTimeComponent } from './components/header/work-time/work-time.component';
import { AppHeaderComponent } from './components/header/app-header/app-header.component';
import { AppContentComponent } from './components/content/app-content/app-content.component';
import { PhonesComponent } from './components/header/phones/phones.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { SitePanelComponent } from './components/site-panel/site-panel.component';
import { MainPageComponent } from './components/content/main-page/main-page.component';
import { DeliveryPageComponent } from './components/content/delivery-page/delivery-page.component';
import { ProductListItemComponent } from './components/content/product-list-item/product-list-item.component';
import { ProductDetailComponent } from './components/content/product-detail/product-detail.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminPanelComponent },
  {
    path: '',
    component: SitePanelComponent,
    children: [
      {
        path: ':category',
        component: MainPageComponent
      },
      {
        path: ':category/:id',
        component: MainPageComponent
      },
      {
        path: 'product/:id',
        component: MainPageComponent
      },
      {
        path: 'search/:expression',
        component: MainPageComponent
      },
      {
        path: 'delivery',
        component: DeliveryPageComponent
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
    WorkTimeComponent,
    AppHeaderComponent,
    AppContentComponent,
    PhonesComponent,
    MainPageComponent,
    AdminPanelComponent,
    SitePanelComponent,
    DeliveryPageComponent,
    ProductListItemComponent,
    ProductDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    HttpModule,
    TreeModule
  ],
  providers: [
    { provide: CategoriesManagerService, useClass: CategoriesManagerService },
    { provide: ParameterManagerService, useClass: ParameterManagerService },
    { provide: ProductManagerService, useClass: ProductManagerService },
    { provide: ProductParametersManagerService, useClass: ProductParametersManagerService },
    { provide: ValueTypeManagerService, useClass: ValueTypeManagerService },
    { provide: EntityDataProviderService, useClass: EntityDataProviderService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
