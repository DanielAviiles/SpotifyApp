import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  loading: boolean;

  idArtista = '';
  artista: any = {};
  albums: any [] = [];
  artistasSimilares: any [] = [];
  popularTracks: any [] = [];

  constructor(private spotifyService: SpotifyService, private activateRouted: ActivatedRoute) {
    this.activateRouted.params.subscribe((param) => {
      this.idArtista = param.id;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.spotifyService.infoArtista(this.idArtista).subscribe((resp) => {
      this.artista = {
        nombre: resp.name,
        image: resp.images.length ? resp.images[0].url : environment.defaultIMG,
        generos: resp.genres.length ? resp.genres : ['No hay coincidencias'],
        followers: resp.followers.total
      };
      this.loading = false;
    });

    this.spotifyService.artistRelated(this.idArtista).subscribe((response) => {
      this.artistasSimilares = response.artists.map((info) => {
        return info.images.length ? info.images[0].url : environment.defaultIMG;
      });
      this.loading = false;
    });

    this.spotifyService.albumsArtist(this.idArtista).subscribe((response) => {
      const albums = response.items.map((infoItem) => {
        return {
          nombre: infoItem.name,
          fecha: infoItem.release_date,
          img: infoItem.images.length ? infoItem.images[0].url : environment.defaultIMG
        };
      });

      albums.forEach((element) => {
        const exist = this.albums.some((item) => item.nombre === element.nombre);
        if (exist === false) {
          this.albums.push(element);
        }
      });
      this.loading = false;
    });

    this.spotifyService.topTracks(this.idArtista).subscribe((res) => {
      this.popularTracks = res.tracks.map((topTracks) => {
        return {
          duracion: topTracks.duration_ms,
          nameSong: topTracks.name,
          albumName: topTracks.album.name,
          img: topTracks.album.images.length ? topTracks.album.images[0].url : environment.defaultIMG
        };
      });
      this.loading = false;
    });

  }

}
