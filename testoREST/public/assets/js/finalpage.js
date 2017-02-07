$(document).ready(function() {
    $("#sendBtn").click(function() {
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
        var endTime = $("input[name=endTime]").val()
        var breaks = $("input[name=breaks]").val()
        var endKm = $("input[name=endKm]").val()
        var info = $("input[name=adtInfo]").val()

        $.ajax({
			method: 'PUT',
			type: 'JSON',
			url: 'http://localhost:8080/api/workdays/589090cbf9d5fa20bcab6cfe',
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
                stop_time: endTime,
                stop_km: endKm,
                adt_info: info,
                complete: true
            },
			success: function (msg) {
                console.log(msg)
            }
		})
    })
})
