//Get elements
var database = firebase.database();
var ref = database.ref('rows');
ref.on('value', gotData, errData);

function gotData(data) {

    // console.log(data.val())
    var jobInfo = data.val();
    var keys = Object.keys(jobInfo);
    var infoArray = [];
    //$("#dataTables-example tbody tr").remove();

    //console.log(keys);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var jobNumber = jobInfo[k].jobNumber;
        var community = jobInfo[k].community;
        var lotNumber = jobInfo[k].lotNumber;
        var jobSize = jobInfo[k].jobSize;
        var originalInstaller = jobInfo[k].originalInstaller;
        var date = jobInfo[k].date;
        infoArray.push(jobNumber, community, lotNumber, jobSize, originalInstaller, date);

    }

    function editInfo() {
        var param = { lastName: "Doe", firstName: "John" };

        $.ajax({
            url: 'https://kwwl-1adee.firebaseio.com.json',
            type: "POST",
            data: JSON.stringify(param),
            success: function() {
                alert("success");
            },
            error: function(error) {
                alert("error: " + error);
            }
        });
    };
};




function errData(err) {
    console.log('Error!', err)

};