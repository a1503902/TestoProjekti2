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
        var stopTime = $("input[name=stopTime]").val()
        var breaks = $("input[name=breaks]").val()
        var stopKm = $("input[name=stopKm]").val()
        var adtInfo = $("input[name=adtInfo]").val()

        $.ajax({
			method: 'PUT',
			type: 'JSON',
			url: 'http://localhost:8080/api/workdays/58a31734c1001b5e20a236b1',
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
			success: function (msg) {
                console.log(msg)
            }
		})
    })
})
