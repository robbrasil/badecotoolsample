var JSONURL = 'https://spreadsheets.google.com/feeds/list/1Wv2QsMvZW3ItgD6pKS2oFqxjiaYWXgCk6dwYCNSGfRc/1/public/basic?alt=json';
var contentData;
var dataSimp;
var dataArray = [];

function callback(data) {
    var rows = [];
    var cells = data.feed.entry;

    for (var i = 0; i < cells.length; i++) {
        var rowObj = {};
        rowObj.JobNumber = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++) {
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
        dataSimp = rows[rows.length - 2];

    }
    for (i = 0; i < rows.length; i++) {
        dataArray.push(rows[i]);

    }

    contentData = JSON.stringify(rows);
    //console.log(contentData);
}
$(document).ready(function() {
    $.ajax({
        url: JSONURL,
        success: function(data) {
            callback(data);
            CreateTableFromJSON();
            $("#id0").text("Job Number");
            $("#id1").text("Community");
            $("#id2").text("Lot Number");
            $("#id3").text("Job Size");
            $("#id4").text("Original Installer");
            $("#id5").text("Date");
            t = $('table')
            firstTr = t.find('tr:first').remove()
            firstTr.find('td').contents().unwrap().wrap('<th>')
            t.prepend($('<thead></thead>').append(firstTr))
            $(document).ready(function() {
                $('#dataTables-example').DataTable();
            });
        }
    });
});

function CreateTableFromJSON() {
    var myBooks = dataArray;
    var col = [];
    for (var i = 0; i < myBooks.length; i++) {
        for (var key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.className = "table table-striped table-bordered table-hover Test";
    table.id = "dataTables-example";

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        th.id = "id" + i;
        tr.appendChild(th);
        tr.id = "headtr";
        $('#dataTables-example').each(function() {
            var $this = $(this);

            $this.children('tbody').children().unwrap();
            $this.children('tr:has(th)').wrapAll('<thead>');
            $this.children('tr:has(td)').wrapAll('<tbody>');
        });
    }



    // ADD JSON DATA TO THE TABLE AS ROWS.



    for (var i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);
        tr.className = "body";


        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }


    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("dataTables-example-div");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
};