import { DataSource } from 'typeorm';
import { AppDataSource } from '@config/database/typeorm.config';
import { seedGenders } from './001-genders.seed';
import { seedProfessions } from './002-professions.seed';
import { seedEmergencyContactRelationships } from './003-emergency-contact-relationships.seed';
import { seedAdmin } from './004-admin.seed';
import { seedDemandThemes } from './005-demand-themes.seed';

async function runSeeds() {
  console.log('🌱 Starting database seeding...\n');

  let dataSource: DataSource;

  try {
    // Initialize data source
    dataSource = await AppDataSource.initialize();
    console.log('✅ Database connection established\n');

    // Run all seeds in order
    await seedGenders(dataSource);
    await seedProfessions(dataSource);
    await seedEmergencyContactRelationships(dataSource);
    await seedAdmin(dataSource);

    // Get admin ID for demand themes
    const adminRepository = dataSource.getRepository('admins');
    const admin = await adminRepository.findOne({
      where: { email: 'admin@pcms.com' },
    });

    if (admin) {
      await seedDemandThemes(dataSource, admin.id);
    } else {
      console.log('⚠️  Could not find admin user to seed demand themes');
    }

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('✅ Database connection closed');
    }
  }
}

// Run seeds
runSeeds();
