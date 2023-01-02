import { AfterViewInit, Component, Injector, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/common/base-component';

declare var $: any;
@Component({
  selector: 'app-manage-all',
  templateUrl: './manage-all.component.html',
  styleUrls: ['./manage-all.component.css']
})
export class ManageAllComponent extends BaseComponent implements OnInit, AfterViewInit {

  public isCreate = false;
  public list_slide: any;
  public slide: any;
  public user: any;
  public frmSlide: FormGroup;
  public file: any;
  public showUpdateModal: any;
  public doneSetupForm: any;
  public loc:any;
  public page: any = 1;
  public id: any;
  public pageSize: any = 2;
  public list_item: any;
  public totalItem: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.LoadData();
  }
  LoadData(){
    this.loc = localStorage.getItem('loc') || '';
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this._api.post('/api/Slide/search', { loc: this.loc, page: this.page, pageSize: this.pageSize, linh_ph: this.id }).subscribe(res => {
        this.list_slide = res.data;
        this.totalItem = res.totalItem;
        console.log(res.data);
        console.log(res.totalItem);
        setTimeout(() => {
          this.loadScripts('');
        });
      });
    });
  }
  public loadPage(page: any) {
    this._api.post('/api/Slide/search', {loc: this.loc,  page: page, pageSize: this.pageSize, linh_ph: this.id }).subscribe(res => {
      this.list_slide = res.data;
      this.totalItem = res.totalItem;
      console.log(res.totalItem);

      setTimeout(() => {
        this.loadScripts( '');
      });
    });
  }
  public loadData(pageSize:any) {
    this.pageSize = pageSize;
     this._api.post('/api/Slide/search', { loc: this.loc, page: 1, pageSize: pageSize, linh_ph: this.id }).subscribe(res => {
       this.list_slide = res.data;
       this.totalItem = res.totalItem;
       console.log(res.data);
       console.log(res.totalItem);

       setTimeout(() => {
         this.loadScripts('');
       });
     });
   }
  setDieuKienLoc(loc: any) {
    this.loc = loc;
    localStorage.setItem('loc',loc);
    this.loadData(this.pageSize);
  }
  ngAfterViewInit() {
    this.loadScripts('');
  }

  get link() {
    return this.frmSlide.get('txt_link')!;
  }



  public createModal() {
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.frmSlide = new FormGroup({
        'txt_link': new FormControl('', [Validators.required]),
      });
      this.doneSetupForm = true;
    });
  }
  public openUpdateModal(maSilde: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/Slide/Get-By-Id/' + maSilde).subscribe(res => {
        console.log(res);
        this.slide = res;
        console.log(res);
        this.frmSlide = new FormGroup({
          'txt_anh': new FormControl(this.slide.anh, []),
          'txt_link': new FormControl(this.slide.link, [Validators.required]),
        }, {
        });
        console.log(this.frmSlide);
        this.doneSetupForm = true;
      });
    });
  }
  public onRemove(maSilde: any) {
    this._api.delete('/api/Slide/delete-Slide', maSilde).subscribe(res => {
      alert('Xóa dữ liệu thành công');
      location.reload();
    });
  }
  public closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmSlide.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  OnSubmit(vl: any) {
    console.log(this.findInvalidControls())
    if (this.frmSlide.invalid) {
      return;
    }
    let obj: any = {};
    obj.Slides = {
      link: vl.txt_link,
      anh: vl.txt_anh,
    }
    console.log(obj);

    if (this.isCreate) {
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'user', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.Slides.anh = res.body.filePath;
            this._api.post('/api/Slide/create-Slide', obj.Slides).subscribe(res => {
              if (res && res.data) {
                alert('Thêm dữ liệu thành công');
                this.LoadData();
                location.reload();
                this.closeModal();
              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        this._api.post('/api/Slide/create-Slide', obj.Slides ).subscribe(res => {
          if (res && res.data) {

            alert('Thêm dữ liệu thành công');
            //
            this.LoadData();
            location.reload();
            this.closeModal();

          } else {
            alert('Có lỗi')
          }
        });
      }
    } else {
      obj.Slides.maSilde = this.slide.maSilde;
      //console.log(this.Slide.maSlide);
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'user', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.Slides.anh = res.body.filePath;
            this._api.post('/api/Slide/update-Slide', obj.Slides).subscribe(res => {
              if (res && res.data) {
                alert('Cập nhật dữ liệu thành công');
                console.log(obj.Slide);
                this.LoadData();
                location.reload();
                this.closeModal();

              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        this._api.post('/api/Slide/update-Slide', obj.Slides).subscribe(res => {
          if (res && res.data) {
            alert('Cập nhật dữ liệu thành công');
            console.log(obj.Slide);
            this.LoadData();
            location.reload();
            this.closeModal();

          } else {
            alert('Có lỗi')
          }
        });
      }
    }

  }
}

