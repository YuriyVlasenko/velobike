import { Component, OnInit, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import 'rxjs/add/operator/toPromise';
import { Cloudinary } from '@cloudinary/angular-4.x';

@Component({
  selector: 'photo-upload',
  templateUrl: './photo-upload.component.html'
})

export class PhotoUploadComponent implements OnInit {

  @Output() imageUploaded = new EventEmitter<{ url: string, width: number, height: number }>();

  private responses: Array<any>;
  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: Http
  ) {
    this.responses = [];
    this.title = '';
  }

  ngOnInit(): void {
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `myphotoalbum,${this.title}`;
      }
      form.append('tags', tags);
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        let { url, width, height } = fileItem.data;

        if (url) {
          this.imageUploaded.emit({ url, width, height })
        }

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      return upsertResponse({ file: item.file, status, data: JSON.parse(response) })

    }


    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      return upsertResponse({ file: fileItem.file, progress, data: {} });
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
