import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitialSchema1710691200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Auxiliary tables first (no foreign keys)
    await queryRunner.createTable(
      new Table({
        name: 'genders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'professions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'emergency_contact_relationships',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );

    // Admins table
    await queryRunner.createTable(
      new Table({
        name: 'admins',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['admin'],
            default: "'admin'",
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'email_verified_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Psychologists table
    await queryRunner.createTable(
      new Table({
        name: 'psychologists',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '14',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'crp',
            type: 'varchar',
            length: '10',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['psychologist'],
            default: "'psychologist'",
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'email_verified_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Patients table
    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '14',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'gender_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'profession_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'emergency_contact_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'emergency_contact_phone',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'emergency_contact_relationship_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'general_notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'medical_history',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'medications_in_use',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Foreign keys for patients
    await queryRunner.createForeignKey(
      'patients',
      new TableForeignKey({
        columnNames: ['gender_id'],
        referencedTableName: 'genders',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'patients',
      new TableForeignKey({
        columnNames: ['profession_id'],
        referencedTableName: 'professions',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'patients',
      new TableForeignKey({
        columnNames: ['emergency_contact_relationship_id'],
        referencedTableName: 'emergency_contact_relationships',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    // Demand themes table
    await queryRunner.createTable(
      new Table({
        name: 'demand_themes',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_by_admin_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'demand_themes',
      new TableForeignKey({
        columnNames: ['created_by_admin_id'],
        referencedTableName: 'admins',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    // Demands table
    await queryRunner.createTable(
      new Table({
        name: 'demands',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'patient_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'psychologist_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'theme_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'in_progress', 'paused', 'completed', 'transferred'],
            default: "'active'",
          },
          {
            name: 'demand_description',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'problem_history',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'symptoms',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'treatment_goals',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'impact_on_life',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'previous_attempts',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'social_support',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'aggravating_factors',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'treatment_expectations',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'motivation_for_change',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'current_medication',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'other_therapies',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'additional_observations',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'current_feeling_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'feeling_intensity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'started_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'completed_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Foreign keys for demands
    await queryRunner.createForeignKey(
      'demands',
      new TableForeignKey({
        columnNames: ['patient_id'],
        referencedTableName: 'patients',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'demands',
      new TableForeignKey({
        columnNames: ['psychologist_id'],
        referencedTableName: 'psychologists',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'demands',
      new TableForeignKey({
        columnNames: ['theme_id'],
        referencedTableName: 'demand_themes',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    // Tags table
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'psychologist_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'color',
            type: 'varchar',
            length: '7',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tags',
      new TableForeignKey({
        columnNames: ['psychologist_id'],
        referencedTableName: 'psychologists',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Session reports table
    await queryRunner.createTable(
      new Table({
        name: 'session_reports',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'demand_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'created_by_psychologist_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'session_start',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'session_finish',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'duration_minutes',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'initial_patient_report',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'initial_feeling',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'initial_feeling_level',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'session_notes',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'techniques_used',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'patient_mood',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'psychologist_observations',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'progress_notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'final_feeling',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'final_feeling_level',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'next_steps',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'is_edited',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Foreign keys for session_reports
    await queryRunner.createForeignKey(
      'session_reports',
      new TableForeignKey({
        columnNames: ['demand_id'],
        referencedTableName: 'demands',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'session_reports',
      new TableForeignKey({
        columnNames: ['created_by_psychologist_id'],
        referencedTableName: 'psychologists',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Session report tags junction table (Many-to-Many)
    await queryRunner.createTable(
      new Table({
        name: 'session_report_tags',
        columns: [
          {
            name: 'session_report_id',
            type: 'char',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'tag_id',
            type: 'char',
            length: '36',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'session_report_tags',
      new TableForeignKey({
        columnNames: ['session_report_id'],
        referencedTableName: 'session_reports',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'session_report_tags',
      new TableForeignKey({
        columnNames: ['tag_id'],
        referencedTableName: 'tags',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Demand access requests table
    await queryRunner.createTable(
      new Table({
        name: 'demand_access_requests',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'demand_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'requesting_psychologist_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'approved', 'rejected', 'revoked'],
            default: "'pending'",
          },
          {
            name: 'patient_approved_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'patient_approved_by',
            type: 'char',
            length: '36',
            isNullable: true,
          },
          {
            name: 'psychologist_approved_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'psychologist_approved_by',
            type: 'char',
            length: '36',
            isNullable: true,
          },
          {
            name: 'rejection_reason',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'rejected_by',
            type: 'char',
            length: '36',
            isNullable: true,
          },
          {
            name: 'revoked_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'revoked_by',
            type: 'char',
            length: '36',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Foreign keys for demand_access_requests
    await queryRunner.createForeignKey(
      'demand_access_requests',
      new TableForeignKey({
        columnNames: ['demand_id'],
        referencedTableName: 'demands',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'demand_access_requests',
      new TableForeignKey({
        columnNames: ['requesting_psychologist_id'],
        referencedTableName: 'psychologists',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Access audit logs table
    await queryRunner.createTable(
      new Table({
        name: 'access_audit_logs',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'access_request_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'demand_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'action',
            type: 'enum',
            enum: [
              'request',
              'patient_approve',
              'psychologist_approve',
              'reject',
              'grant',
              'revoke',
            ],
            isNullable: false,
          },
          {
            name: 'actor_id',
            type: 'char',
            length: '36',
            isNullable: false,
          },
          {
            name: 'actor_type',
            type: 'enum',
            enum: ['psychologist', 'patient', 'admin'],
            isNullable: false,
          },
          {
            name: 'target_psychologist_id',
            type: 'char',
            length: '36',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'ip_address',
            type: 'varchar',
            length: '45',
            isNullable: true,
          },
          {
            name: 'timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Foreign keys for access_audit_logs
    await queryRunner.createForeignKey(
      'access_audit_logs',
      new TableForeignKey({
        columnNames: ['access_request_id'],
        referencedTableName: 'demand_access_requests',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'access_audit_logs',
      new TableForeignKey({
        columnNames: ['demand_id'],
        referencedTableName: 'demands',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'access_audit_logs',
      new TableForeignKey({
        columnNames: ['target_psychologist_id'],
        referencedTableName: 'psychologists',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Create indexes for better performance
    await queryRunner.query('CREATE INDEX idx_patients_cpf ON patients(cpf)');
    await queryRunner.query('CREATE INDEX idx_psychologists_cpf ON psychologists(cpf)');
    await queryRunner.query('CREATE INDEX idx_demands_patient_id ON demands(patient_id)');
    await queryRunner.query('CREATE INDEX idx_demands_psychologist_id ON demands(psychologist_id)');
    await queryRunner.query('CREATE INDEX idx_demands_status ON demands(status)');
    await queryRunner.query(
      'CREATE INDEX idx_session_reports_demand_id ON session_reports(demand_id)',
    );
    await queryRunner.query(
      'CREATE INDEX idx_access_audit_logs_demand_id ON access_audit_logs(demand_id)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order (respecting foreign keys)
    await queryRunner.dropTable('access_audit_logs');
    await queryRunner.dropTable('demand_access_requests');
    await queryRunner.dropTable('session_report_tags');
    await queryRunner.dropTable('session_reports');
    await queryRunner.dropTable('tags');
    await queryRunner.dropTable('demands');
    await queryRunner.dropTable('demand_themes');
    await queryRunner.dropTable('patients');
    await queryRunner.dropTable('psychologists');
    await queryRunner.dropTable('admins');
    await queryRunner.dropTable('emergency_contact_relationships');
    await queryRunner.dropTable('professions');
    await queryRunner.dropTable('genders');
  }
}
