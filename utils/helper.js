import _ from 'lodash';

export const paginate = (collection, page, perPage = 10) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return _.slice(collection, start, end);
}