var jobNumber = document.getElementById("jobNumber");
var community = document.getElementById("community");
var lotNumber = document.getElementById("lotNumber");
var jobSize = document.getElementById("jobSize");
var originalInstaller = document.getElementById("originalInstaller");
var date = document.getElementById("date");


$("#mainForm").on("submit", function (e) {
    if ($("#date").val()) {
        var comment = document.getElementById("comment");
        if ($("#comment").length) {
            console.log("Comment exists");
        } else {
            console.log("comment does not exist");
            var temp = $("<input id='comment'>");
            temp.value = "";
            comment = temp;
        };
        var firebaseRef = firebase.database().ref();
        var jobInfo = { jobNumber: jobNumber.value, community: community.value, lotNumber: lotNumber.value, jobSize: jobSize.value, originalInstaller: originalInstaller.value, date: date.value, comment: comment.value }
        firebaseRef.child("rows").push(jobInfo);
        //table.ajax.reload(null, false);
        //location.reload();
        // var idOn = $('#tableMain > tbody tr:last > td:nth-child(1)').attr("onclick");
        // var span = $('#tableMain > tbody tr:last > td:nth-child(1)').html();
        //table.row.add([
        //    span.replace("<span", "<span onclick='" + idOn) + "'", "<a href='#'>" + jobNumber.value + "</a>", "<a href='#'>" + community.value + "</a>", "<a href='#'>" + lotNumber.value + "</a>", "<a href='#'>" + jobSize.value + "</a>", "<a href='#'>" + originalInstaller.value + "</a>", "<a href='#'>" + date.value + "</a>"
        // ]).draw(false);
        //$("[data-toggle='popover']").popover("hide");
        $("input").val("");
        location.reload();
    } else {
        event.preventDefault();
        alert("Date is required!");
        return;
    }
});