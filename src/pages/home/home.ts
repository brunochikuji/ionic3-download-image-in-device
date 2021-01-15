import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LibraryItem, PhotoLibrary} from '@ionic-native/photo-library';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public test = {thumbnailURL:"cdvphotolibrary://thumbnail?photoId=137975%3B%2Fstorage%2Femulated%2F0%2FWhatsApp%2FMedia%2FWhatsApp%20Images%2FIMG-20210113-WA0005.jpg&width=100&height=100&quality=0.8"}
	public items: Array<LibraryItem> = [];
	public items2: Array<LibraryItem> = [];
    public propertyCode: string;
    public propertyPhotos: any;
    public selectedlibraryItems: Array<LibraryItem> = [];
    public showLoading: boolean;
	
	constructor(
		private file: File,
		public navCtrl: NavController,
		private photoLibrary: PhotoLibrary,
		private transfer: FileTransfer,
		public platform: Platform,
	) { }

	ngOnInit() {
		this.platform.ready().then(() => {
			this.fetchPhotos();
		});
	}

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

	fetchPhotos() {
		let options = {
			thumbnailWidth: 100,
			thumbnailHeight: 100,
			quality: 0.8,
			itemsInChunk: 30,
			chunkTimeSec: 0.1,
			useOriginalFileNames: false,
		};
		if (window.indexedDB) {
			console.log('I have WKWebview installed!');
		} else {
			console.log('I have UIWebView installed!');
		}
		this.photoLibrary.requestAuthorization().then(
			() => {
				this.photoLibrary.getLibrary(options).subscribe(
					async photosLibrary => {
						// console.log(photosLibrary);
						// console.log('\n\n------------------------------------------------'); 
						// console.log(photosLibrary[0].id);          // ID of the photo
						// console.log(photosLibrary[0].photoURL);    // Cross-platform access to photo
						// console.log('thumbnailURL ' + photosLibrary[0].thumbnailURL);// Cross-platform access to thumbnail
						// console.log(photosLibrary[0].fileName);
						// console.log(photosLibrary[0].width);
						// console.log(photosLibrary[0].height);
						// console.log(photosLibrary[0].creationDate);
						// console.log(photosLibrary[0].latitude);
						// console.log(photosLibrary[0].longitude);
						// console.log(photosLibrary[0].albumIds);
						// if (this._platform.is('ios')) {
						//     await photosLibrary.map(async photo => {
						//         let options: GetThumbnailOptions = {
						//             thumbnailHeight: 100,
						//             thumbnailWidth: 100
						//         };
						//         await this.photoLibrary.getThumbnail(photo, options).then(async blob => {
						//             fileToBase64(blob).then(base64 => {
						//                 photo.thumbnailURL = base64 as string;
						//             });
						//         });
						//         return photo;
						//     });
						// }
						// else {
						//     console.log('\n\nelse')
						//     await photosLibrary.map(async photo => {
						//         if (photo.id.split(';').length > 0)
						//             photo.thumbnailURL = normalizeURL('file://' + photo.id.split(';')[1]);
						//         return photo;
						//     });
						// }
						this.items = this.items.concat(photosLibrary);
						// console.log(this.items);
						this.showLoading = false;
					},
					(error) => {
						console.log('error');
						console.log(error);
					}
				);
			}
		).catch(
			(error) => {
				console.log('error');
				console.log(error);
			}
		);
	}

	print() {
		this.items2 = this.items.slice(0, 45);
		console.log(this.items2);
	}
}
