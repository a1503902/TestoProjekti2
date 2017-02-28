$(document).ready(function(){
  $('.ui.fluid.search.selection.dropdown')
    .dropdown()

  $("#nextBtn").click(function(){

    var employee = $("input[name=employee]").val()
    var carSelect = $("#carSelect").val()
    var routeSelect = $("#routeSelect").val();
    var kilometer = $("input[name=kilometer]").val();
    var startTime = $("input[name=startTime]").val();

    $.ajax({
      method: 'POST',
      type: 'JSON',
      url: 'http://localhost:8080/api/workdays',
      data: {
        employee: employee,
        car: carSelect,
        route: routeSelect,
        start_km: kilometer,
        start_time: startTime
      },

      success: function(data){
        window.location = '/employees/final'
      },

      error: function(err){
        alert(JSON.stringify(err))
      }
    })
  })
  $.ajax({
    method: 'GET',
    type: 'JSON',
    url: 'http://localhost:8080/api/publicmessage/publicmessage',

    success: function(data){
      if(!data){
        alert("no new messages")
      }else{
        var title=data.data.title;
        var message=data.data.message;
        var id=data.data._id;
        $("#modal-public-message h1").html(title);
        $("#modal-public-message p").append(message);
        $("input[name=id]").val(id);
        $("#modal-public-message").modal('show');
      }
    },

    error: function(err){
      alert(JSON.stringify(err))
    }
  })

  $(document).on('click', 'button[data-action=seen]', function () {
    var id=$("input[name=id]").val();
    $.ajax({
      url: '/api/publicmessage/seen/' + id,
      method: 'PUT',
      type: 'JSON',

      success: function (data) {
        if (data.success) {
          alert(data.message);
        }
      },

      error: function (err) {
        console.log(JSON.stringify(err));
      }

    });
  })
})
