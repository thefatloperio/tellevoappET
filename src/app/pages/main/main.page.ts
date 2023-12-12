import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  basedatos = inject(FirebaseService);
  utils = inject(UtilsService);

  
  ngOnInit() {
    
  }

  user(): User{
    return this.utils.getFromLocalStorage('user');
  }

  
  

}
