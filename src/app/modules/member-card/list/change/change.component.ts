import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  @Input() id;
  @Input() memberCardInfo;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      memberName: [{ value: this.memberCardInfo.memberName, disabled: true }],
      times: [{ value: this.memberCardInfo.times, disabled: true }],
      changeTimes: [, [Validators.pattern(/^-?[1-9]\d*$/)]],
      freeTimes: [{ value: this.memberCardInfo.freeTimes, disabled: true }],
      changeFreeTimes: [, [Validators.pattern(/^-?[1-9]\d*$/)]],
      balance: [{ value: this.memberCardInfo.balance, disabled: true }],
      changeBalance: [, [Validators.pattern(/^\-?[0-9]+(\.\d{1,2})?$/)]],
      expireDate: [{ value: this.memberCardInfo.expireDate, disabled: true }],
      changeExpireDate: [this.memberCardInfo.expireDate],
      cardTypeName: [{ value: this.memberCardInfo.ctName, disabled: true }],
      cardType: [ this.memberCardInfo.cardTypeId ],
      changeCardType: [],
      turnCard: [],
      comment: []
    })
  }

  save(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.formGroup.invalid) {
        for (let i in this.formGroup.controls) {
          this.formGroup.controls[i].markAsDirty();
          this.formGroup.controls[i].updateValueAndValidity();
        }
        resolve(false);
      } else {
        this.http.post('/memberCard/changeCard', {
          paramJson: JSON.stringify(this.formGroup.value)
        }).then(res => resolve(true)).catch(err => resolve(false));
      }
    })
  }

}
