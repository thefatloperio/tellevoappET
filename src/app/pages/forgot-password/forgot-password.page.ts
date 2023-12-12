import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email])

  })

  basedatos = inject(FirebaseService);
  ulits = inject(UtilsService);

  ngOnInit() {
  }

 async submit(){
    if(this.form.valid){
      const loading = await this.ulits.loading();
      await loading.present();

      this.basedatos.recuperarcontra(this.form.value.email).then(res => {

        this.ulits.presentToast({
          message: "revise su correo",
          duration: 2500,
          color: "secondary",
          position: "middle",
          icon: "mail-outline"
        });

        this.form.reset();

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
