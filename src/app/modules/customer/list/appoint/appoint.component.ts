import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from '../../../../ng-relax/decorators/drawer.decorator';

@Component({
  selector: 'app-appoint',
  templateUrl: './appoint.component.html',
  styleUrls: ['./appoint.component.scss']
})
export class AppointComponent implements OnInit {

  @Input() id;

  @Input() userInfo;
  
  formGroup: FormGroup;

  communityList: any[] = [];
  cardList: any[] = [];
  teacherList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [this.userInfo.name, [Validators.required]],
      nick: [this.userInfo.nick],
      sex: [this.userInfo.sex, [Validators.required]],
      monthAge: [this.userInfo.monthAge, [Validators.required]],
      babyType: [this.userInfo.babyType, [Validators.required]],
      communityId: [this.userInfo.communityId, [Validators.required]],
      cardId: [],
      spec: [0],
      reserveDate: [, [Validators.required]],
      reserveHour: [, [Validators.required]],
      swimTeacherId: [, [Validators.required]],
      ringId: [],
      comment: []
    });
    this.formGroup.patchValue(this.userInfo);
    this.http.post('/member/communityList', {}, false).then(res => this.communityList = res.result);
    this.http.post('/memberCard/getMemberCards', { memberId: this.id }, false).then(res => this.cardList = res.result);
    this.http.post('/tongka/teacherList', {}, false).then(res => this.teacherList = res.result);
  }

  @DrawerSave('/reserve/createReserve') save: () => Promise<boolean>;


  _disabledDate(current: Date): boolean {
    return current && current.getTime() < Date.now();
  }
  _disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5]
  }

}
