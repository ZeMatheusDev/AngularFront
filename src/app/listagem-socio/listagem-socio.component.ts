import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import axios from 'axios';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';  
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listagem-socio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listagem-socio.component.html',
  styleUrl: './listagem-socio.component.css'
})
export class ListagemSocioComponent {
  usuarios: {id: number, nome: string, email: string, token: string}[] = [];
  usuario = {};
  constructor(private router: Router, private toastr: ToastrService){}

  ngOnInit(){
    axios.get('http://localhost:8000/api/getUsuarios').then(response => {
      if(response.data.usuarios){
        this.usuarios = response.data.usuarios;   
        console.log(this.usuarios);
                     
      }
    })    
  }

  editar(token: string){
    this.router.navigate(['/editSocio', token]);
  }

  deletar(token: string){ 
    axios.post('http://localhost:8000/api/deleteUsuario', {
      token: token
    }).then(response => {
      if(response.data.mensagem == 'success'){       
        this.toastr.success('Sócio deletada com sucesso!'); 
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else{
        this.toastr.error('Erro ao deletar sócio, contate um administrador.'); 
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }

  restaurar(){ 
    axios.post('http://localhost:8000/api/restaurarUsuarios', {
    }).then(response => {
      if(response.data.mensagem == 'success'){       
        this.toastr.success('Sócios restaurados com sucesso!'); 
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else{
        this.toastr.error('Erro ao restaurar sócios, contate um administrador.'); 
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
}
