import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FindOptionsListResponseDto } from 'src/modules/options/dto/find-options-list-response.dto';

@Injectable()
export class OptionsService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async findOptionsList(
    optionName: string,
  ): Promise<FindOptionsListResponseDto[]> {
    let tableName = '';

    switch (optionName) {
      case 'gender':
        tableName = 'genders';
        break;
      case 'profession':
        tableName = 'professions';
        break;
      case 'emergencyContactRelationship':
        tableName = 'emergency_contact_relationships';
        break;
    }

    const query = `SELECT * FROM ${tableName}`;
    const options = await this.dataBaseService.query(query);
    return options.map((option: FindOptionsListResponseDto) => ({
      id: option.id,
      name: option.name,
    }));
  }
}
