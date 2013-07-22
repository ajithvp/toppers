var uid;
$(document).on('pageinit', '#home',  function(){
	$('.link').live('tap', function() {
	    url = $(this).attr("rel");   
	    loadURL(url);
	});
    $("#btnAttendance").live("click", function() {
        $.mobile.showPageLoadingMsg();

        if(window.localStorage["attendance-"+uid] != undefined){
            data = JSON.parse(window.localStorage["attendance-"+uid]);
            showAttendance(data);
            return false;
        }
        $.ajax({
            type: "POST",
            url: url + "?op=show_attendance",
            data: {
                'studentid' : window.localStorage["studentid"]
            },
            cache: true,
            dataType: "json",
            success: showAttendance,
            error: onerror
        });
        return false;
    });
    $("#btnResults").live("click", function() {
        $.mobile.showPageLoadingMsg();

        if(window.localStorage["results-"+uid] != undefined){
            data = JSON.parse(window.localStorage["results-"+uid]);
            showResults(data);
            return false;
        }

        $.ajax({
            type: "POST",
            url: url + "?op=show_results",
            data: {
                'studentid' : window.localStorage["studentid"]
            },
            cache: true,
            dataType: "json",
            success: showResults,
            error: onerror
        });
        return false;
    });

    $("#btnAnnouncements").live("click", function() {
        $.mobile.showPageLoadingMsg();
       // if(window.localStorage["announcements-"+uid] != undefined){
         //   data = JSON.parse(window.localStorage["announcements-"+uid]);
           // showAnnouncements(data);
           // return false;
       // }
        $.ajax({
            type: "POST",
            url: url + "?op=show_announcements",
            data: {	},
            cache: true,
            dataType: "json",
            success: showAnnouncements,
            error: onerror
        });
        return false;
    });

    $("#btnProfile").live("click", function() {

        $.mobile.showPageLoadingMsg();
        if(window.localStorage["profile"] != undefined){
            data = JSON.parse(window.localStorage["profile"]);
            showProfile(data);
            return false;
        }
        $.ajax({
            type: "POST",
            url: url + "?op=show_profile",
            data: {
                'userid':window.localStorage["userid"]
            },
            cache: true,
            dataType: "json",
            success: showProfile,
            error: onerror
        });
        return false;
    });

    $("#btnExit").live("click", function() {
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
        localStorage.removeItem("profile");
        $.mobile.changePage( "#login", {
            transition: "slide",
            changeHash: false,
            reverse:false
        });
        return false;
    });

    $("#btnReset").live("click", function() {
        $("#txtUserName").val("");
        $("#txtPassword").val("");
        return false;
    });

	if(window.localStorage["username"] == undefined || window.localStorage["userid"] == undefined){

    	var d = new Date();
		uid = "" + window.localStorage["userid"] + d.getFullYear() + d.getMonth() + d.getDate();
        $.mobile.changePage( "#login", {
            transition: "slide",
            changeHash: false,
            reverse:false
        });
    }
});


$(document).on('pagebeforeshow', '#home',  function(){
    if(window.localStorage["username"] == undefined || window.localStorage["userid"] == undefined){
        var d = new Date();
        uid = "" + window.localStorage["userid"] + d.getFullYear() + d.getMonth() + d.getDate();
        $.mobile.changePage( "#login", {
            transition: "slide",
            reverse: false,
            changeHash: false
        });
    }
    return false;
});

$(document).on('pageshow', '#login',  function(){

	$('.link').live('tap', function() {
	    url = $(this).attr("rel");   
	    loadURL(url);
	});
	
    $("#btnLogin").live("click", function() {
        var username = $("#txtUserName").val().trim();
        var password = $("#txtPassword").val().trim();
        if(username == "" || password == ""){
           navigator.notification.alert("Please Fill The Details Completely",callBack, 'Error');
            return false;
        }
        $.mobile.showPageLoadingMsg();
        $.ajax({
            type: "POST",
            url: url + "?op=do_login",
            data: {
                'username':username,
                'password':password
            },
            cache: true,
            dataType: "json",
            success: onSuccess,
            error: onerror
        });
        return false;
    });
    return false;
});



function loadURL(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
} 

var url = "http://www.topperseducation.com/webservices/ajax.php";
var heading = '<div style="height:70px; background:url(images/icon.png) no-repeat; padding-left:60px;">';
	heading += '<h3 style="color:#626262;margin:0px;padding-top:10px;">TOPPERS EDUCATION CENTRE</h3>';
	heading += '<h6 style="color:#000000;margin:0px;font-size:10px;">CBSE/IGCSE/ICSE/IB/ A LEVEL CURRICULUM</h6>';
	heading += '</div>';

