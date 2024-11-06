import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  data = [];
  constructor(private toastr: ToastrService, private router: Router) {}

  login() {
    axios.post('http://localhost:8000/api/login', {
        email: this.email,
        senha: this.senha
      })
      .then(response => {
        if(response.data.mensagem == 'success'){

          const horaEmMs = 3600000;
          const msParaVencimento = new Date().getTime() + horaEmMs;
          
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('token_expiration', msParaVencimento.toString());          

          this.toastr.success('Login realizado com sucesso!'); 

          this.router.navigate(['/']);
          window.location.reload();
        }
        else{
          this.toastr.error('Erro no login ou senha.'); 
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }
}