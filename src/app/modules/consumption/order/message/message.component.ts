import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  @Input() id;

  @Input() recordInfo;

  formGroup: FormGroup;

  checkOptions: any[] = [{ label: '短信发送', value: '0' }, { label: '消息发送', value: '1' }]

  smsTemplateList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    this.http.post('/common/getStoreSmsTemplate').then(res => this.smsTemplateList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      mobilePhones: [this.recordInfo.mobilePhone, [Validators.required]],
      typeOptions: [this.checkOptions],
      type: [, [Validators.required]],
      template: [],
      memberName: [{ value: this.recordInfo.memberName, disabled: true }],
      memberNick: [{ value: this.recordInfo.memberNick, disabled: true }],
      swimTeacher: [{ value: this.recordInfo.swimTeacher, disabled: true }],
      title: [],
      content: [, [Validators.required]]
    });
    /* ----------------------- 短信内容根据模板自动填充 ----------------------- */
    this.formGroup.get('template').valueChanges.subscribe(id => {
      this.smsTemplateList.map(item => item.id === id && this.formGroup.patchValue({ content: item.memo }));
    });
  }

  changeCheckbox(e) {
    let value = '';
    e.map(res => res.checked && (value = value.length ? `${value},${res.value}` : res.value));
    this.formGroup.patchValue({ type: value });
  }

  saveLoading: boolean;
  @DrawerSave('/smsSend/sendSmsToConsume') save: () => void;
  @DrawerClose() close: () => void;

}
