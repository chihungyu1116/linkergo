// var GoogleMap = (function () {  
//   var googleAPI;

//   var self = {
//     defaultSet : null,
//     infowindow : null,
//     map : null,
//     mapOptions : {
//       zoom : 15,
//       center : null, // center coords, latLng
//       mapTypeId : null
//     },
//     mapLatLngArr : [],
//     mapCenter : null,
//     mapMarkers : {},
//     mapOverlays : [],


//     fitToMarkers: function() {
//       var bounds = new googleAPI.maps.LatLngBounds(),
//           that =this;
//       // Create bounds from mapOverlays
//       for( var index in that.mapOverlays ) {
//         if(that.mapOverlays.hasOwnProperty(index)){
//           var latlng = that.mapOverlays[index].getPosition();
//           bounds.extend(latlng);
//         }
//       }
      
//       // Don't zoom in too far on only one marker
//       if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
//         var extendPoint1 = new googleAPI.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
//         var extendPoint2 = new googleAPI.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
//         bounds.extend(extendPoint1);
//         bounds.extend(extendPoint2);
//       }

//       that.map.fitBounds(bounds);        
//     },
//     setDefaults : function () {
//       var that = this;
      
//       if (that.defaultSet) return null;
//       that.defaultSet = true;

//       this.defaultSet = true;
//       this.mapCenter = new googleAPI.maps.LatLng(34.036160, -118.463173);
      
//       this.map = new googleAPI.maps.Map(document.getElementById("GoogleMapCanvas"), {
//         mapTypeId: googleAPI.maps.MapTypeId.ROADMAP,
//         center: that.mapCenter,
//         zoom: 11
//       });

//       this.infowindow = new googleAPI.maps.InfoWindow();

//       var center;

//       function calculateCenter() {
//         center = that.map.getCenter();
//       }
//       google.maps.event.addDomListener(that.map, 'idle', function() {
//         calculateCenter();
//       });
//       google.maps.event.addDomListener(window, 'resize', function() {
//         that.map.setCenter(center);
//       });
//     },

//     markerActivated : false,

//     reload : function(placesArr,center,zoom){
//       var that = this;
//       if(that.mapOverlays){
//         for(var o = that.mapOverlays.length; o--;){
//           that.mapOverlays[o].setMap(null);
//         }
//         that.mapOverlays=[];
//         that.mapMarkers={};
//       }
//       that.places=placesArr;

//       for (var x = placesArr.length;x--;){
//         if(x==0){
//           that.createManualMarker(placesArr[x],center,zoom);
//         } else {
//           that.createManualMarker(placesArr[x]);
//         }
//       }
//     },

//     createManualMarker : function (data,center,zoom) {
//       var that = this, 
//           lat = data.latlon[0],
//           lng = data.latlon[1],
//           maxminLat = that.maxminLat,
//           maxminLng = that.maxminLng,
//           myLatlng = new googleAPI.maps.LatLng(+data.latlon[0], +data.latlon[1]), 
//           icon = new googleAPI.maps.MarkerImage("/img/icons/pindrop.png",null,null,new googleAPI.maps.Point(0,35)),
//           marker = new googleAPI.maps.Marker({
//             position: myLatlng,
//             title: data.name,
//             icon:icon
//           });

//       //for food trucks that don't have latlon, is set to [0,0]
//       if(data.latlon[0] != '0' && data.latlon[1] != '0'){
//         marker.setMap(this.map);
//         marker.setPosition(myLatlng);

//         function raiseFlag() {
//           var display = ''
//                 + '<div class="adr">'
//                 + '<div class="business-name">' + data.name + '</div>'
//                 + '<div class="street-address">' + data.address + '</div>'
//                 + '<div class="locality">' + data.city + '</div>'
//                 + '<div class="tel">' + data.phone + '</div>'
//                 + ((data.externalUrl) ? ('<div><a class="url" href="' + data.externalUrl + '" target="_blank">'
//                                          + data.externalUrl.replace(/http:\/\//, '').replace('www.','').replace(/\/$/,'') + '</a></div>') : '');

//           //should appear as follows
//           //var dirUrl = 'http://maps.google.com/maps?q=Yummy+Cupcake,+Wilshire+Boulevard,+Santa+Monica,+CA';
//           if (data.name && data.address && data.city) {
//            var dirUrl = 'http://maps.google.com/maps?q='
//                  + data.name.replace(/\s/mig, "+") + ',+'
//                  + data.address.replace(/\s/mig, "+") + ',+'
//                  + data.city.replace(/\s/mig, "+");
  
