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
  posicaoEtec: any;
  posicaoSorveteria: any;
  posicaoDog: any;
  posicaoDeck: any;
  posicaoChurros: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async ShowMap(){
    const posicaoEtec = new google.maps.LatLng (-22.489308, -48.546176); //posição fixa
    const posicaoSorveteria = new google.maps.LatLng (-22.493149, -48.552628);
    const posicaoDog = new google.maps.LatLng (-22.499019, -48.556126); 
    const posicaoDeck = new google.maps.LatLng (-22.498454, -48.565300); 
    const posicaoChurros = new google.maps.LatLng (-22.498242, -48.564686); 

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
      icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.BOUCE
    });

    const marcador1 = new google.maps.Marker({
      position: posicaoEtec,
      map: this.map,
      title: "Etec",
      icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      animation: google.maps.Animation.BOUCE
    });

    const marcador2 = new google.maps.Marker({
      position: posicaoSorveteria,
      map: this.map,
      title: "Sorveteria",
      icon: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png',
      animation: google.maps.Animation.BOUCE
    });

    const marcador3 = new google.maps.Marker({
      position: posicaoDog,
      map: this.map,
      title: "Doguinho",
      icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      animation: google.maps.Animation.BOUCE
    });

    const marcador4 = new google.maps.Marker({
      position: posicaoDeck,
      map: this.map,
      title: "Deck",
      icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      animation: google.maps.Animation.BOUCE
    });

     const marcador5 = new google.maps.Marker({
      position: posicaoChurros,
      map: this.map,
      title: "Churros",
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
