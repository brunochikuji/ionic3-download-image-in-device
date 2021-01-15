import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer }        from '@angular/platform-browser';

@Pipe({name: 'readphotolibrary'})
export class CdvPhotoLibraryPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url: string) {
        if (url != null)
            return url.startsWith('cdvphotolibrary://') ? this.sanitizer.bypassSecurityTrustUrl(url) : url;
    }
}