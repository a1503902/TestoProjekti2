$(".dropdown").dropdown();

function getUnreadMessages(){
    $.ajax({
        url: 'http://localhost:8080/api/message/unread',
        method: 'GET',
        success: function(response){
            if(!!response.success && response.success){
                var bold = response.data.unread > 0 ? true : false;
                var html = bold == true ? 'Viestit <b>(' + response.data.unread + ')</b>' : 'Viestit (0)';
                $("#menu-messages").html(html);
            }else{
                alert(data.message);
            }
        },
        error: function(err){
            alert(err);
        }
    });
}

var messageList = [];
function getMessageList(){
    if(messageList.length > 0){
        loadList(messageList);
    }else{
        $.ajax({
            url: 'http://localhost:8080/api/message/list',
            dataType: "json",
            type: "GET",
            cache: false,
            contentType: "application/json",
            success: function(response){
                if(!!response.success && response.success){
                    messageList = [];
                    for(var i = 0; i < response.data.length; i++){
                        messageList.push(response.data[i]);
                    }
                    loadList(messageList);
                }else{
                    alert(data.message);
                }
            },
            error: function(err){
                alert(err);
            }
        });
    }
}

var notificationList = [];
function getnotificationList() {
    if (notificationList.length > 0) {
        loadNotificationList(notificationList);
    } else {
        $.ajax({
            url: 'http://localhost:8080/api/notification/list',
            dataType: "json",
            type: "GET",
            cache: false,
            contentType: "application/json",
            success: function (response) {
                if (!!response.success && response.success) {
                    notificationList = [];
                    for (var i = 0; i < response.data.length; i++) {
                        notificationList.push(response.data[i]);
                    }
                    loadNotificationList(notificationList);
                } else {
                    alert(data.message);
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    }
}

function loadList(list){
    $("#messages-list").html('');
    for(var i = 0; i < list.length; i++){
        var message = list[i];
        var html = message.unread == true ? '<a href="#" class="item" data-action="view-message" data-id="' + message.id + '"><b>' + message.title + '</b></a>' : '<a href="#" class="item" data-action="view-message" data-id="' + message.id + '">' + message.title + '</a>';
        $("#messages-list").append(html);
    }
    $("#my-messages").modal("show");
}

function loadNotificationList(list) {
    $("#notifications-list").html('');
    for (var i = 0; i < list.length; i++) {
        var message = list[i];
        var html = message.unread == true ? '<a href="#" class="item" data-action="view-notification" data-id="' + message.id + '"><b>' + message.title + '</b></a>' : '<a href="#" class="item" data-action="view-notification" data-id="' + message.id + '">' + message.title + '</a>';
        $("#notifications-list").append(html);
    }
}

function getMessage(id){
    $.ajax({
        url: 'http://localhost:8080/api/message/' + id,
        method: 'GET',
        dataType: "json",
        type: "GET",
        cache: false,
        contentType: "application/json",
        success: function(response){
            if(!!response.success && response.success){
                $("#message-title").text(response.data.title);
                $("#message-content").text(response.data.message);
                showMessage();
            }else{
                alert(data.message);
            }
        },
        error: function(err){
            alert(err);
        }
    });
}

function getNotification(id) {
    $.ajax({
        url: 'http://localhost:8080/api/notification/notification/' + id,
        method: 'GET',
        dataType: "json",
        type: "GET",
        cache: false,
        contentType: "application/json",
        success: function (response) {
            if (!!response.success && response.success) {
                $("#notification-title").text(response.data.title);
                $("#notification-content").text(response.data.message);
                showMessage();
            } else {
                alert(data.message);
            }
        },
        error: function (err) {
            alert(err);
        }
    });
}

$(document).on('click', '[data-action=view-message]', function(){
    var id = $(this).data('id');
    getMessage(id);
});

$(document).on('click', '[data-action=view-notification]', function () {
    var id = $(this).data('id');
    getNotification(id);
});

$("[data-action=go-back]").click(function(){
    showList();
});

$("#my-messages").modal();
$("a[data-action=show-messages]").click(function () {
    showList();
    getMessageList();
    getnotificationList();
});

$("a[data-action=to-notifications]").click(function () {
    showList();
    $("#messages").hide();
    $("#notifications").show();
});

$("a[data-action=to-messages]").click(function () {
    showList();
    $("#notifications").hide();
    $("#messages").show();
});

function showMessage(){
    $(".view-list").hide();
    $(".view-message").show();
}

function showList(){
    $(".view-list").show();
    $(".view-message").hide();
}

$(function(){
    getUnreadMessages();
});

$('.menu .item')
    .tab();