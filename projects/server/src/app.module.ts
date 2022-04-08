import { AppModule as DeepkitModule, createModule } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { ProviderWithScope } from '@deepkit/injector';

import { AppDatabase } from './app-database.service';

export class AppModule extends createModule({}) {
  override imports: DeepkitModule<any, any>[] = [new FrameworkModule()];
  override providers: ProviderWithScope<any>[] = [AppDatabase];
}
