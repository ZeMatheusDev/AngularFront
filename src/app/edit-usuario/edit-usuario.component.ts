import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent {
  nome = '';
  email = '';
  empresas: {id: number, nome: string}[] = [];
  empresaSelecionada = '';
  usuario = {};
  senha = '';
  token!: string;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(){
    axios.get('http://localhost:8000/api/getEmpresas').then(response => {
      if(response.data.empresas){
        this.empresas = response.data.empresas;        
      }
    })    
    this.token = this.route.snapshot.paramMap.get('token') || '';
    axios.post('http://localhost:8000/api/editUsuario', {token: this.token}).then(response => {
      if(response.data.empresa){
        this.usuario = response.data.empresa[0];     
        this.nome = response.data.empresa[0].nome;
        this.email = response.data.empresa[0].email;     
        this.empresaSelecionada = response.data.empresa[0].id_empresa;        
      }
    })    
  }

  editar(){
    if(this.email != '' && this.nome != '' && this.empresaSelecionada != '')
    axios.post('http://localhost:8000/api/updateUsuario', {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      empresaSelecionada: this.empresaSelecionada,
      token: this.token
    }).then(response => {
      if(response.data.mensagem == 'success'){       
        this.toastr.success('Sócio atualizado com sucesso!'); 
        this.router.navigate(['/listagem/socio']);
      }
      else{
        this.toastr.error('Erro ao atualizar sócio, contate um administrador.'); 
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
}