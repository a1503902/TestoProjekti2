$(document).ready(function(){
  $("#laheta").click(function(){

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
        console.log(data)
      },

      error: function(err){
        alert(JSON.stringify(err))
      }
    })
  })
})
