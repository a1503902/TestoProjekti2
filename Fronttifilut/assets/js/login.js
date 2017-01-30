$(document).ready(function() {
    $("#login").on( "submit", function(event) {
        event.preventDefault()
        $.post('localhost:8080/api/authenticate', $('#login').serialize())
})
})
