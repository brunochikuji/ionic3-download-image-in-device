import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileTransfer, FileTransferObject }     from '@ionic-native/file-transfer';
import { File }                                 from '@ionic-native/file';
import { PhotoLibrary }                         from '@ionic-native/photo-library';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private file: File,
    public navCtrl: NavController,
    private photoLibrary: PhotoLibrary,
    private transfer: FileTransfer
    ) { }

    downloadPhoto() {
      console.log('veio');
      let urlphoto: string = 'https://lh3.googleusercontent.com/NNyZEbSe0sEmsaRCQRPpJsHqOQo40_a9_L3Kwsy3kQb2jR96B0Pnf3fjWd3pyiVhExtgAYBR9BjVQ5VpFHpFbeeblumc629HX2q-OAf_IA';
      this.photoLibrary.requestAuthorization().then(() => {
        let url: string = encodeURI(urlphoto);
        let fileName: string = `${new Date().getTime().toString()}.jpg`;
        let fileTransfer: FileTransferObject = this.transfer.create();
        let filePath: string = `${this.file.dataDirectory}Download/${fileName}`;
        fileTransfer.download(url, filePath, true).then(
            teste => {
              alert('Baixou a imagem, olhe nos documentos');
              console.log(JSON.stringify(teste));
            }
          ).catch(error => {
              alert('Deu erro');
              console.log(JSON.stringify(error));
          });

      });

      }

}
