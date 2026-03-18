import { DataSource } from 'typeorm';

export async function seedProfessions(dataSource: DataSource): Promise<void> {
  const professionRepository = dataSource.getRepository('professions');

  const professions = [
    { name: 'Estudante', is_active: true },
    { name: 'Professor(a)', is_active: true },
    { name: 'Médico(a)', is_active: true },
    { name: 'Enfermeiro(a)', is_active: true },
    { name: 'Engenheiro(a)', is_active: true },
    { name: 'Advogado(a)', is_active: true },
    { name: 'Contador(a)', is_active: true },
    { name: 'Administrador(a)', is_active: true },
    { name: 'Psicólogo(a)', is_active: true },
    { name: 'Arquiteto(a)', is_active: true },
    { name: 'Designer', is_active: true },
    { name: 'Desenvolvedor(a)', is_active: true },
    { name: 'Empresário(a)', is_active: true },
    { name: 'Comerciante', is_active: true },
    { name: 'Autônomo(a)', is_active: true },
    { name: 'Aposentado(a)', is_active: true },
    { name: 'Desempregado(a)', is_active: true },
    { name: 'Do lar', is_active: true },
    { name: 'Funcionário(a) Público(a)', is_active: true },
    { name: 'Outro', is_active: true },
  ];

  for (const profession of professions) {
    const exists = await professionRepository.findOne({
      where: { name: profession.name },
    });
    if (!exists) {
      await professionRepository.save(profession);
    }
  }

  console.log('✅ Professions seeded successfully');
}
