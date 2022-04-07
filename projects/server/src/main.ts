import { App } from '@deepkit/app';

import { AppModule } from './app.module';

App.fromModule(new AppModule()).run();
