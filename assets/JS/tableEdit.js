function makeItEdit() {
    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'inline';

    //make username editable
    //Table edit to Firebase..
    function editInfo() {
        var param = {
            key: {
                "community": "ajax",
                "date": "01/10/2017",
                "jobNumber": "ajax",
                "jobSize": "ajax",
                "lotNumber": "ajax",
                "originalInstaller": "ajax"
            }
        };
        $.ajax({
            url: 'https://kwwl-1adee.firebaseio.com/rows.json',
            type: "PUT",
            crossDomain: true,
            data: JSON.stringify(param),
            success: function() {
                alert("success");
            },
            error: function(error) {
                alert("error: " + error);
            }
        });
    };



    /*
    //uncomment these lines to send data on server
    ,pk: 1
    ,url: '/post'
    */
};