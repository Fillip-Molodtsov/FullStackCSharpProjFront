import {Component} from '@angular/core';
import {ZodiacFormBuilderService} from '../../shared/form-builder-services/zodiac-form-builder.service';
import {FormGroup} from '@angular/forms';
import {ZodiacResponse} from '../../shared/models/ZodiacResponse.model';
import {HttpZodiacService} from '../../shared/http-services/http-zodiac.service';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-zodiac',
  templateUrl: './zodiac.component.html',
  styleUrls: ['./zodiac.component.scss']
})
export class ZodiacComponent {

  public form: FormGroup;

  public zodiacResponse: ZodiacResponse;

  public errorMessage: HttpErrorResponse;

  public isLoaded = true;

  constructor(
    private zodiacFormBuilder: ZodiacFormBuilderService,
    private httpZodiacService: HttpZodiacService
  ) {
    this.form = zodiacFormBuilder.buildGroup();
  }

  private submit()
    : void {
    this.zodiacResponse = null;
    this.errorMessage = null;
    this.isLoaded = false;
    const {birthday: d} = this.form.value;
    const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.httpZodiacService
      .getZodiacTask(date)
      .pipe(
        finalize(() => {
          this.isLoaded = true;
        })
      )
      .subscribe(
        res => {
          this.zodiacResponse = res;
        },
        error => {
          this.errorMessage = error;
        });
  }
}