function showProfile(data){
    if(window.localStorage["profile"] == undefined){
        window.localStorage["profile"] = JSON.stringify(data);
    }
    var check_off = '<a class="ui-btn-left ui-btn ui-btn-icon-notext" >';
    check_off += '	<span class="ui-btn">';
    check_off += '		<span class="ui-icon ui-icon-checkbox-off ">&nbsp;</span>';
    check_off += '	</span>';
    check_off += '</a> ';

    var check_on = '<a class="ui-btn-left ui-btn ui-btn-icon-notext" >';
    check_on += '	<span class="ui-btn">';
    check_on += '		<span class="ui-icon ui-icon-checkbox-on ">&nbsp;</span>';
    check_on += '	</span>';
    check_on += '</a> ';

    var html = '';

    html += '<ul class="ui-listview ui-listview-inset ui-corner-all ">';
    html += '<li class="ui-li ui-li-divider ui-btn ui-bar-a ui-corner-top">' + data.Name + '</li>';
	html += '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"  >';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Admission No : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%; position: absolute; top: 50%; margin-top: -7px;" >';
	html +=				data.Userid;
	html += 		'</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Curriculam : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%; position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.curriculam;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Class : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%; position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.class_name;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Batch : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%;position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.Batch;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Division : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%;position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.section_name;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Parent Name : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%;position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.Parent_name;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Email : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%;position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.Email1;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Contact : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%;position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.Contact_no1;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >&nbsp;</span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%;position: absolute; top: 5%; margin-top: -1px;" >';
	if(data.Maths == "yes" || data.Maths == "yes")
		html += check_on;
	else
		html += check_off;
	html += ' Maths';
	html += '';
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >&nbsp;</span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%;position: absolute; top: 5%; margin-top: -1px;" >';
	if(data.Physics == "yes" || data.Physics == "yes")
		html += check_on;
	else
		html += check_off;
	html += ' Physics';
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >&nbsp;</span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 35%;position: absolute; top: 5%; margin-top: -1px;" >';
	if(data.Chemistry == "yes" || data.Chemistry == "yes")
		html += check_on;
	else
		html += check_off;
	html += ' Chemistry';
	html += '		</span>';
	html += '	</div>';
	html += '</li>';
	html += '</ul>';
	html = heading + html;
    $('.content',$('#profile')).html(html);
    $.mobile.changePage( "#profile", {
        transition: "slide",
        changeHash: true
    });
    $.mobile.hidePageLoadingMsg();
}

function showAnnouncements(data){

    //if(window.localStorage["announcements"] == undefined){
    //    window.localStorage["announcements"] = JSON.stringify(data);
    //}
    var html = '<br/>';
    $.each(data, function(i, obj) {

        html += '<li class="ui-btn ui-btn-icon-right ui-li ui-corner-all ui-btn-up-c" >';
		html += ' 	<div class="ui-btn-inner ui-li ui-corner-all">';
		html += '		<div class="ui-btn-text">';
		html += '			<a class="ui-link-inherit">';
		html += '				<h3 class="ui-li-heading">'+obj.title+'</h3>';
		html += '				<p class="ui-li-desc" style = "white-space: normal;" >' + obj.content + '</p>';
		html +=	'				Date : <strong>'+obj.date+'</strong>';
		html += '			</a>';
		html += '		</div>';
		html += '	</div>';
		html += '</li>';

    });
    html = heading + html;
    $('.content',$('#announcements')).html(html);
    $.mobile.changePage( "#announcements", {
        transition: "slide",
        changeHash: true
    });
    $.mobile.hidePageLoadingMsg();
}

function showAttendance(data){

    if(window.localStorage["attendance-"+uid] == undefined){
        window.localStorage["attendance-"+uid] = JSON.stringify(data);
    }

    var html = '',isPresent ;

	html += '<ul class="ui-listview ui-listview-inset ui-corner-all ">';
	$.each(data, function(i, obj) {
		isPresent = "Not Present";
		if(obj.Present == "Yes" || obj.Present == "yes")
			isPresent = "Present";
		html += '<li class="details ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-all ui-btn-up-c" id = "'+obj.id+'" >';
		html += ' 	<div class="ui-btn-inner ui-li ui-corner-all">';
		html += '		<div class="ui-btn-text">';
		html += '			<a class="ui-link-inherit">';
		html += '				<strong>' + obj.Date + '</strong>';
		html += '				<br/>';
		html +=	'				<span style="font-size:12px;">' + isPresent + '</span>';
		html += '			</a>';
		html += '		</div>';
		html += '		<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>';
		html += '	</div>';
		html += '</li>';
	});
	html += '</ul>';
	html = heading + html;
    $('.content',$('#attendance')).html(html);

    $('.details').each(function(){
        var attendanceid = $(this).attr('id');
        $(this).live("click", function(){
            $.mobile.showPageLoadingMsg();
            if(window.localStorage["attendanceid-"+uid+"-"+attendanceid] != undefined){
                data = JSON.parse(window.localStorage["attendanceid-"+uid+"-"+attendanceid]);
                showAttendanceDetails(data);
                return false;
            }
            $.ajax({
                type: "POST",
                url: url + "?op=show_attendance_details",
                data: {
                    'attendanceid':attendanceid
                },
                cache: true,
                dataType: "json",
                success: showAttendanceDetails,
                error: onerror
            });

        });
    });

    $.mobile.changePage( "#attendance", {
        transition: "slide",
        changeHash: true
    });
    $.mobile.hidePageLoadingMsg();
}

