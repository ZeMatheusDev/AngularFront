import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-minha-empresa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './minha-empresa.component.html',
  styleUrl: './minha-empresa.component.css'
})
export class MinhaEmpresaComponent {
  empresa = {};
  decodedToken: any;
  nome = '';
  cnpj = '';


  ngOnInit(){
    const token = localStorage.getItem('token');

    if(token){
      this.decodedToken = jwtDecode(token);
      axios.post('http://localhost:8000/api/minhaEmpresa', {
        email: this.decodedToken.username
    }).then(response => {
      this.empresa = response.data.empresa[0];
      this.nome = response.data.empresa[0].nome;
      this.cnpj = response.data.empresa[0].cnpj;
    })
      
    }

    console.log();
    
  }
}
