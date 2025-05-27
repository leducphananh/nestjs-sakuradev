import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import dbConfig from '../config/db.config';
import { MainSeeder } from './main.seeder';
import { PropertyFactory } from './property.factory';
import { PropertyFeatureFactory } from './propertyFeature.factory';
import { UserFactory } from './user.factory';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [PropertyFeatureFactory, PropertyFactory, UserFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });
