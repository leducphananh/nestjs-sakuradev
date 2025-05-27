import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Property } from '../entities/property.entity';
import { PropertyFeature } from '../entities/propertyFeature.entity';
import { PropertyType } from '../entities/propertyType.entity';
import { User } from '../entities/user.entity';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const propertyTypeRepository = dataSource.getRepository(PropertyType);

    console.log('Seeding property types...');
    const propertyTypes = await propertyTypeRepository.save([
      { value: 'Apartment' },
      { value: 'Condo' },
    ]);

    const userFactory = factoryManager.get(User);
    console.log('Seeding users...');
    const users = await userFactory.saveMany(10);

    console.log('Seeding properties...');
    const propertyFactory = factoryManager.get(Property);
    const propertyFeatureFactory = factoryManager.get(PropertyFeature);
    const properties = await Promise.all(
      Array.from({ length: 50 }).map(async () => {
        const property = await propertyFactory.make({
          user: faker.helpers.arrayElement(users),
          type: faker.helpers.arrayElement(propertyTypes),
          propertyFeature: await propertyFeatureFactory.save(),
        });
        return property;
      }),
    );

    const propertyRepository = dataSource.getRepository(Property);
    await propertyRepository.save(properties);
  }
}
