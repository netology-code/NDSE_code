const http = require('http');
const url = require('url');
const { v4: uuid } = require('uuid');

const database = {
  operations: [
    { id: uuid(), amount: 50 },
    { id: uuid(), amount: 150 },
  ],
};

const getAllOperationsComponent = (operations = []) => {
  let tableRows = operations.map(({ id, amount }, index) => {
    return (`
        <tr>
          <th>${++index}</th>
          <th>${amount}</th>
            <td>
              <a class="btn btn-sm btn-primary" href="/update?id=${id}">обновить</a>
              <a class="btn btn-sm btn-danger" href="/delete?id=${id}">удалить</a>
            </td>
        </tr>
       `)
  }).join('');

  return (`
    <a class="btn btn-primary" href="/create">Добавить запись</a>
    <table class="table table-striped table-sm  mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th>сумма</th>
          <th>действие</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `)
};

const getFormCreateComponent = () => (`
  <form 
    method="POST"
    action="/create"
  >
  <input
    name="count"
    type="number"
    required
  />
    <button
      class="btn btn-sm btn-success"
      type="submit"
    >
      создать
    </button>
  </form>
`);

const getFormUpdateComponent = ({ id, amount }) => (`
  <form
    method="POST"
    action="/update?id=${id}"
  >
    <input
      name="count" 
      type="number"
      value="${amount}"
    />
    <button
      class="btn btn-sm btn-outline-success" 
      type="submit"
    >
      сохранить
    </button>
  </form>
`);

const layoutStart = (`
  <link
    rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
    crossorigin="anonymous"
  />
    <div class="container pt-5">
`);

const layoutEnd = `</div>`

const server = http.createServer((req, res) => {

  const urlParsed = url.parse(req.url, true);
  const { pathname, query } = urlParsed;
  const { method } = req;

  res.setHeader('Content-Type', 'text/html; charset=utf-8;');

  if (pathname === '/' || pathname === '/index') {
    res.write(layoutStart);
    res.write(`<h2>Операции</h2>`);
    res.write(getAllOperationsComponent(database.operations));
    res.write(layoutEnd);

  } else if (pathname === '/create') {
    if (method === 'GET') {
        res.write(layoutStart);
        res.write(`<h2>Новая запись</h2>`);
        res.write(getFormCreateComponent());
        res.write(layoutEnd);

    } else if (method === 'POST') {
      let body = [];
      req
        .on('data', (chunk) => {
          body.push(chunk)
        })
        .on('end', () => {
          body = Buffer.concat(body).toString().split('=')[1];
          database.operations.push({ id: uuid(), amount: body })
        });

      res.statusCode = 302;
      res.setHeader('Location', '/');
    }

  } else if (pathname === '/update') {
    if (method === 'GET') {
      let idx = database.operations.findIndex(el => el.id === query.id);
      const operation = database.operations[idx];

      res.write(layoutStart);
      res.write('<h2>Редактировать запись</h2>');
      res.write(getFormUpdateComponent(operation));
      res.write(layoutEnd)

    } else if (method === 'POST') {
      if (query.id) {
        let body = [];
        req
          .on('data', (chunk) => {
            body.push(chunk);
          })
          .on('end', () => {
            body = Buffer.concat(body).toString().split('=')[1];
            let idx = database.operations.findIndex(el => el.id === query.id);
            if (idx !== -1) {
              database.operations[idx].amount = body;
            }
          });

        res.statusCode = 302;
        res.setHeader('Location', '/');
      }
    }

  } else if (pathname === '/delete') {
    database.operations = database.operations.filter(el => el.id !== query.id);
    res.statusCode = 302;
    res.setHeader('Location', '/');

  } else {
    res.statusCode = 404;
    res.write(layoutStart);
    res.write(`<h2>404 | Страница не найдена</h2>`);
    res.write(layoutEnd);
  }

  res.end()
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
