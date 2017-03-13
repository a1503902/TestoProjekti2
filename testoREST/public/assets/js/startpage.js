$(document).ready(function(){
  $('.ui.fluid.search.selection.dropdown')
    .dropdown()

  $("#startWorkday").click(function(){
    
    var carSelect   = $("#carSelect").val()
    var routeSelect = $("#routeSelect").val();
    var kilometer   = $("input[name=kilometer]").val();
    var startTime   = $("input[name=startTime]").val();

    $.ajax({
      method: 'POST',
      type: 'JSON',
      url: 'http://localhost:8080/api/workdays',
      data: {
        car: carSelect,
        route: routeSelect,
        start_km: kilometer,
        start_time: startTime
      },

      success: function(response){
        alert(JSON.stringify(response));
        if(!!response.success && response.success){
          $(".start-page").hide();
          $(".final-page").show();
        }else{
          alert(response.message);
        }
      },

      error: function(err){
        alert(JSON.stringify(err))
      }
    })
  })
  $.ajax({
    method: 'GET',
    type: 'JSON',
    url: 'http://localhost:8080/api/notification/notification',

    success: function(data){
      console.log(data.message);
      if(!!data.message && data.data != "") {
        var title=data.message.title;
        var message=data.message.message;
        var id=data.message._id;
        $("#modal-notification h1").html(title);
        $("#modal-notification p").append(message);
        $("input[name=id]").val(id);
        $("#modal-notification").modal('show');
      }
    },

    error: function(err){
      alert(JSON.stringify(err))
    }
  });
});
