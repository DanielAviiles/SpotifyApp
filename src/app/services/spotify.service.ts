import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Variables de entorno
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  public respuestas = new BehaviorSubject<any>({ titulo: '', items: [] });
  public headers = new HttpHeaders({ Authorization: 'Bearer BQAGUxyrfhYS5wXUduhrsNJikY1gWAzOut7M6LrZ8fjRw3t7zjkdheRojT0oAwqfTRYbags8MaHx4EwOvI0' });

  constructor(private http: HttpClient) { }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  updateToken(): void {
    this.http.post(environment.tokenUrl, null).subscribe((response: any) => {
      localStorage.setItem('token', response.access_token);
    });
  }

  getNewReleases() {
    // return this.http.get(`${environment.api}/browse/new-releases`, { headers: this.headers });
    this.http.get(`${environment.api}/browse/new-releases`, { headers: this.headers })
      .subscribe((response: any) => {
        const elementos = response.albums.items.map((item: any) => {
          return {
            id: item.id,
            artistaId: item.artists[0].id,
            images: item.images.length ? item.images[0].url : environment.defaultIMG,
            nombre: item.name,
            lanzamiento: item.release_date,
            artistas: item.artists
          };
        });
        this.respuestas.next({ titulo: 'Nuevos Lanzamientos', items: elementos });
      });
  }

  buscarArtistas(textoBuscar) {
    this.http.get(`${environment.api}/search?q=${textoBuscar}&type=artist`, { headers: this.headers })
      .subscribe((response: any) => {
        const elementos = response.artists.items.map((item) => {
          return {
            artistaId: item.id, // id del Artista
            images: item.images.length ? item.images[0].url : environment.defaultIMG,
            nombre: item.name,
            followers: item.followers.total,
            tipo: item.type,
            generos: item.genres
          };
        });
        this.respuestas.next({ titulo: 'Artistas Encontrados', items: elementos });
    });
  }

  infoArtista(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}`, { headers: this.headers });
  }

  artistRelated(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}/related-artists`, { headers: this.headers });
  }

  albumsArtist(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}/albums`, { headers: this.headers });
  }

  topTracks(idArtist): Observable<any> {
    return this.http.get(`${environment.api}/artists/${idArtist}/top-tracks?country=ES`, { headers: this.headers });
  }

}
