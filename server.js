const app = require('./config/express')();

require('./config/database')

app.listen(app.get('port'), () => {
  console.log(`Server is running on port: ${app.get('port')}`);
});

