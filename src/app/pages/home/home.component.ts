import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titulo = '';
  elementos: any[] = [];
  loading: boolean;

  constructor(private spotifyService: SpotifyService, private router: Router) {
    this.loading = true;
    this.spotifyService.respuestas.subscribe((valor) => {
      this.elementos = valor.items;
      this.titulo = valor.titulo;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.spotifyService.getNewReleases();
  }

  verArtista(idArtista) {
    this.router.navigate(['artista', idArtista]);
  }

}
