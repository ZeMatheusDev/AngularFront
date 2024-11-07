import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-edit-empresa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-empresa.component.html',
  styleUrl: './edit-empresa.component.css'
})
export class EditEmpresaComponent {
  nome = '';
  cnpj = '';
  empresa = {};
  token!: string;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(){
    this.token = this.route.snapshot.paramMap.get('token') || '';
    axios.post('http://localhost:8000/api/editEmpresa', {token: this.token}).then(response => {
      if(response.data.empresa){
        this.empresa = response.data.empresa[0];     
        this.nome = response.data.empresa[0].nome;
        this.cnpj = response.data.empresa[0].cnpj;        
      }
    })    
  }

  editar(){
    if(this.cnpj != '' && this.nome != '')
    axios.post('http://localhost:8000/api/updateEmpresa', {
      nome: this.nome,
      cnpj: this.cnpj,
      token: this.token
    }).then(response => {
      if(response.data.mensagem == 'success'){       
        this.toastr.success('Empresa atualizada com sucesso!'); 
        this.router.navigate(['/listagem/empresa']);
      }
      else{
        this.toastr.error('Erro ao atualizar empresa, contate um administrador.'); 
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
}
