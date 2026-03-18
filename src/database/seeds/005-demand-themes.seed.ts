import { DataSource } from 'typeorm';

export async function seedDemandThemes(dataSource: DataSource, adminId: string): Promise<void> {
  const demandThemeRepository = dataSource.getRepository('demand_themes');

  const themes = [
    {
      name: 'Ansiedade',
      description: 'Transtornos de ansiedade, preocupação excessiva, ataques de pânico',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Depressão',
      description: 'Transtorno depressivo, tristeza profunda, falta de interesse',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Estresse',
      description: 'Gestão de estresse, burnout, sobrecarga emocional',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Luto',
      description: 'Processo de elaboração do luto, perda de entes queridos',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Relacionamentos',
      description: 'Conflitos interpessoais, relacionamentos amorosos, familiares',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Autoestima',
      description: 'Baixa autoestima, insegurança, autoconhecimento',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Trauma',
      description: 'Traumas psicológicos, TEPT, eventos traumáticos',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Transtorno Alimentar',
      description: 'Anorexia, bulimia, compulsão alimentar, imagem corporal',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Vícios e Dependências',
      description: 'Dependência química, vícios comportamentais, compulsões',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'TOC',
      description: 'Transtorno Obsessivo-Compulsivo, obsessões, compulsões',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Fobia',
      description: 'Fobias específicas, medos irracionais',
      is_active: true,
      created_by_admin_id: adminId,
    },
    {
      name: 'Desenvolvimento Pessoal',
      description: 'Crescimento pessoal, autoconhecimento, metas de vida',
      is_active: true,
      created_by_admin_id: adminId,
    },
  ];

  for (const theme of themes) {
    const exists = await demandThemeRepository.findOne({
      where: { name: theme.name },
    });
    if (!exists) {
      await demandThemeRepository.save(theme);
    }
  }

  console.log('✅ Demand Themes seeded successfully');
}
