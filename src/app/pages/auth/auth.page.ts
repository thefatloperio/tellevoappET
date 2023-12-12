import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])

  })

  basedatos = inject(FirebaseService);
  ulits = inject(UtilsService);

  ngOnInit() {
  }

 async submit(){
    if(this.form.valid){
      const loading = await this.ulits.loading();
      await loading.present();

      this.basedatos.LogIn(this.form.value as User).then(res => {
        console.log(this.form.value);
        console.log(res);
        this.getUserInfo(res.user.uid);

      }).catch(error =>{
        console.log(error);

        this.ulits.presentToast({
          message: error.message,
          duration: 2500,
          color: "secondary",
          position: "middle",
          icon: "alert-circle-outline"
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }

  async getUserInfo(uid: string){
    if(this.form.valid){
      const loading = await this.ulits.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.basedatos.getDocument(path).then((user: User) => {
        this.ulits.saveInLocalStorage('user', user);
        this.ulits.routerLink('main/home');
        this.form.reset();

        this.ulits.presentToast({
          message: `bienvenido ${user.name}`,
          duration: 1500,
          color: "secondary",
          position: "middle",
          icon: "person-circle-outline"
        })
      }).catch(error =>{
        console.log(error);

        this.ulits.presentToast({
          message: error.message,
          duration: 2500,
          color: "secondary",
          position: "middle",
          icon: "alert-circle-outline"
        })
      }).finally(()=>{
        loading.dismiss();
      })
    } 
  }
}
