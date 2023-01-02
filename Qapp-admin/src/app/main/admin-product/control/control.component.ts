import { AfterViewInit, Component,Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/common/base-component';

declare var $: any;
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})

  export class ControlComponent extends BaseComponent implements OnInit, AfterViewInit {

    public isCreate = false;
    public list_slide: any;
    public slide: any;
    public user: any;
    public frmControl: FormGroup;
    public file: any;
    public showUpdateModal: any;
    public doneSetupForm: any;
    public loc:any;
    public page: any = 1;
    public id: any;
    public pageSize: any = 15;
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
        this._api.post('/api/SanPham/search', { loc: this.loc, page: this.page, pageSize: this.pageSize, srch: this.id }).subscribe(res => {
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
      this._api.post('/api/SanPham/search', {loc: this.loc,  page: page, pageSize: this.pageSize, srch: this.id }).subscribe(res => {
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
       this._api.post('/api/SanPham/search', { loc: this.loc, page: 1, pageSize: pageSize, srch: this.id }).subscribe(res => {
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
      return this.frmControl.get('txt_link')!;
    }
  

    public createModal() {
      this.showUpdateModal = true;
      this.isCreate = true;
      setTimeout(() => {
        $('#createUserModal').modal('toggle');
        this.frmControl = new FormGroup({
          'maDanhMuc': new FormControl('', [Validators.required]),
          'tenSanPham':  new FormControl('', [Validators.required]),
          'moTaSanPham':  new FormControl('', [Validators.required]),
          'anhDaiDien':  new FormControl('', []),
          'maNhaSanXuat':  new FormControl('', [Validators.required]),
          'linkdownload':  new FormControl('', [Validators.required]),
          'Gia': new FormControl('', [Validators.required]),
        });
        this.doneSetupForm = true;
        console.log(this.frmControl);
        
      });
    }
    public openUpdateModal(maSanPham: any) {
      this.showUpdateModal = true;
      this.doneSetupForm = false;
      this.isCreate = false;
      setTimeout(() => {
        $('#createUserModal').modal('toggle');
        this._api.get('/api/SanPham/get-by-id/' + maSanPham).subscribe(res => {
          console.log(res);
          //debugger;
          this.slide = res;
          console.log(res);
          this.frmControl = new FormGroup({
          'maDanhMuc': new FormControl(this.slide.kq.maDanhMuc, [Validators.required]),
          'tenSanPham':  new FormControl(this.slide.kq.tenSanPham, [Validators.required]),
          'moTaSanPham':  new FormControl('', [Validators.required]),
          'anhDaiDien':  new FormControl('', []),
          'maNhaSanXuat':  new FormControl('', [Validators.required]),
          'linkdownload':  new FormControl('', [Validators.required]),
          'Gia': new FormControl('', [Validators.required]),
          });
          console.log(this.frmControl);
          this.doneSetupForm = true;
        });
      });
    }
    public onRemove(maSanPham: any) {
      this._api.delete('/api/SanPham/delete-Product', maSanPham).subscribe(res => {
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
      const controls = this.frmControl.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      return invalid;
    }
    OnSubmit(vl: any) {
      console.log(this.findInvalidControls())
      if (this.frmControl.invalid) {
        return;
      }
      let obj: any = {};
      obj.Slides = {
        
        maDanhMuc: vl.maDanhMuc,
        tenSanPham: vl.tenSanPham,
        moTaSanPham: vl.moTaSanPham,
        anhDaiDien: vl.anhDaiDien,
        maNhaSanXuat: vl.maNhaSanXuat,
        linkdownload: vl.linkdownload,
      }
      console.log(obj);
  
      if (this.isCreate) {
        if (this.file) {
          this._api.uploadFileSingle('/api/upload/upload-single', '123', this.file).subscribe((res: any) => {
            if (res && res.body && res.body.filePath) {
              obj.Slides.anhDaiDien = res.body.filePath;
              debugger;
              this._api.post('/api/SanPham/create-Product', obj.Slides).subscribe(res => {
                if (res && res.data) {
                  debugger;
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
          this._api.post('/api/SanPham/create-Product', obj.Slides ).subscribe(res => {
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
        obj.Slides.maSanPham = this.slide.maSanPham;
        //console.log(this.Slide.maSlide);
        if (this.file) {
          this._api.uploadFileSingle('/api/upload/upload-single', '123', this.file).subscribe((res: any) => {
            if (res && res.body && res.body.filePath) {
              obj.Slides.anh = res.body.filePath;
              this._api.post('/api/SanPham/update-Slide', obj.Slides).subscribe(res => {
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
          this._api.post('/api/SanPham/update-Slide', obj.Slides).subscribe(res => {
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
  