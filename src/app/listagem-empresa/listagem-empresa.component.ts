import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import axios from 'axios';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';  
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem-empresa',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listagem-empresa.component.html',
  styleUrl: './listagem-empresa.component.css'
})
export class ListagemEmpresaComponent {
  empresas: {id: number, nome: string, cnpj: string, token: string}[] = [];
  empresa = {};
  constructor(private router: Router, private toastr: ToastrService){}

  ngOnInit(){
    axios.get('http://localhost:8000/api/getEmpresas').then(response => {
      if(response.data.empresas){
        this.empresas = response.data.empresas;                
      }
    })    
  }

  editar(token: string){
    this.router.navigate(['/editEmpresa', token]);
  }

  deletar(token: string){ 
    axios.post('http://localhost:8000/api/deleteEmpresa', {
      token: token
    }).then(response => {
      if(response.data.mensagem == 'success'){       
        this.toastr.success('Empresa deletada com sucesso!'); 
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else{
        this.toastr.error('Erro ao deletar empresa, contate um administrador.'); 
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }

  restaurar(){ 
    axios.post('http://localhost:8000/api/restaurarEmpresas', {
    }).then(response => {
      if(response.data.mensagem == 'success'){       
        this.toastr.success('Empresas restauradas com sucesso!'); 
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else{
        this.toastr.error('Erro ao restaurar empresas, contate um administrador.'); 
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }

}
