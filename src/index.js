
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
        for(let i = 0; i < data.docs.length; i++){
            createInfoCard(data.docs[i], data.docs[i].rocket, data.docs[i].launchpad, data.docs[i].payloads, i);
        }
        //sortByFlightNumber();
  });       
   
}

load();



function createInfoCard({name, date_local, links, details, flight_number}, rocket, launchSite, payloads, i){
    ///////////////////////////////-------Main_Elements--------//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let $card = $(`<div class='infoCard card ${rocket.name} ${launchSite.locality}' id='${flight_number}'></div>`);
    let $cardHeader = $(`<div class='card-header container' data-bs-toggle='collapse' data-bs-target='#card${i}' aria-expanded='false'></div>`);
    let $headerRow = $(`<div class='row'></div>`);
    let $cardBody = $(`<div class='card-body collapse' id='card${i}'></div>`);
    ////////////////////////////---------Header_Elements------//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $patch = $(`<div class='col-1'></div>`);
    if(links.patch.small != null){
        $patch.html(`<img class='patch img-fluid' src='${links.patch.small}'>`);

    }else{
        $patch.html(`<p>No Image</p>`)
    }
    let $name = $(`<div class='col'><h1 class='missionName my-auto'>${name}<h1/></div>`);
    let $date = $(`<div class='col'><h3>${date_local}</h3></div>`);
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

    let $location = $(`<div class='col-6'><p><b>Location: </b>${launchSite.locality}</p></div>`);
    let $time = $(`<div class='col-6'><p><b>Time: </b>${"placeholder"}</p></div>`);

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

        console.log(`Image: ${links.flickr.original.length}`);
        for(let i = 0; i < pics.length || i < 4; i++){
            console.log(pics[i]);
        }


    }

    ///////////////////////////-------Append------------//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $headerRow.append($patch, $name, $date);
    $cardHeader.append($headerRow);

    $card.append($cardHeader, $cardBody);
    $(".main").append($card);

}





















// function sortByFlightNumber(){
//     let $children = $(".main").children();
//     for(let i = 0; i < $children.length; i++){
//         let current = Number($children[i].id);
//         let next = Number($children[i+1].id);
//         if(current == next){
            
//             return;
//         }else if(current > next){
//             $(`#${next}`).insertBefore(`#${current}`);
//             console.log(`Moved ${next} behind ${current}`);
//             sortByFlightNumber();
//             return;
//         }
        

//     }
    
//     //sortByFlightNumber();
// }


