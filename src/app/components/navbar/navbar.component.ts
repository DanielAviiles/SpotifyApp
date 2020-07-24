import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  rutaActual = '/';

  constructor( private spotifyService: SpotifyService, private router: Router ) { }

  ngOnInit(): void {
    this.router.events.subscribe((evento: any) => {
      if (evento.hasOwnProperty('url')) {
        this.rutaActual = evento.url;
      }
    });
  }

  buscarArtista(event): void {
    if ( this.rutaActual.length === 1 || this.rutaActual.length === 5 ) {
      if (event.target.value.length) {
        this.spotifyService.buscarArtistas(event.target.value);
      } else {
        this.spotifyService.getNewReleases();
      }
    } else {
      this.router.navigate(['home']);
    }
  }

}
