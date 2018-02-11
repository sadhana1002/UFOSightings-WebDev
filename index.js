var current_filter_list = {};

var numberPerPage = 10;

var currentPage = 1;

function numberOfPages(list){
    return list.length/numberPerPage;
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages(filteredSet);
    loadList();
}

function loadList(){
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = filteredSet.slice(begin, end);
    renderTable(pageList);
    check();
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

function applyCurrentFilters(){
    keys = Object.keys(current_filter_list);
    console.log("List -",keys);


    if(keys.length <= 0){
        filteredSet = dataSet;
        loadList();
    }else{
        for(var i=0;i<keys.length;i++){
            filteredSet = dataSet;
            filterTable(keys[i],current_filter_list[keys[i]]);
        }
    }
}

function renderTable(dataset){
    var firstindex = ((currentPage - 1) * numberPerPage);
        Plotly.d3.select("tbody").html("");
    if(dataset.length >0 ){
        datakeys = Object.keys(dataset[0]);
        console.log("In render");   
            for(var i=0;i<dataset.length;i++){
                $table_row = Plotly.d3.select("tbody").append("tr");  
                $serial_no = $table_row.append("td");
                $serial_no.text(firstindex+i+1);
                for(var j=0;j<datakeys.length;j++){
                    $table_data = $table_row.append("td");
                    var strval = dataset[i][datakeys[j]];
                    $table_data.text(strval);
                }
            }
    }
        
    }

    function FirstCaseUpper(str){
        if(str){
            console.log("First Case - ",str.toString());
            str = str.toString();
            return str[0].toUpperCase()+ str.substring(1).toLowerCase();
        }
        return "";
    }

    function Lower(str){
        if(str){
            return str.toLowerCase();
        }
        return "";
    }

function filterTable(filtercol, filtervalue){
    console.log("In Filter table")

    morefilteredSet = [];

    for(var i=0;i<filteredSet.length;i++){
        // console.log("Check 1 -",Lower(filteredSet[i][Lower(filtercol)]));
        // console.log("Check 2 -",Lower(filtervalue));
        if(Lower(filteredSet[i][filtercol]) == Lower(filtervalue)){
            // console.log("Added",filteredSet[i]);
            morefilteredSet.push(filteredSet[i]);
        }
    }   
        filteredSet = morefilteredSet;
        loadList();
        
}

$filter_form = document.getElementById("filter-form");

$filter_form.addEventListener("submit",function(event){
    event.preventDefault();
    sidebar = Plotly.d3.select("#sidebar");
    content = Plotly.d3.select("#content");
    sidebar.classed("collapsed",!sidebar.classed("collapsed"));
    content.classed("col-md-12",!content.classed("col-md-12"));
    content.classed("col-md-9",!content.classed("col-md-9"));
    // console.log("Wellllll");
    $radio_buttons = document.getElementsByName("optradio");
    filter_text = document.getElementById("filter-val").value;
    for(var i=0;i<$radio_buttons.length;i++){
         if($radio_buttons[i].checked){
              col = $radio_buttons[i].value;
         }
    }
    // console.log("Filter - ",col);
    // console.log("Val - ",filter_text);

    addFilterBadge(col,filter_text);

    current_filter_list[col] = filter_text;

    currentPage = 1;
    
    applyCurrentFilters();

   
});

function addFilterBadge(key,val){

    console.log(" addFilterBadge ",key,val);
    var $currentFilters = document.getElementById("currentFilters");
    
    var $col = document.createElement("div");
    $col.setAttribute("class","col-md-2");

    $currentFilters.appendChild($col);

    var $filter_span = document.createElement("span");
    $filter_span.setAttribute("class","filter-badge badge badge-dark");

    $col.appendChild($filter_span);

    var $filter_rm =  document.createElement("button");
    $filter_rm.setAttribute("class","filter-close btn btn-sm btn-outline-dark");
    $filter_rm.setAttribute("data-key",key);
    $filter_rm.setAttribute("data-value",val)

    $filter_span.innerText = key+": '"+val+"' ";

    $filter_span.appendChild($filter_rm)

    $filter_rm.innerText = 'X';

    $filter_rm.addEventListener("click",function(event){
        var target = event.target;
        var parent = target.parentElement;
        var key = event.target.getAttribute("data-key");
        console.log(key,parent);
        console.log(current_filter_list);
        delete current_filter_list[key] ;
        console.log(current_filter_list);
        parent.innerHTML ="";
        applyCurrentFilters();
    });
    
}


$filter_form.addEventListener("reset",function(event){

    current_filter_list = {};

    $currentFilters = document.getElementById("currentFilters");

    $currentFilters.innerHTML = "";

    filteredSet = dataSet;

    sidebar = Plotly.d3.select("#sidebar");
    content = Plotly.d3.select("#content");
    sidebar.classed("collapsed",!sidebar.classed("collapsed"));
    content.classed("col-md-12",!content.classed("col-md-12"));
    content.classed("col-md-9",!content.classed("col-md-9"));

    currentPage = 1;

    loadList();

    
});

$side_toggle = document.getElementById("sidebar-btn");

$side_toggle.addEventListener("click",function(event){
    event.preventDefault();
    sidebar = Plotly.d3.select("#sidebar");
    content = Plotly.d3.select("#content");
    sidebar.classed("collapsed",!sidebar.classed("collapsed"));
    content.classed("col-md-12",!content.classed("col-md-12"));
    content.classed("col-md-9",!content.classed("col-md-9"));
});

filteredSet = dataSet;
applyCurrentFilters();

console.log(aggregates[0]['country']);