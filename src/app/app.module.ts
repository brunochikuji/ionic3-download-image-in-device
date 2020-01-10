import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Downloader } from '@ionic-native/downloader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FileTransfer }     from '@ionic-native/file-transfer';
import { File }                                 from '@ionic-native/file';
import { PhotoLibrary }                         from '@ionic-native/photo-library';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    PhotoLibrary,
    Downloader,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
