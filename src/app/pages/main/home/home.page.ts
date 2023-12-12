import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  basedatos = inject(FirebaseService);
  utils = inject(UtilsService);

  ngOnInit() {
  }

  salir() {
    this.basedatos.salir();
  }

  user(): User{
    return this.utils.getFromLocalStorage('user');
  }

}
