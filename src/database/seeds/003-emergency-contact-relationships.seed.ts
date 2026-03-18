import { DataSource } from 'typeorm';

export async function seedEmergencyContactRelationships(dataSource: DataSource): Promise<void> {
  const relationshipRepository = dataSource.getRepository('emergency_contact_relationships');

  const relationships = [
    { name: 'Pai/Mãe', is_active: true },
    { name: 'Filho(a)', is_active: true },
    { name: 'Irmão/Irmã', is_active: true },
    { name: 'Cônjuge/Companheiro(a)', is_active: true },
    { name: 'Avô/Avó', is_active: true },
    { name: 'Neto(a)', is_active: true },
    { name: 'Tio/Tia', is_active: true },
    { name: 'Sobrinho(a)', is_active: true },
    { name: 'Primo(a)', is_active: true },
    { name: 'Amigo(a)', is_active: true },
    { name: 'Colega', is_active: true },
    { name: 'Vizinho(a)', is_active: true },
    { name: 'Outro', is_active: true },
  ];

  for (const relationship of relationships) {
    const exists = await relationshipRepository.findOne({
      where: { name: relationship.name },
    });
    if (!exists) {
      await relationshipRepository.save(relationship);
    }
  }

  console.log('✅ Emergency Contact Relationships seeded successfully');
}
