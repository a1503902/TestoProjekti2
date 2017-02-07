$(document).ready(function(){
  $("#laheta").click(function(){

    var driver = $("input[name=driver]").val()
    var carSelect = $("#carSelect").val()
    var routeSelect = $("#routeSelect").val();
    var kilometer = $("input[name=kilometer]").val();
    var startTime = $("input[name=startTime]").val();

    $.ajax({
      method: 'POST',
      type: 'JSON',
      url: 'http://localhost:8080/api/workdays',
      data: {
        employee: driver,
        car: carSelect,
        route: routeSelect,
        start_km: kilometer,
        start_time: startTime
      },

      success: function(data){
        console.log(start_time)
        console.log(data)
      },

      error: function(err){
        console.log(start_time)
        alert(JSON.stringify(err))
      }
    })
  })
})
