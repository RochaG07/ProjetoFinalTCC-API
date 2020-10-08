//server.ts: arquivo de configuração do servidor com a porta e o start

import app from './app';

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
