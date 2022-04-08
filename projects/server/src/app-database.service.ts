import { Database } from '@deepkit/orm';
import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';

export class AppDatabase extends Database {
  constructor() {
    super(new SQLiteDatabaseAdapter(':memory:'));
  }
}
