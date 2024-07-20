interface InputParams {
  [key: string]: string;
}

interface OutputParams {
  filter?: { field: string; value: string }[];
  sort?: { field: string; value: string };
  pagination?: { pageNumber: string; itemsPerPage: string };
  range?: { field: string; start: string; end: string }[];
}

export function transformQueryBuilderParams(input: InputParams): OutputParams {
  const output: OutputParams = {};

  Object.entries(input).forEach(([key, value]) => {
    if (key.startsWith('filter-')) {
      if (!output.filter) {
        output.filter = [];
      }
      const field = key.replace('filter-', '');
      output.filter.push({ field, value: value.trim() });
    } else if (key.startsWith('sort-')) {
      output.sort = { field: key.replace('sort-', ''), value: value.trim() };
    } else if (key.startsWith('pagination-')) {
      if (!output.pagination) {
        output.pagination = { pageNumber: '1', itemsPerPage: '10' };
      }
      const field = key.replace('pagination-', '');
      if (field === 'page-number') {
        output.pagination.pageNumber = value.trim();
      } else if (field === 'items-per-page') {
        output.pagination.itemsPerPage = value.trim();
      }
    } else if (key.startsWith('range-')) {
      if (!output.range) {
        output.range = [];
      }
      const field = key.replace('range-', '');
      if (field.startsWith('start-')) {
        const realField = field.replace('start-', '');
        const endKey = `range-end-${realField}`;
        if (endKey in input) {
          output.range.push({
            field: realField,
            start: value.trim(),
            end: input[endKey].trim(),
          });
        }
      }
    }
  });

  // Remove empty properties
  if (output.filter && output.filter.length === 0) {
    delete output.filter;
  }
  if (!output.sort) {
    delete output.sort;
  }
  if (output.pagination && Object.keys(output.pagination).length === 0) {
    delete output.pagination;
  }
  if (output.range && output.range.length === 0) {
    delete output.range;
  }

  // Ensure range end values are set
  if (output.range) {
    output.range.forEach((range) => {
      if (!range.end) {
        range.end = range.start;
      }
    });
  }

  return output;
}
