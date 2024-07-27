import { FindUsersRequestDto } from 'src/modules/users/dto/find-users-request.dto';

export class FindUsersQueryModel {
  uuid?: string;
  name?: string;
  cpf?: string;
  email?: string;
  accessTypeId?: number;
  active?: number;
  sortField?: string;
  sortDirection?: 'ASC' | 'DESC';
  page: number;
  itemsPerPage: number;

  constructor(query: FindUsersRequestDto) {
    this.uuid = query.uuid;
    this.name = query.name;
    this.cpf = query.cpf;
    this.email = query.email;
    this.accessTypeId = Number(query.access_type_id);
    this.active = Number(query.active);
    this.sortField = query.sort_field;
    this.sortDirection = query.sort_direction as 'ASC' | 'DESC';
    this.page = Number(query.page) || 1;
    this.itemsPerPage = Number(query.items_per_page) || 10;
  }
}
