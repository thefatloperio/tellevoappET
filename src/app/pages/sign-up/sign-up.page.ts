import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    

  })

  basedatos = inject(FirebaseService);
  ulits = inject(UtilsService);

  ngOnInit() {
  }

 async submit(){
    if(this.form.valid){
      const loading = await this.ulits.loading();
      await loading.present();

      this.basedatos.signUp(this.form.value as User).then(async res => {
        await this.basedatos.Update(this.form.value.name);

        let uid = res.user.uid;

        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid)

        console.log(res);

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

  async setUserInfo(uid: string){
    if(this.form.valid){
      const loading = await this.ulits.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.basedatos.setDocument(path, this.form.value).then(async res => {
        this.ulits.saveInLocalStorage('user', this.form.value);
        this.ulits.routerLink('/auth');
        this.form.reset();

        this.ulits.presentToast({
          message: 'registrado',
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


