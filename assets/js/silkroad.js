function initMap() {
  let iconBase = '/assets/images/silkroad/icons/';
  let icons = {
    city1: {
      icon: iconBase + 'tower2.svg'
    },
    guan: {
      icon: iconBase + 'guan.svg'
    },
    buddha: {
      icon: iconBase + 'buddha.svg'
    },
    mosque: {
      icon: iconBase + 'mosque.svg'
    },
    city2: {
      icon: iconBase + 'asian.svg'
    },
  };

  let initInfoCard = function(marker, info){
    let infowindow = new google.maps.InfoWindow({
      content: info
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: xiyuCities.kashgar.pos,
    mapTypeId: 'terrain'
  });

  let markType = [
    {o: xiyuCities, i: 'city1'}, 
    {o: foreignCities, i: 'city2'},
    {o: castle, i: 'guan'},
    {o: budha, i: 'buddha'},
    {o: islam, i: 'mosque'},
  ];
  for(let i in markType){
    let o = markType[i].o;
    for(let j in o) {
      var marker = new google.maps.Marker({
        position: o[j].pos,
        icon: icons[markType[i].i].icon,
        map: map
      });
      if(o[j].info){
        initInfoCard(marker, o[j].info);
      }
    };
  }

  var p1 = new google.maps.Polyline({
    path: xiyunandao,
    geodesic: true,
    strokeColor: '#ffa500',
    strokeOpacity: .8,
    strokeWeight: 2
  });
  p1.setMap(map);

  var p2 = new google.maps.Polyline({
    path: tianshannandao,
    geodesic: true,
    strokeColor: '#00ffa5',
    strokeOpacity: .8,
    strokeWeight: 2
  });
  p2.setMap(map);

  var p3 = new google.maps.Polyline({
    path: tianshanbeidao,
    geodesic: true,
    strokeColor: '#00a5ff',
    strokeOpacity: .8,
    strokeWeight: 2
  });
  p3.setMap(map);
  
  var p4 = new google.maps.Polyline({
    path: xuanzangline,
    geodesic: true,
    strokeColor: '#ee3300',
    strokeOpacity: .8,
    strokeWeight: 2
  });
  p4.setMap(map);

  for(let r in roads){
    let road = new google.maps.Polyline({
      path: roads[r],
      geodesic: true,
      strokeColor: '#9c27b0',
      strokeOpacity: .5,
      strokeWeight: 2
    });
    road.setMap(map);
  }
}

$(".scroll_arrow").click(function(){
  var sec = $(".site-section.silkroad"),
      arr = $(".scroll_arrow .fas");

  if(sec.hasClass("show")){
    sec.removeClass("show");
    arr.removeClass("fa-chevron-left").addClass("fa-chevron-right");
  }
  else{
    sec.addClass("show");
    arr.removeClass("fa-chevron-right").addClass("fa-chevron-left");
  }
})


var getUrlParam = function (name) {
 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
 var r = window.location.search.substr(1).match(reg);
 if (r != null) 
   return unescape(r[2]);
 return null;
}

var show_float = getUrlParam('show_float');
if(show_float == "true"){
  $(".scroll_arrow .fas").click();
}