import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Atividade } from '../home/atividade';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  novaAtividade = '';
  atividades: Atividade[] = [];
  atividadesBackup: string[] = [];
  nome: string;
  peso: number | undefined;


  constructor(
    private storage: Storage,
    private toast: ToastController
  ) {
    this.iniciarBanco();
  }

  async iniciarBanco() {
    await this.storage.create();
    this.atividades = await this.storage.get('atividades') ?? [];
  }

  async adicionarAtividade() {
    const atividades = { nome: this.novaAtividade, peso: undefined };
    this.atividades.push(atividades);
    this.novaAtividade = '';
    await this.storage.set('atividades', this.atividades);
    console.log(this.atividades);
  }

  async atualizarAtividade() {
    await this.storage.set('atividades', this.atividades);
  }

  async apagarAtividade(index = 0) {
    this.atividades.splice(index, 1);
    await this.storage.set('atividades', this.atividades);
  }
}
