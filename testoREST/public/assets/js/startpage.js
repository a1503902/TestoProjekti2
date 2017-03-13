$(document).ready(function(){
  $('.ui.fluid.search.selection.dropdown').dropdown()

  
  $.ajax({
    method: 'GET',
    type: 'JSON',
    url: 'http://localhost:8080/api/notification/notification',

    success: function(data){
      console.log(data.message);
      if(!!data.message && data.data != "") {
        var title   = data.message.title;
        var message = data.message.message;
        var id      = data.message._id;
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
