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
          '<address id="',id,'" class="map-info adr">',
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

        that.markers.push(marker);
        google.maps.event.addListener(marker,'click',showInfoWindow);
      }
    },
    setPlacesOnMap : function(places){
      var places = places || this.places,
          that = this;

      this.removeMarkers();
      $.each(places,function(index,place){
        that.setPlaceOnMap(place);
      });

      this.setMarkersToFitOnMap();
    },
    setMarkersToFitOnMap : function() {
      var bounds = new google.maps.LatLngBounds(),
          that =this,
          extendPoint1, extendPoint2;

      $.each(this.markers,function(index,marker){
        var latlon = marker.getPosition();
        bounds.extend(latlon);
      });

      // don't zoom in too far on one marker
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
        extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
      }

      that.map.fitBounds(bounds);    
    },
    removeMarkers : function(){
      this.markers = [];
    },
    removeMarker : function(){

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
      this.mapZoom = 10;

      this.infoWindow = new google.maps.InfoWindow();

      this.setMap();
    }
  }
  return {
    getNew : function(spec){
      this.getScript(function(){
        var that = Object.create(self);
        that.id = spec.id;
        that.markers = [];
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

