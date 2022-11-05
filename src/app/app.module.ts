import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard/auth-guard';
import { ToastifyComponent } from './shared/component/toastify/toastify.component';
import { AuthInterceptorProviders } from './shared/helpers/auth.interceptor';

@NgModule({
  declarations: [AppComponent, ToastifyComponent],
  imports: [
    AngularToastifyModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, ToastService, AuthInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
