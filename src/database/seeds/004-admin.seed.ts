import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(dataSource: DataSource): Promise<void> {
  const adminRepository = dataSource.getRepository('admins');

  // Check if any admin exists
  const existingAdmin = await adminRepository.findOne({
    where: { email: 'admin@pcms.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123456', 10);

    const admin = {
      name: 'System Administrator',
      email: 'admin@pcms.com',
      password: hashedPassword,
      role: 'admin',
      is_active: true,
      email_verified_at: new Date(),
    };

    await adminRepository.save(admin);
    console.log('✅ Admin user created successfully');
    console.log('   Email: admin@pcms.com');
    console.log('   Password: Admin@123456');
  } else {
    console.log('ℹ️  Admin user already exists');
  }
}
