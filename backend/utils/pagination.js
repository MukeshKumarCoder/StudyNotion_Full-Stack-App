/**
 * Pagination helpers for list endpoints using query params ?page=&limit=
 */

function parsePaginationQuery(req, options = {}) {
  const {
    defaultPage = 1,
    defaultLimit = 10,
    maxLimit = 100,
  } = options;

  let page = parseInt(req.query.page, 10);
  let limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(page) || page < 1) page = defaultPage;
  if (Number.isNaN(limit) || limit < 1) limit = defaultLimit;
  if (limit > maxLimit) limit = maxLimit;

  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

function paginationMeta(totalItems, page, limit) {
  const totalPages = Math.max(1, Math.ceil(totalItems / limit) || 1);
  return {
    currentPage: page,
    totalPages,
    totalItems,
    limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

module.exports = {
  parsePaginationQuery,
  paginationMeta,
};
