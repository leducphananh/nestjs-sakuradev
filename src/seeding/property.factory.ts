import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Property } from '../entities/property.entity';

export const PropertyFactory = setSeederFactory(Property, (faker: Faker) => {
  const property = new Property();
  property.name = faker.location.street();
  property.price = +faker.commerce.price({
    min: 100000,
    max: 1000000,
    dec: 2,
  });
  property.description = faker.lorem.sentence();

  return property;
});
