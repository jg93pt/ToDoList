/*Functions using ToDo List AltCademy Restful API*/ 
$(document).ready(function(){
// GET all tasks
var getAllTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=223',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todo-list').empty(); 

      response.tasks.forEach(function (task) {
        // Show in html the result:
    $('tbody').prepend('<tr class="spacetable">' + 
    '<td class="task">' + task.content + '</td>' +
    '<td><input class="form-check-input" type="checkbox"  data-id="'+ task.id +'"></td>' +
    '<td><button class="btn btn-danger btn-remove" id ="removeTask" data-id ="' + task.id + '" >Remove</button></td>'+ 
    '</tr>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

// POST Create Task
var createTask = function () {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=223',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#taskInput').val()
      }
    }),
    success: function (response, textStatus) {
      $('#taskInput').val(''); 
      getAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}
// Create Task submit function
$('#addTask').on('submit', function (e) {
  e.preventDefault();
  createTask();
});

// DELETE task:
var deleteTask = function (id) {
  $.ajax({
 type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=223',
    success: function (response, textStatus) {
      getAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}
 // Remove Task click function
$(document).on('click', '#removeTask', function () {
  deleteTask($(this).data('id'));
});

// Calling GET function
getAllTasks();
});



