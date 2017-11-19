export default function paginateByPage({ offset, limit }, batchSize = 50) {
  let lowerBound = batchSize * Math.floor(offset / batchSize)
  let upperBound = batchSize * Math.ceil((offset + limit) / batchSize)
  limit = upperBound - lowerBound
  let pageStart = limit * Math.floor(lowerBound / limit)
  while (pageStart + limit < upperBound) {
    limit += batchSize
    pageStart = limit * Math.floor(lowerBound / limit)
  }
  const page = pageStart / limit + 1
  return { page, limit }
}
