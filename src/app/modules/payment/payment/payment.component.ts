import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  currentPage = 1;

  payType;

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      phone: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],
      remark: [],
      commodity: [, [Validators.required]],
      price: [, [Validators.required]]
    })
  }

  confirmLoading = false;
  confirmPrice() {
    if (this.formGroup.valid) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        this.currentPage = this.currentPage + 1;
      }, 2000);
    } else {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  confirmPay() {
    this.currentPage = this.currentPage + 1;
  }


  ngOnInit() {
  }

}