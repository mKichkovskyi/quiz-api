import { sequelize } from "../../models";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  const tables = Object.keys(sequelize.models);
  for (const table of tables) {
    await sequelize.models[table].destroy({ truncate: true, cascade: true });
  }
});

afterAll(async () => {
  await sequelize.close();
});
