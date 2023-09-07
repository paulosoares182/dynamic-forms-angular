import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomForm } from 'src/app/core/models/custom-form.model';
import { RecordService } from 'src/app/core/services/record.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  customForm: ICustomForm | null = null
  record?: any

  constructor(
    private route: ActivatedRoute,
    private service: RecordService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.refresh();
      this.load(params["formName"]);
    });
  }

  refresh(): void {
    this.customForm = null;
    this.changeDetectorRef.detectChanges();
  }

  load(formName: string): void {
    this.service.getCustomForm(formName).pipe(
      take(1)
    ).subscribe(payload => {
      this.customForm = payload;
    })
  }
}
