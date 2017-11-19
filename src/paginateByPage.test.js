import test from 'ava'
import paginate from './paginateByPage'

test('paginateByPage', t => {
  t.deepEqual(paginate({ offset: 0, limit: 5 }), { page: 1, limit: 50 })
  t.deepEqual(paginate({ offset: 1, limit: 5 }), { page: 1, limit: 50 })
  t.deepEqual(paginate({ offset: 20, limit: 5 }), { page: 1, limit: 50 })
  t.deepEqual(paginate({ offset: 21, limit: 5 }), { page: 1, limit: 50 })
  t.deepEqual(paginate({ offset: 150, limit: 100 }), { page: 2, limit: 150 })
  t.deepEqual(paginate({ offset: 199, limit: 100 }), { page: 2, limit: 150 })
  t.deepEqual(paginate({ offset: 200, limit: 100 }), { page: 3, limit: 100 })
  t.deepEqual(paginate({ offset: 226, limit: 25 }), { page: 3, limit: 100 })
  t.deepEqual(paginate({ offset: 70, limit: 100 }), { page: 1, limit: 200 })
})
