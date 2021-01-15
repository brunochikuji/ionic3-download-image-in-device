import { NgModule }            from '@angular/core';
import { CdvPhotoLibraryPipe } from './cdv-photo-library.pipe';
                   
@NgModule({
    declarations: [ CdvPhotoLibraryPipe ],
    exports: [ CdvPhotoLibraryPipe ]
})

export class CdvPhotoLibraryPipeModule { }