function showAttendanceDetails(data){

    if(window.localStorage["attendanceid-"+uid+"-"+data.id] == undefined){
        window.localStorage["attendanceid-"+uid+"-"+data.id] = JSON.stringify(data);
    }

    var html = '';
    html += '<ul class="ui-listview ui-listview-inset ui-corner-all ">';
    html += '<li class="ui-li ui-li-divider ui-btn ui-bar-a ui-corner-top">' + data.Date + '</li>';
	html += '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"  >';
	html += ' 	<div class="ui-btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Listening in Class : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 50%; position: absolute; top: 50%; margin-top: -7px;" >';
	html +=				data.Listening;
	html += 		'</span>';
	html += '	</div>';
	html += ' 	<div class="ui-btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Noting Points : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 50%; position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.Noting_points;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="ui-btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Overall Behaviour : </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 50%; position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.Behaviour;
	html += '		</span>';
	html += '	</div>';
	html += ' 	<div class="ui-btn-inner ui-li ">';
	html += '		<div class="ui-btn-text">';
	html += '			<a class="ui-link-inherit">';
	html += '				<span style = "font-size:12px;" >Worksheet Submitted: </span>';
	html += '			</a>';
	html += '		</div>';
	html += '		<span style = "font-size:13px; margin-left: 50%;position: absolute; top: 50%; margin-top: -7px;" >';
	html += 			data.Worksheet;
	html += '		</span>';
	html += '	</div>';
	html += '</li>';
	html += '</ul>';
	html = heading + html;
    $('.content',$('#attendanceDetails')).html(html);
    $.mobile.changePage( "#attendanceDetails", {
        transition: "slide",
        changeHash: true
    });
    $.mobile.hidePageLoadingMsg();
}

function showResults(data){

    if(window.localStorage["results-"+uid] == undefined){
        window.localStorage["results-"+uid] = JSON.stringify(data);
    }

    html = '';
    html += '<ul class="ui-listview ui-listview-inset ui-corner-all ">';
	$.each(data, function(i, obj) {
		html += '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-all ui-btn-up-c"  >';
		html += ' 	<div class="ui-btn-inner ui-li ui-corner-all">';
		html += '		<div class="ui-btn-text">';
		html += '			<a class="ui-link-inherit">';
		html += '				<strong>' + obj.subject + '</strong>';
		html += '				<br/>';
		html +=	'				<span style="font-size:12px;">' + obj.date + '</span>';
		html += '			</a>';
		html += '		</div>';
		html += '		<span style = "right: 15%; margin-right: -9px;position: absolute; top: 50%; margin-top: -9px;" >'+ obj.mark+'</span>';
		html += '	</div>';
		html += '</li>';
	});
	html += '</ul>';
	html = heading + html;
    $('.content',$('#results')).html(html);
    $.mobile.changePage( "#results", {
        transition: "slide",
        changeHash: true
    });
    $.mobile.hidePageLoadingMsg();
}


function onSuccess(data){
    if(data.Name != undefined){
        window.localStorage["username"] = data.Name;
        window.localStorage["userid"] = data.Userid;
        window.localStorage["studentid"] = data.id;
        var d = new Date();
        app.initialize();
		uid = "" + window.localStorage["userid"] + d.getFullYear() + d.getMonth() + d.getDate();
        $.mobile.changePage( "#home", {
            transition: "slide",
            reverse: false,
            changeHash: false
        });
    }
    else{
        navigator.notification.alert("Incorrect Login",callBack,'Error');
        $("#txtUserName").val("");
        $("#txtPassword").val("");
    }
    $.mobile.hidePageLoadingMsg();
    $("#txtUserName").val("");
    $("#txtPassword").val("");
}

function onerror(data){
	alert(JSON.stringify(data))
    navigator.notification.alert("Error In Your Internet Connection",callBack,'Error');
    $.mobile.hidePageLoadingMsg();
    $("#txtUserName").val("");
    $("#txtPassword").val("");
}
