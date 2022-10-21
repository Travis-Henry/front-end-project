
function load(){
    $.post( "https://api.spacexdata.com/v4/launches/query",
    {
        "query": {},
        "options": {
            "populate": [
                "payloads", 
                "rocket",
                "launchpad"
            ],
            "limit":"500"
        }
    }).done(function( data ) {
        console.log(data);
        for(let i = data.docs.length -1; i >= 0; i--){
            createInfoCard(data.docs[i], i);
        }
        sortByDate();
  });       
}

load();


function createInfoCard({name, date_local, links, details, rocket, launchpad, payloads, date_utc, upcoming}, i){
    ///////////////////////////////-------Main_Elements--------//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let $card = $(`<div class='infoCard card ${rocket.name} ${launchpad.locality}' id='${date_utc}'></div>`);
    let $cardHeader = $(`<div class='card-header container' data-bs-toggle='collapse' data-bs-target='#card${i}' aria-expanded='false'></div>`);
    let $headerRow = $(`<div class='row'></div>`);
    let $cardBody = $(`<div class='card-body collapse' id='card${i}'></div>`);
    ////////////////////////////---------Header_Elements------//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $patch = $(`<div class='col-2 my-auto'></div>`);
    if(links.patch.small != null){
        $patch.html(`<img class='patch img-fluid' src='${links.patch.small}'>`);

    }else{
        $patch.html(`<h5>No Patch</h5>`)
    }
    let $name = $(`<div class='col my-auto'><h1 class='missionName my-auto'>${name}<h1/></div>`);
    let $date = $(`<div class='col-2 float-right gx-0'><h3>${date_utc.slice(0, 10)}</h3></div>`);
    let $upcoming = upcoming ? $(`<div class='col my-auto'><h3 class='upcoming my-auto'>Upcoming<h3/></div>`) 
                             : $(`<div class='col my-auto'><h3 class='upcoming my-auto'>Past<h3/></div>`);                   ;
    ///////////////////////////------Body_Elements-------//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let $row1 = $(`<div class='row'></div>`);
    let $row2 = $(`<div class='row'></div>`);

    if(payloads.length != 0){
        let customer = [];
        for(let i = 0; i < payloads.length; i++){
            for(let ii = 0; ii < payloads[i].customers.length; ii++){
                customer.push(payloads[i].customers[ii]);
            }
        }
        let $customer = $(`<div class='col-6'><p><b>Customers: </b>${customer.join(", ")}</p></div>`);
        $row1.append($customer);
    }
    let $rocket = $(`<div class='col-6'><p><b>Rocket: </b>${rocket.name}</p></div>`);

    let $location = $(`<div class='col-6'><p><b>Launch location: </b>${launchpad.locality}</p></div>`);
    let $time = $(`<div class='col-6'><p><b>Time: </b>${date_utc.slice(11, 16)} UTC</p></div>`);

    $row1.append($rocket);
    $row2.append($location, $time);
    $cardBody.append($row1, $row2);

    if(details != null){
        let $details = $(`<div class='row'><div class='col-12'><p><b>Details: </b>${details}</p></div></div>`);
        $cardBody.append($details);
    }

    if(payloads.length != 0){
        let cargo = [];
        let orbit = [];
        for(let i = 0; i < payloads.length; i++){
            cargo.push(payloads[i].name);
            orbit.push(payloads[i].orbit);
        }
        let $row3 = $(`<div class='row'></div>`);
        let $payloads = $(`<div class='col-6'><p><b>Payload: </b>${cargo.join(", ")}</p></div>`);
        let $orbit = $(`<div class='col-6'><p><b>Orbit: </b>${orbit.join(", ")}</p></div>`)

        $row3.append($payloads, $orbit);
        $cardBody.append($row3);
    }

    if(links.flickr.original.length != 0){
        let pics = links.flickr.original;
        let $row4 = $(`<div class='row'></div>`);
        for(let i = 0; i < pics.length && i < 4; i++){
            let $pic = $(`<div class="col-3 my-auto"><img class='img-fluid' src='${pics[i]}'></div>`);
            $row4.append($pic);
        }
        $cardBody.append($row4);
    }

    ///////////////////////////-------Append------------//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $headerRow.append($patch, $name, $upcoming, $date);
    $cardHeader.append($headerRow);

    $card.append($cardHeader, $cardBody);
    $(".main").append($card);

}

function sortByDate(){                                 //Bubble sort algorithim
    let $children = $(".main").children();
    for(let i = 0; i <= $children.length; i++){
        if(i+1 > $children.length - 1 ){
            console.log("Sorted -index: " + i);
            return true;
        }
        let $current = $children[i];
        let $next = $children[i+1];

        let currentDate = Number($current.id.slice(0, 10).replace('-', '').replace('-', ''));
        let nextDate = Number($next.id.slice(0, 10).replace('-', '').replace('-', ''));

        if(currentDate === nextDate){
            continue;
        }else if(currentDate > nextDate){
            continue;
        }else if(currentDate < nextDate){
            $($next).insertBefore($current);
            sortByDate();
            return;
        }
    }
}


