# nodejs-auth-api-server

How to start?
- to install dependencies, run `npm install`
- create `dev.js` file in `config` directory with the following content:
```
module.exports = {
    serverPort: <your_server_port>,
    mongoURI: 'mongodb://localhost:<mongo_port>/<db_name>',
    jwtSecret: '<your_jwt_secret_phrase>'
  }
```
- start mongo db locally
- to start the server, run `npm run dev`

#### happy coding :)
