import { DataSource } from 'typeorm';

export async function seedGenders(dataSource: DataSource): Promise<void> {
  const genderRepository = dataSource.getRepository('genders');

  const genders = [
    { name: 'Masculino', is_active: true },
    { name: 'Feminino', is_active: true },
    { name: 'Não-binário', is_active: true },
    { name: 'Prefiro não dizer', is_active: true },
    { name: 'Outro', is_active: true },
  ];

  for (const gender of genders) {
    const exists = await genderRepository.findOne({
      where: { name: gender.name },
    });
    if (!exists) {
      await genderRepository.save(gender);
    }
  }

  console.log('✅ Genders seeded successfully');
}
