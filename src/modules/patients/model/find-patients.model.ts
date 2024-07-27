import { FindPatientsRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';

export class FindPatientsQueryModel {
  uuid?: string;
  name?: string;
  cpf?: string;
  email?: string;
  active?: number;
  sortField?: string;
  sortDirection?: 'ASC' | 'DESC';
  page: number;
  itemsPerPage: number;

  constructor(query: FindPatientsRequestDto) {
    this.uuid = query.uuid;
    this.name = query.name;
    this.cpf = query.cpf;
    this.email = query.email;
    this.active = query.active ? Number(query.active) : undefined;
    this.sortField = query.sort_field;
    this.sortDirection = query.sort_direction as 'ASC' | 'DESC';
    this.page = Number(query.page) || 1;
    this.itemsPerPage = Number(query.items_per_page) || 10;
  }
}
