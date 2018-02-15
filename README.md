# angularjs-codeigniter
This project is going to help you to combine angularjs and codeigniter framework with the help of a RESTFul Service. I came from angular 4X but in a project they said that I must to use angularjs. So I create a structure similar to angular 4X for develop this project. I hope that you find it interesting.
One of the things that I like of what I did, was that I don't have needs to import anything just create the file with the right name an use it later without any import. For every request you can see information about the request and the response from the server and can be removed for production.

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

After that you need to change #dist/app.js for #dist/app.min.js on your index.html dependencies

## THANKS

Thank's to the [angularjs](https://github.com/angular) team, [codeigniter](https://github.com/bcit-ci/CodeIgniter) team, [gulp](https://github.com/gulpjs/gulp) team, the [AdminLTE](https://github.com/almasaeed2010/AdminLTE) template for google to provide the easiest library to user JWT with php from the FIREBASE API for PHP. And of course thanks to the [babel](https://github.com/babel/babel) team that allow me to use a modern javascript sintax.

## License

angularjs-codeigniter is licensed under the MIT license, see
[LICENSE](https://github.com/eduinlight/angularjs-codeigniter/blob/master/LICENSE).
