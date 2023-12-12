import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  basedatos = inject(FirebaseService);
  utils = inject(UtilsService);

  ngOnInit() {
  }

  user(): User{
    return this.utils.getFromLocalStorage('user');
  }
}
