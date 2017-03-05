var info = [];
var count = 0;
var totalCells = 5;
var infoArray = [];
var tempArray = ["jobNumber", "community", "lotNumber", "jobSize", "originalInstaller", "date"];
var heading = new Array();
var keys = " ";
var deleteId;
var columnName;
var table;
$(document).on("focusin", "#date", function () {
    $(this).prop("readonly", true);
});

$(document).on("focusout", "#date", function () {
    $(this).prop("readonly", false);
});


$(document).ready(function() {
 
   
    var date_input = $("input[name='date']"); //our date input has the name "date"
    var container = $(".bootstrap-iso form").length > 0 ? $(".bootstrap-iso form").parent() : "body";
    date_input.datepicker({
        format: "mm/dd/yyyy D",
        container: container,
        todayHighlight: true,
        autoclose: true
    });
    
    //$("#tableMain_paginate").on("click",function() {
    //    console.log("page button");
    //    var myVar = setTimeout(dataTable, 100);
    //});

    //Get elements
    var database = firebase.database();
    var ref = database.ref("rows");
    ref.on("value", gotData, errData);
    //var myVar = setTimeout(dataTable, 500);

    $('[data-toggle="popover"]').popover();
    $.fn.dataTable.ext.errMode = "none";
    
//var myVar = setTimeout(makeItEdit, 3000);
});

function errData(err) {
    console.log("Error!", err);
    alert("Permission denied! Please sign in.");
    window.location.href = "login.html";
};//Logs error

function toggleInfo() {
            var tInfo = document.getElementById("panelBody");
            var toggleBtn = document.getElementById("tgBtn");

            if (tInfo.style.display === "none") {
                tInfo.style.display = "block";
                $("#tgBtn").text("Hide Entry Form");
                
            } else {

                tInfo.style.display = "none";
                $("#tgBtn").text("Show Entry Form");
            }
        };//Toggles new entry form

function searchJobNumber() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableMain");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};//Search Job Number function

function deleteRow() {
    console.log("delete button");
    console.log("ID: " + deleteId);
   
    
   //var temp = document.getElementById(deleteId);
   // console.log(temp);
    var rowId = firebase.database().ref("rows/" + deleteId);
    rowId.remove();
    //table
    //   .row( $('#' + deleteId).parents('tr') )
    //   .remove()
    //   .draw();
    //table.page('last').draw(false);
    location.reload();
    
    //$.ajax({
    //    url: 'https://kwwl-1adee.firebaseio.com/rows/' + deleteId + ".json",
    //    type: "DELETE",
    //    crossDomain: true,
    //    // data: JSON.stringify(param),
    //    success: function() {
    //        console.log("success Delete");
    //        $("#formId").trigger("reset");
    //        $("#tableMain").trigger("reset");
    //        // location.href = "installations.html";
    //    },
    //    error: function(error) {
    //        console.log("error: " + error);
    //        console.log(JSON.stringify(data));
    //    }
    //});
};//Deletes row

function transferId(id) {
    deleteId = id;
    $("#myModal").modal("show");
};//Transfers TR id to modal button

function closePopover() {
    $(".popover").popover("hide");
};

$("body").on("click",".commentEdit",function() {
        var commentKey = this.id;
        console.log(commentKey);
          var newComment = $("textarea#"+commentKey).val();
        console.log(newComment);
            var param = {
            comment: newComment
            };
        console.log(param);
        var rowId = firebase.database().ref("rows/" + commentKey);
        rowId.update(param);
    location.reload();
});

