import { AppModule as DeepkitModule, createModule } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';

export class AppModule extends createModule({}) {
  override imports: DeepkitModule<any, any>[] = [new FrameworkModule()];
}
