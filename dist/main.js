(()=>{function l({name:l,date_local:a,links:i,details:d,flight_number:s},c,e,o,p){let t=$(`<div class='infoCard card ${c.name} ${e.locality}' id='${s}'></div>`),n=$(`<div class='card-header container' data-bs-toggle='collapse' data-bs-target='#card${p}' aria-expanded='false'></div>`),r=$("<div class='row'></div>"),v=$(`<div class='card-body collapse' id='card${p}'></div>`);$patch=$("<div class='col-1'></div>"),null!=i.patch.small?$patch.html(`<img class='patch img-fluid' src='${i.patch.small}'>`):$patch.html("<p>No Image</p>");let h=$(`<div class='col'><h1 class='missionName my-auto'>${l}<h1/></div>`),g=$(`<div class='col'><h3>${a}</h3></div>`),m=$("<div class='row'></div>"),b=$("<div class='row'></div>");if(0!=o.length){let l=[];for(let a=0;a<o.length;a++)for(let i=0;i<o[a].customers.length;i++)l.push(o[a].customers[i]);let a=$(`<div class='col-6'><p><b>Customers: </b>${l.join(", ")}</p></div>`);m.append(a)}let u=$(`<div class='col-6'><p><b>Rocket: </b>${c.name}</p></div>`),f=$(`<div class='col-6'><p><b>Location: </b>${e.locality}</p></div>`),y=$("<div class='col-6'><p><b>Time: </b>placeholder</p></div>");if(m.append(u),b.append(f,y),v.append(m,b),null!=d){let l=$(`<div class='row'><div class='col-12'><p><b>Details: </b>${d}</p></div></div>`);v.append(l)}if(0!=o.length){let l=[],a=[];for(let i=0;i<o.length;i++)l.push(o[i].name),a.push(o[i].orbit);let i=$("<div class='row'></div>"),d=$(`<div class='col-6'><p><b>Payload: </b>${l.join(", ")}</p></div>`),s=$(`<div class='col-6'><p><b>Orbit: </b>${a.join(", ")}</p></div>`);i.append(d,s),v.append(i)}if(0!=i.flickr.original.length){let l=i.flickr.original;console.log(`Image: ${i.flickr.original.length}`);for(let a=0;a<l.length||a<4;a++)console.log(l[a])}r.append($patch,h,g),n.append(r),t.append(n,v),$(".main").append(t)}$.post("https://api.spacexdata.com/v4/launches/query",{query:{},options:{populate:["payloads","rocket","launchpad"],limit:"500"}}).done((function(a){console.log(a);for(let i=0;i<a.docs.length;i++)l(a.docs[i],a.docs[i].rocket,a.docs[i].launchpad,a.docs[i].payloads,i)}))})();