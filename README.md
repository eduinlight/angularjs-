# angularjs-codeigniter
This project is going to help you to combine angularjs and codeigniter framework with the help of a RESTFul Service. I came from angular 4X but in a project they said that i must to use angularjs. So crate a structure similar to angular 4X for develop this project. I hope that you find it interesting.

## How to use

### Download the project and execute it

```bash
  git clone https://github.com/eduinlight/angularjs-codeigniter/
  tar -xz angularjs-codeigniter.zip
  cd angularjs-codeigniter
  npm install
  npm start
```

### Create the database with MYSQL

```bash
  mysql -u user -p
  >>CREATE DATABASE angularjs_ci;
  mysql -u user -p angularjs_ci < ./db/angularjs_ci.sql
```

### Build for production

```bash
  npm run build
```

After that you need to change /dist/app.js for /dist/app.min.js on your index.html dependencies

## THANKS

Thank's to the angularjs team, codeigniter team, gulp team, for google to provide the easiest library to user JWT with php from the FIREBASE API form PHP.

## License

angularjs-codeigniter is licensed under the MIT license, see
[LICENSE](https://github.com/eduinlight/angularjs-codeigniter/blob/master/LICENSE).
