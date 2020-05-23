import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  posicaoAtual: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async ShowMap(){
    //const location = new google.maps.LatLng (-22.489262, -48.546445); posição fixa

  await this.buscaPosicao();

    const options={
      center: this.posicaoAtual,
      zoom: 15,
      disableDefault: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)

    const marcador = new google.maps.Marker({
      position: this.posicaoAtual,
      map: this.map,
      title: "Minha localização",
      icon: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      animation: google.maps.Animation.BOUCE
    });
}

  ionViewDidEnter(){
    this.ShowMap();
  }

  public async buscaPosicao(){
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
 this.posicaoAtual = {
lat: posicaoGPS.coords.latitude,
lng: posicaoGPS.coords.longitude
}
}).catch((error) => {
  console.log('Error getting location', error);
});
  }

}
