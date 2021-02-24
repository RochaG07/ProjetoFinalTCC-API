//server.ts: arquivo de configuração do servidor com a porta e o start

import app from './app';
import server from './websocket';

app.listen(3333, () => {
  console.log('Node server started on port 3333');
});


server.listen(3434, () => {
  console.log('Websocket started on port 3434');
});
