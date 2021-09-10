import { style } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TrackingService } from '../../services/tracking.service';
import { Tracking } from '../../shared/models/Tracking.model';
import { mapstyles } from './mapstyles';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'google-maps';
  trackId: String = '';
  map: google.maps.Map;
  marker: google.maps.Marker;
  tracking: Tracking;
  markers:any[] = []; 
 beaches = [
    ['Bondi Beach', 10, 10, 4],
    ['Coogee Beach', 10, 11, 5],
    ['Cronulla Beach', 10, 12, 3],
    ['Manly Beach', 10, 13, 2],
    ['Maroubra Beach', 10, 14, 1]
];


  constructor(private trackingService: TrackingService) { }


  ngOnInit(): void {
    this.loadMap();
  }


  loadMap() {
    let loader = new Loader({
      apiKey: 'AIzaSyBSEG9YxfK2knfmLj3Ty4yHmKW9Wr5aowg'
    })

    loader.load().then(() => {
      const location = { lat: 51.233334, lng: 6.783333 }

      this.map = new google.maps.Map(document.getElementById("map")!, {
        center: location,
        zoom: 18,
        styles: mapstyles
      })
    })
  }


  track() {
    this.trackingService.track(this.trackId);
    this.trackingService.tracking$.subscribe(
      res => {
        this.tracking = res;
        var myLatlng = new google.maps.LatLng(this.tracking.latitude, this.tracking.longitude);

        //Remove previous Marker.
        if (this.marker != null) {
          this.marker.setMap(null);
         }
        this.marker = new google.maps.Marker({
          position: myLatlng,
          map: this.map,
        });
        this.marker.setMap(this.map);
      //Create and open InfoWindow.
      var infoWindow = new google.maps.InfoWindow();
      infoWindow.open(this.map, this.marker);

        
      }
    )
  }

  cancel() {
    this.trackingService.cancel();
    this.trackingService.tracking$.unsubscribe();
  }





}
