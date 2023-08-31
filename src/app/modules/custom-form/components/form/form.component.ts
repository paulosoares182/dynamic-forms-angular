import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBase } from 'src/app/shared/common/form-base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends FormBase implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    formBuilder: FormBuilder) {
    super(formBuilder)
  }

  ngOnInit(): void {
    console.log("form")
    this.buildForm();
  }

  override onSubmit(): void {
    console.log(this.mapper())
    this.onSuccessfullySubmitted()
  }

  override onSuccessfullySubmitted(): void {
    if (this.hasNext()) {
      this.router.navigate([`../${this.customForm.next}`], { relativeTo: this.activatedRoute })
    }
  }

  override onFailureSubmitted(): void {

  }
}
