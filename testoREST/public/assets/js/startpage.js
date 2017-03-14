$(document).ready(function(){
  $('.ui.fluid.search.selection.dropdown').dropdown()
  loadCars();
  loadRoutes();
  hasActiveWorkday();
  
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

$("#startTime").datetimepicker({
    format:'d.m.Y H:i'
});

$("#stopTime").datetimepicker({
    format:'d.m.Y H:i',
    startDate: Date.now()
});

function hasActiveWorkday(){
    $.ajax({
        url: 'http://localhost:8080/api/workdays/hasActive',
        success: function(response){
            if(!!response.success && response.success == true){
                workdayId = response.data._id;
                $("input[name=kilometer]").val(response.data.start_km);
                $("#startTime").val(response.data.start_time);
                $("#carSelect").dropdown("set value", response.data.car);
                $("#routeSelect").dropdown("set value", response.data.route);

                $("#startWorkday").text('Seuraava sivu');
                $(".start-page").hide();
                $(".final-page").show();

            }
        },
        error: function(err){
            alert("Error " + err);
        }
    })
}

function loadCars(){
    $.ajax({
        url: 'http://localhost:8080/api/cars',
        method: 'GET',
        success: function(response){
            if(!!response.success && response.success){
                for(var i = 0; i < response.data.length; i++){
                    var car = response.data[i];
                    var html = '<option value="' + car.name + '">' + car.name + '</option>';
                    $("#carSelect").append(html);
                }
            }
        },
        error: function(err){
            alert('Error ' + err);
        }
    });
}

function loadRoutes(){
    $.ajax({
        url: 'http://localhost:8080/api/routes',
        method: 'GET',
        success: function(response){
            if(!!response.success && response.success){
                for(var i = 0; i < response.data.length; i++){
                    var route = response.data[i];
                    var html = '<option value="' + route.name + '">' + route.name + '</option>';
                    $("#routeSelect").append(html);
                }
            }
        },
        error: function(err){
            alert('Error ' + err);
        }
    });
}

var workdayId = "";
$("#startWorkday").click(function(){
    var carSelect = $("#carSelect").val()
    var routeSelect = $("#routeSelect").val();
    var kilometer = $("input[name=kilometer]").val();
    var startTime = $("input[name=startTime]").val();

    $.ajax({
        method: 'POST',
        type: 'JSON',
        url: 'http://localhost:8080/api/workdays',
        data: {
            car: carSelect,
            route: routeSelect,
            start_km: kilometer,
            start_time: startTime,
            workdayId: workdayId
        },
        success: function(response){
            if(!!response.success && response.success){
                workdayId = response.workdayId;
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
});

$("#backBtn").click(function(){
    $(".start-page").show();
    $(".final-page").hide();
});

$("#endWorkday").click(function(){
    if(workdayId == ""){
        alert("Workday id puuttuu");
        return;
    }
    // Postnord
    var distP = $("input[name=distP]").val()
    var pickupP = $("input[name=pickupP]").val()
    var unknownP = $("input[name=unknownP]").val()
    var ntP = $("input[name=ntP]").val()
    // Bring
    var distB = $("input[name=distB]").val()
    var pickupB = $("input[name=pickupB]").val()
    var dhlReturns = $("input[name=dhlReturns]").val()
    var ntB = $("input[name=ntB]").val()
    //innight
    var packages = $("input[name=packages]").val()
    var stops = $("input[name=stops]").val()
    // Stop info
    var stopTime = $("input[name=stopTime]").val()
    var breaks = $("input[name=breaks]").val()
    var stopKm = $("input[name=stopKm]").val()
    var adtInfo = $("input[name=adtInfo]").val()
    // efficiency
    // startTime pitää kaivaa jostain NIKO
    // var efficiency = (distP + pickupP + distB + pickupB) / ((stopTime - startTime) - breaks)
    $.ajax({
        method: 'PUT',
        type: 'JSON',
        url: 'http://localhost:8080/api/workdays/' + workdayId,
        data: {
            deliveries: {
                postnord: {
                    delivery: distP,
                    pickup: pickupP,
                    unknown: unknownP,
                    nt: ntP
                },
                bring: {
                    delivery: distB,
                    pickup: pickupB,
                    dhl_return: dhlReturns,
                    nt: ntB
                },
                innight: {
                    packages: packages,
                    stops: stops,
                }
            },
            stop_time: stopTime,
            breaks: breaks,
            stop_km: stopKm,
            adt_info: adtInfo,
            complete: true
        },
        success: function(msg) {
            alert("Työpäivä lopetettu!");
        }
    })
});
