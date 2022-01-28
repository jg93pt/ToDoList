/*Functions using ToDo List AltCademy Restful API*/ 
$(document).ready(function() {
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
        if (task.completed) {
    $('tbody').prepend('<tr class="spacetable">' + 
    '<td class="task">' + task.content + '</td>' +
    '<td><input class="form-check-input" type="checkbox"  data-id="'+ task.id +'" checked></td>' +
    '<td><button class="btn btn-danger btn-remove" id ="removeTask" data-id ="' + task.id + '" >Remove</button></td>'+ 
    '</tr>');
        }
        else if (!task.completed) {
          $('tbody').prepend('<tr class="spacetable">' + 
    '<td class="task">' + task.content + '</td>' +
    '<td><input class="form-check-input" type="checkbox"  data-id="'+ task.id +'"></td>' +
    '<td><button class="btn btn-danger btn-remove" id ="removeTask" data-id ="' + task.id + '" >Remove</button></td>'+ 
    '</tr>');
        }
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

//Mark TASK Complete
var MarkTaskComplete = function (id) {
  $.ajax({
    type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id +'/mark_complete?api_key=223',
      dataType: 'json',
      success: function (response, textStatus) {
        getAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
}

// Mark TASK Active
var MarkTaskActive = function (id) {
  $.ajax({
    type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id +'/mark_active?api_key=223',
      dataType: 'json',
      success: function (response, textStatus) {
        getAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
}
//Mark TASK checkbox function
$(document).on('change', '.form-check-input', function () {
  if (this.checked) {
    MarkTaskComplete($(this).data('id'));
  } else {
    MarkTaskActive($(this).data('id'));
  }
});

// All marked function
$(document).on('click', '#All', function() {
  getAllTasks();
});

// GET Active tasks function
var GetMarkActive = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=223',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty(); 
        response.tasks.forEach(function (task) {
        if(!task.completed) {
          $('tbody').prepend('<tr class="spacetable">' + 
          '<td class="task">' + task.content + '</td>' +
          '<td><input class="form-check-input" type="checkbox"  data-id="'+ task.id +'"></td>' +
          '<td><button class="btn btn-danger btn-remove" id ="removeTask" data-id ="' + task.id + '" >Remove</button></td>'+ 
          '</tr>');
        }
      });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
}
$(document).on('click', '#Active', function() {
  GetMarkActive();
});

// GET Complete tasks function
var GetMarkComplete = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=223',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty(); 
        response.tasks.forEach(function (task) {
        if(task.completed) {
          $('tbody').prepend('<tr class="spacetable">' + 
          '<td class="task">' + task.content + '</td>' +
          '<td><input class="form-check-input" type="checkbox"  data-id="'+ task.id +'" checked></td>' +
          '<td><button class="btn btn-danger btn-remove" id ="removeTask" data-id ="' + task.id + '" >Remove</button></td>'+ 
          '</tr>');
        }
      });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
}
$(document).on('click', '#Completed', function() {
  GetMarkComplete();
});

// Calling GET function at ready
getAllTasks();
});




