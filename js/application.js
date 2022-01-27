/*Functions using ToDo List AltCademy Restful API*/ 
$(document).ready(function(){
// GET all tasks
var getAllTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=223',
    dataType: 'json',
    success: function (response, textStatus) {
      $('.spacetable').empty(); 

      response.tasks.forEach(function (task) {
        // Show in html the result:
    $('tbody').prepend('<tr class="spacetable">' + 
    '<td class="task">' + task.content + '</td>' +
    '<td><input class="form-check-input" type="checkbox"  id="'+task.id+'"></td>' +
    '<td><button class="btn btn-danger btn-remove">Remove</button></td>'+ 
    '</tr>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};
getAllTasks();
});



