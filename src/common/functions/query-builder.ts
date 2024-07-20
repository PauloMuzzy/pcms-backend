import { FilterDto, QueryBuilderDto } from 'src/common/dtos/query-builder.dto';

export type TableInfo = {
  alias: string;
  fields: string[];
};

export function queryBuilder(
  queryBuilderParams: QueryBuilderDto,
  sql: string,
  tables?: TableInfo[],
): string {
  let { filters, sort, pagination, range } = queryBuilderParams;

  // Função para adicionar aliases aos filtros
  const addAliasesToFilters = (
    filters: FilterDto[],
    tables: TableInfo[],
  ): FilterDto[] => {
    const aliasMapping: { [key: string]: string } = {};

    // Constrói o mapeamento de aliases para campos de todas as tabelas fornecidas
    tables.forEach((table) => {
      table.fields.forEach((field) => {
        aliasMapping[field] = table.alias;
      });
    });

    // Atualiza os filtros com os aliases
    return filters.map((filter) => ({
      ...filter,
      field: aliasMapping[filter.field]
        ? `${aliasMapping[filter.field]}.${filter.field}`
        : filter.field,
    }));
  };

  // Adicionar aliases aos filtros se houver tabelas definidas
  if (tables && filters && filters.length > 0) {
    filters = addAliasesToFilters(filters, tables);
    const whereClause = filters
      .map((filter) => `${filter.field} = '${filter.value}'`)
      .join(' AND ');
    sql += ` WHERE ${whereClause}`;
  }

  // Adicionando intervalo com aliases
  if (tables && range && range.field && range.start && range.end) {
    const tableAlias =
      tables.find((table) => table.fields.includes(range.field))?.alias || '';
    sql += ` AND ${tableAlias}.${range.field} BETWEEN ${range.start} AND ${range.end}`;
  } else if (range && range.field && range.start && range.end) {
    sql += ` AND ${range.field} BETWEEN ${range.start} AND ${range.end}`;
  }

  // Adicionando ordenação com alias
  if (tables && sort && sort.field && sort.value) {
    const tableAlias =
      tables.find((table) => table.fields.includes(sort.field))?.alias || '';
    sql += ` ORDER BY ${tableAlias}.${sort.field} ${sort.value}`;
  } else if (sort && sort.field && sort.value) {
    sql += ` ORDER BY ${sort.field} ${sort.value}`;
  }

  // Adicionando paginação
  if (pagination && pagination.page && pagination.itemsPerPage) {
    const page = parseInt(pagination.page, 10);
    const itemsPerPage = parseInt(pagination.itemsPerPage, 10);
    const offset = (page - 1) * itemsPerPage;
    sql += ` LIMIT ${itemsPerPage} OFFSET ${offset}`;
  }

  return sql;
}
