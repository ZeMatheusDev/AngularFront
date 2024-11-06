import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desafioFront';
  logado = false;
  admin = false;

  ngOnInit(): void{
    this.checarLogado();
  }  
  constructor(private router: Router) {}

  checarLogado(){
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('token_expiration');

    if (token && tokenExpiration) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.roles.includes('ROLE_ADMIN')) {
        this.admin = true;
      } else {
        this.admin = false;
      }

      const currentTime = new Date().getTime();
      const expirationTime = parseInt(tokenExpiration, 10);

      if (currentTime < expirationTime) {
        this.logado = true;
      } else {
        this.logado = false;
        this.deslogar();  
      }
    } else {
      this.logado = false;
    }
  }

  deslogar(){
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');

    this.router.navigate(['/']); 
    window.location.reload();

  }

}