//            if(PkConfigLocale.getSessionLangId() == 'en-US'){
//              display += '<a class="dir" href="' + dirUrl + '"  target="_blank">Directions</a></div>';
//            } else {
//              display += '<a class="dir" href="' + dirUrl + '"  target="_blank">Indicaciones</a></div>';
//            }
  
  
//            //https://maps.google.com/maps?q=Yummy+Cupcake,+Wilshire+Boulevard,+Santa+Monica,+CA
//            // directions
//            // we may add rating after we have rating sprite
//            // place.rating
//            // infowindow.setContent('<img src="' + place.icon + '" />');
//            that.infowindow.setContent(display);
//            that.infowindow.open(that.map, marker);
//           }
//         }
        
//         googleAPI.maps.event.addListener(marker, 'click', raiseFlag);

//         if (data.name in that.mapMarkers) {

//         } else {
//           that.mapMarkers[data.name] = raiseFlag;
//         }
        

//         that.mapOverlays.push(marker);
//       }

//       if(center == 'category'){
//         that.fitToMarkers();
//       } else if(center && center !='category'){
//         var myLatLng = new googleAPI.maps.LatLng(center['lat'],center['lng']);

//         //that.fitToMarkers();

//         that.map.setCenter(myLatLng);
//         that.map.setZoom(parseInt(zoom));
//       }
//     }
//   };
  
//   return {
//     gMap : null,
//     getNew : function () {
//       var that = Object.create(self);
//       that.mapMarkers = {};
//       that.mapOverlays = [];
//       that.places = [];
//       return that;
//     },
//     onMapAPILoad : function () {
//       var gMap;

//       googleAPI = google;
//       gMap = GoogleMap.gMap;
//       gMap.setDefaults();

//       for (var o in gMap.places) {
//         if (gMap.places.hasOwnProperty(o)) {
//           gMap.createManualMarker(gMap.places[o]);
//         }
//       }
//     },

    
//     load : function (placesArr,fn) {
//       this.gMap = this.getNew();
//       this.gMap.places = placesArr;
//       if (googleAPI) return this.onMapAPILoad(fn);
//       LazyLoad.js(["https://maps.googleapis.com/maps/api/js?v=3&sensor=false&language=" + PkConfigLocale.getSessionLangId().replace(/-\w*/,'') + "&callback=GoogleMap\.onMapAPILoad&libraries=places"]);      
//       setTimeout(function(){
//         if(fn) fn();
//       },500);
//     }
//   };
// }());

var Gulpio = Gulpio || {};

Gulpio.Map = (function(){
  var self = {

    getLatLonObject : function(latlon){
      latlon = latlon.split(',');
      return new google.maps.LatLng(+latlon[0],+latlon[1]);
    },
    getPlaceImageObject : function(){

    },
    setPlaceOnMap : function(place){
      var id = '#place-' + place.id,
          name = place.name,
          address = place.address,
          city = place.city,
          state = place.state,
          zip = place.zip,
          phone = place.phone,
          hours = place.hours,
          latlon = place.latlon,
          that = this,
          marker;
      
      function showInfoWindow() {
        var infoWindowStr = [
          '<address class="map-info adr">',
            '<div class="business-name">',name,'</div>',
            '<div class="street-address">',address,'</div>',
            '<div class="locality">',city,' ',state,' ',zip,'</div>',
            '<div class="tel">',phone,'</div>',
            '<div class="hours">',hours,'</div>',
          '</address>'
        ].join('');

        that.infoWindow.setContent(infoWindowStr);
        that.infoWindow.open(that.map,marker);
      }

      if(latlon){
        latlon = this.getLatLonObject(latlon);

        marker = new google.maps.Marker({
          position: latlon,
          title: name
        });
        marker.setMap(this.map);
        marker.setPosition(latlon);

        google.maps.event.addListener(marker,'click',showInfoWindow);
      }
    },
    setPlacesOnMap : function(places){
      var places = places || this.places,
          that = this;


      $.each(places,function(index,place){
        that.setPlaceOnMap(place);
      });
    },
    setMap : function(spec){
      var spec = spec || {},
          id = spec.id || this.id,
          type = spec.type || this.mapType,
          center = spec.center || this.mapCenter,
          zoom = spec.zoom || this.mapZoom;

      this.map = new google.maps.Map($(id)[0],{
        type : type,
        center : center,
        zoom: zoom
      });
    },
    setPlaces : function(places){
      this.places = places;
    },
    setDefaults : function(){
      var places = this.places,
          latLon = places[0]['latlon'].split(',');

      this.mapType = google.maps.MapTypeId.ROADMAP;
      this.mapCenter = new google.maps.LatLng(latLon[0],latLon[1]);
      this.mapZoom = 11;

      this.infoWindow = new google.maps.InfoWindow();

      this.setMap();
    }
  }
  return {
    getNew : function(spec){
      this.getScript(function(){
        var that = Object.create(self);
        that.id = spec.id;
        that.places = spec.places;
        that.setDefaults();
        that.setPlacesOnMap();
        return that;
      });
    },
    getScript : function(callback){
      // google map jsapi doesn't support map 3, no lazyload for now
      callback();
    }
  }
}());

