import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ICustomForm } from 'src/app/core/models/custom-form.model';
import { RecordService } from 'src/app/core/services/record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  destroyRef = inject(DestroyRef)
  
  customForm: ICustomForm | null = null
  record?: any

  constructor(
    private route: ActivatedRoute,
    private service: RecordService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.refresh();
      this.load(params["record"]);
    });
  }

  refresh(): void {
    this.customForm = null;
    this.changeDetectorRef.detectChanges();
  }

  load(record: string): void {
    this.service.getCustomForm(record).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(payload => {
      this.customForm = payload;
    })
  }
}
