/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    tokenHandler:function(msg) {
		$.ajax({
   			type: "POST",
   			url: url + "?op=register_device",
  			data: {
       			'regid' : msg,
       			'userid' : window.localStorage["userid"],
       			'platform' : 'ios',
     			},
   			cache: true,
   			dataType: "html",
   			success: onRegister,
   			error: onerror
		});
    },
    errorHandler:function(error) {

    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"877438445200","ecb":"app.onNotificationGCM"});
        }
        else {
			pushNotification.register(this.tokenHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
    },
        // iOS
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        if (event.alert) {
            navigator.notification.alert(event.alert,callBack,'News');
        }
        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    $.ajax({
            			type: "POST",
            			url: url + "?op=register_device",
            			data: {
                			'regid' : e.regid,
                			'userid' : window.localStorage["userid"],
                			'platform' : 'android',
            			},
            			cache: true,
            			dataType: "html",
            			success: onRegister,
            			error: onerror
        			});
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model
              // of the intermediary push server which must also be reflected in GCMIntentService.java
              navigator.notification.alert(e.message,callBack,'News' );
            break;

            case 'error':
              navigator.notification.alert('GCM error = '+e.msg,callBack,'Error');
            break;

            default:
              navigator.notification.alert('An unknown GCM event has occurred',callBack,'Error');
              break;
        }
    }

};

function onRegister(data){
 // alert(data);
}

function onerror(data){
    navigator.notification.alert("Error In Your Internet Connection",callBack,'Error');
}
function callBack(){

}