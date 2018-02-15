angular.module('my-services').service('notyService',
  class {
    warning = (title, message) => {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-warning gritter-light',
        time: 500
      });
    }
    info = (title, message) => {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-info gritter-light',
        time: 500
      });
    }
    success = (title, message) => {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-success gritter-light',
        time: 500,
      });
    }
    error = (title, message) => {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-error gritter-light',
        time: 500
      });
    }
  }
)