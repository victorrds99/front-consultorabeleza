import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { appConfig } from './app/app.config';

Amplify.configure(awsconfig);

bootstrapApplication(AppComponent, appConfig);
