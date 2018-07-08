import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgModule, Directive, Input, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent, setAngularLib, downgradeComponent, UpgradeModule } from '@angular/upgrade/static';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as angular from 'angular';
import { ChildComponent } from './child/child.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';



setAngularLib(angular);


angular.module('testModule', []).component('ngjsDirective', {
  template: '{{ctrl.firstName}}',
  bindings: {
    firstName: '='
  },
  controllerAs: 'ctrl',
  controller: ['$scope', function ($scope) {

  }]
});



@Directive({ selector: 'ngjs-directive' })
export class NgjsDirective extends UpgradeComponent {
  @Input() firstName: string;


  constructor(elementRef: ElementRef, injector: Injector) {
    super('ngjsDirective', elementRef, injector);
  }
}




export const ng1MainModule = angular.module('ng1MainModule', ['testModule']).directive(
  AppComponent.selector,
  downgradeComponent({
    component: AppComponent
  })
);



@NgModule({
  declarations: [
    AppComponent,
    NgjsDirective,
    ChildComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  entryComponents: [AppComponent, DialogComponent],
  exports: [NgjsDirective],
  providers: []//,
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {
  }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [ng1MainModule.name], { strictDi: true });
  }
}

