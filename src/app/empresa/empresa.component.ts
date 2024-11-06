import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {
  nome = '';
  cnpj = '';
  constructor(private toastr: ToastrService, private router: Router) {}

  cadastrar(){
    if(this.cnpj != '' && this.nome != '')
    axios.post('http://localhost:8000/api/cadastrar/empresa', {
      nome: this.nome,
      cnpj: this.cnpj
    }).then(response => {
      if(response.data.mensagem == 'success'){       
        this.toastr.success('Empresa cadastrada com sucesso!'); 
        this.router.navigate(['/']);
      }
      else{
        this.toastr.error('Erro ao cadastrar empresa, contate um administrador.'); 
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
}
