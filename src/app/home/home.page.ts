import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { animation } from '@angular/animations';
import { ILocal } from '../interfaces/ILocal';


declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  posicaoAtual: any;
  //posicaoSorveteria: any;
  //posicaoDog: any;
  //posicaoDeck: any;
  //posicaoChurros: any;

  public listaLocais: ILocal[]= [
    {
      lat: -22.489308,
      lng: -48.546176,
      titulo: 'ETEC',
      icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
    },
    {
      lat: -22.493149,
      lng: -48.552628,
      titulo: 'Sorveteria Itapolitana',
      icon: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png',
    },
    {
      lat: -22.499019,
      lng: -48.556126,
      titulo: 'Mister Dog',
      icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    },
    {
      lat: -22.498454,
      lng: -48.565300,
      titulo: 'Deck do Gordão',
      icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    },
    {
      lat: -22.498242,
      lng:  -48.564686,
      titulo: 'Churros Manfredinni',
      icon: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
    },
  ];

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async ShowMap(){
    //posição fixa
    //const posicaoEtec = new google.maps.LatLng ( -22.489308,-48.546176); 
    //const posicaoSorveteria = new google.maps.LatLng (-22.493149, -48.552628);
    //const posicaoDog = new google.maps.LatLng (-22.499019, -48.556126); 
    //const posicaoDeck = new google.maps.LatLng (-22.498454, -48.565300); 
    //const posicaoChurros = new google.maps.LatLng (-22.498242, -48.564686); 

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

    for(let local of this.listaLocais){
      this.adicionarMarcador(local);
    }

    /*const marcador1 = new google.maps.Marker({
      position: posicaoEtec,
      map: this.map,
      title: "Etec",
      
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
    }); */
  }

  ionViewDidEnter(){
    this.ShowMap();
  }

  private adicionarMarcador(local:ILocal){
    const { lat, lng, titulo, icon } = local;

    const marcador = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: titulo,
      icon: icon,
    })
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
