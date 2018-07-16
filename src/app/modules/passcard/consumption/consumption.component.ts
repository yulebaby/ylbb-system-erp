import { HttpClient } from '@angular/common/http';
import { AppState } from './../../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService } from '../../../../../node_modules/ng-zorro-antd';
import { QueryNode } from '../../../ng-relax/components/query/query.component';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {

  @ViewChild('BreadcrumbTmpt') breadcrumbTmpt: TemplateRef<any>;

  queryNode: QueryNode[] = [
    {
      label: '会员卡号',
      type: 'input',
      key: 'memberId',
      placeholder: '请输入会员卡号'
    },
    {
      label: '会员姓名',
      type: 'input',
      key: 'memberName ',
      placeholder: '请输入会员姓名'
    },
    {
      label: '消费日期',
      type: 'rangepicker',
      key: 'xiaofeiTime',
      valueKey: ['startDate', 'endDate']
    },
    {
      label: '服务泳师',
      type: 'select',
      key: 'teacherId',
      optionsUrl: '/tongka/teacherList',
      placeholder: '请选择服务泳师'
    },
    {
      label: '会员小名',
      type: 'input',
      key: 'nick ',
      placeholder: '请输入会员小名',
      isHide: true
    },
    {
      label: '婴儿类型',
      type: 'select',
      key: 'babyType ',
      options: [ { name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿'} ],
      placeholder: '请选择婴儿类型',
      isHide: true
    },
    {
      label: '消费商品',
      type: 'select',
      key: 'commodityId',
      optionsUrl: '/commodity/findList',
      placeholder: '请选择消费商品',
      isHide: true
    },
    {
      label: '业务类型',
      type: 'select',
      key: 'categoryId',
      optionsUrl: '/cardBusinessManagement/findList',
      placeholder: '请选择业务类型',
      isHide: true
    },
    {
      label: '卡类型',
      type: 'select',
      key: 'cardTypeId',
      optionsUrl: '/cardTypeManagement/findList',
      placeholder: '请选择卡类型',
      isHide: true
    },
    {
      label: '满意度',
      type: 'select',
      key: 'satisfaction',
      options: [{ name: '满意', id: '满意' }, { name: '表扬', id: '表扬' }, { name: '一般', id: '一般' }, { name: '不好', id: '不好' }],
      placeholder: '请选择满意度',
      isHide: true
    },
    {
      label: '消费类型',
      type: 'select',
      key: 'isCrossed',
      options: [{ name: '本店会员跨店', id: 1 }, { name: '它店会员到店', id: 2 }],
      placeholder: '请选择消费类型',
      isHide: true
    },
  ]

  tableThead: string[] = ['卡号', '卡类型', '姓名', '小名', '全国通卡跨店', '消费金额', '消费时间', '已使用卡次', '单次扣除卡次', '类型', '消费商品', '消费类型', '消费门店', '办卡门店', '服务泳师', '满意度', '体重', '泳圈型号', '游泳时长', '测量', '拍照', '备注']

  paramsDefault: any;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private message: NzMessageService,
    private datePipe: DatePipe
  ) {
    let nowDate = new Date();
    let noewDateString = this.datePipe.transform(nowDate, 'yyyy-MM-dd');
    this.paramsDefault = { startDate: noewDateString, endDate: noewDateString };
    this.queryNode[2].default = [nowDate, nowDate];
  }

  ngOnInit() {
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });
  }

}
