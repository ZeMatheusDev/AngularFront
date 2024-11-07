import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-socio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './socio.component.html',
  styleUrl: './socio.component.css'
})
export class SocioComponent {
  empresas: {id: number, nome: string}[] = [];
  nome = '';
  email = '';
  senha = '';
  empresaSelecionada = '';

  constructor(private toastr: ToastrService, private router: Router) {}
  
  ngOnInit(){
    axios.get('http://localhost:8000/api/getEmpresas').then(response => {
      if(response.data.empresas){
        this.empresas = response.data.empresas;
        console.log(this.empresas);
        
      }
    })    
  }

  cadastrar(){
    if(this.email != '' && this.nome != '' && this.empresaSelecionada != '' && this.senha != '')
    axios.post('http://localhost:8000/api/cadastrar/socio', {
      nome: this.nome,
      email: this.email,
      empresaSelecionada: this.empresaSelecionada,
      senha: this.senha
    }).then(response => {
      if(response.data.mensagem == 'success'){       
        this.toastr.success('Sócio cadastrada com sucesso!'); 
        this.router.navigate(['/']);
      }
      else{
        this.toastr.error('Erro ao cadastrar sócio, usuário já existe.'); 
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
}