function gotData(data) {
    $("#tableMain > tbody tr").remove();
    var jobInfo = data.val();
    keys = Object.keys(data.val());
    //console.log(keys);
    $.each(jobInfo, function (i, value) {
        if (value.jobSize.endsWith(" ft²") === false) {
            value.jobSize = value.jobSize + " ft²";
        }
        if (value.comment) {
           // console.log(value.comment);
            $("#tableMain > tbody").append("<tr><td><button onclick=transferId('" + i + "') class='btn btn-danger btn-sm xBtn' title='Click to delete row' ><i class='fa fa-trash' aria-hidden='true'></i><button id='"+i+"' name='" + i + "' class='btn btn-info btn-md pull-right iBtn commentBtn' data-comment='" + value.comment + "' name='" + value.comment + "'><i class='fa fa-info' aria-hidden='true'></i></td><td data-type='text' id=" + i + "jobNumber><a href='#'>" + value.jobNumber + "</a></td><td data-type='text' id=" + i + "community><a href='#'>" + value.community + "</a></td><td data-type='text' id=" + i + "lotNumber><a href='#'>" + value.lotNumber + "</a></td><td data-type='text' id=" + i + "jobSize><a href='#'>" + value.jobSize + "</a></td><td data-type='text' id=" + i + "originalInstaller><a href='#'>" + value.originalInstaller + "</a></td><td data-type='text' id=" + i + "date><a href='#'>" + value.date + "</a></td></tr>");
            $("#"+i).attr("data-html", "true");
            $("#"+i).attr("data-placement", "right");
            $("#"+i).attr("data-toggle", "popover");
            //$("#"+i+"comment").attr("data-trigger", "focus");
            $("#"+i).attr("data-content", "<textarea id='"+ i +"' rows='6' cols='70' name='comment' type='text'>"+ value.comment +"</textarea><button id='"+ i +"' class='btn btn-xs btn-success commentEdit' type='button' style='position:relative;left:-100px;top:-10px'>Save</button><button class='btn btn-xs btn-danger' type='button' onclick=closePopover() style='position:relative;left:-96px;top:-10px'>Close</button>");
            $("#"+i).popover();
           
        } else {
            $("#tableMain > tbody").append("<tr><td><button onclick=transferId('" + i + "') class='btn btn-danger btn-sm xBtn' title='Click to delete row' ><i class='fa fa-trash' aria-hidden='true'></i><button id='"+i+"' class='btn btn-md btn-warning pull-right iBtn' ><i class='fa fa-pencil-square-o' aria-hidden='true'></i></td><td data-type='text' id=" + i + "jobNumber><a href='#'>" + value.jobNumber + "</a></td><td data-type='text' id=" + i + "community><a href='#'>" + value.community + "</a></td><td data-type='text' id=" + i + "lotNumber><a href='#'>" + value.lotNumber + "</a></td><td data-type='text' id=" + i + "jobSize><a href='#'>" + value.jobSize + "</a></td><td data-type='text' id=" + i + "originalInstaller><a href='#'>" + value.originalInstaller + "</a></td><td data-type='text' id=" + i + "date><a href='#'>" + value.date + "</a></td></tr>");
            $("#"+i).attr("data-html", "true");
            $("#"+i).attr("data-placement", "right");
            $("#"+i).attr("data-toggle", "popover");
            //$("#"+i+"comment").attr("data-trigger", "focus");
            $("#"+i).attr("data-content", "<textarea id='"+ i +"' rows='6' cols='70' name='comment' placeholder='Add more information here.' type='text'>"+ value.comment +"</textarea><button id='"+ i +"' class='btn btn-xs btn-success commentEdit' type='button' style='position:relative;left:-100px;top:-10px'>Save</button><button class='btn btn-xs btn-danger' type='button' onclick=closePopover() style='position:relative;left:-96px;top:-10px'>Close</button>");
            $("#"+i).popover();
        }
    });
  
    $("#tableMain").DataTable({
        "order": [[ 6, "desc" ]],
        "columnDefs": [
        {
            "targets": 0,
            "searchable": false,
            "orderable": false,  
            "width": "89px"
}]
   });
    $("#tableMain").DataTable({
        responsive: true
    });
   $("#tableMain").on( "page.dt", function () {
       console.log("page button");
       var myVar = setTimeout(makeItEdit, 500);
   } );
    
    //$("#delHead").removeClass("sorting_asc");
    //$("#delHead").addClass("sorting_disabled");
    //table.page('first').draw(false);
    makeItEdit();
    
};//New data from Firebase

function makeItEdit() {
   
    $.fn.editable.defaults.mode = "inline";

    var result = keys.length * 6;
    for (var i = 0; i < result; i++) {
        for (var j = 0; j < 6; j++) {
            var valueId = keys[i] + tempArray[j];

            $("#" + valueId).editable({
                success: function(response, newValue) {
                    //$("#tableMain tbody tr td").empty();
                    var keyAndColumn = $(this).attr("id");
                    var idKey = keyAndColumn.slice(0, 20);
                    columnName = keyAndColumn.slice(20, keyAndColumn.length);
                    console.log(idKey);
                    console.log(columnName);
                    console.log(newValue);
                    var param = {
                        [columnName]: newValue
                    };
                    console.log(JSON.stringify(param));
                    var rowId = firebase.database().ref("rows/" + idKey);
                    rowId.update(param);
            location.reload();
            //$.ajax({
            //    url: "https://kwwl-1adee.firebaseio.com/rows/" + idKey + ".json",
            //    type: "PATCH",
            //    crossDomain: true,
            //    data: JSON.stringify(param),
            //    success: function() {
            //        console.log("success");
            //        //$("#formId").trigger("reset");
            //        console.log(param);
            //        //location.href = "installations.html";
            //    },
            //    error: function(error) {
            //        console.log("error: " + error);
            //        console.log(JSON.stringify(data));
            //    }
            //});


        }
            });
        };
    };
};//Makes TR editable


