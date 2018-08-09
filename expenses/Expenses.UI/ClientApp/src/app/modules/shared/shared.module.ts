import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../../../../node_modules/@angular/common';
import { AuthenticationInterceptor } from './interceptors/http/authentication-interceptor';

@NgModule({
  providers: [
    HttpClientModule,
    CommonModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    ReactiveFormsModule
  ],
  exports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class SharedModule {}
