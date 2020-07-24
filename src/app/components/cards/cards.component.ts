import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  // Decoradores cards Releases
  @Input() imagen = '';
  @Input() title = '';
  @Input() artistas: any[] = [];
  @Input() fechaRelease = '';

  // Docoradores cards Artistas
  @Input() tipyCard = '';
  @Input() followers: number;
  @Input() generos: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
