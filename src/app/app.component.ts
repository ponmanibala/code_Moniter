import { Component, OnInit } from '@angular/core';
import { COMMON_CONST } from './constant/common';
import { COMMON_CONSTANT } from './constant/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * variable used to store dynamic form group name
   */
  dynamicFormGroupName = COMMON_CONST.formGroupName;
  /**
 * variable used to common constant values
 */
  constant = COMMON_CONST;
  /**
   * variable used to store form group name
   */
  formGroup: any;
  /**
   * variable used to store today date
   */
  todayDate = new Date();
  /**
 * variable used to set minimum value for end date
 */
  minValueForEndDate: any;
  /**
 * variable used to find end date control
 */
  findEndDate: any;
  /**
 * variable used to find duration control
 */
  findDuration: any;
  /**
 * variable used to find start date control
 */
  findStartDate: any;
  /**
  * variable used to store dynamic form group name
  */
  dynamicAdultFormGroupName = COMMON_CONSTANT.formGroupName;
  /**
 * variable used to common constant values
 */
  adultConstant = COMMON_CONSTANT;
  /**
   * variable used to store form group name
   */
  adultFormGroup: any;
  /**
     * Angular life cyle hook that initiates the component.
     */
  ngOnInit() {
    if (this.dynamicAdultFormGroupName && COMMON_CONSTANT.adultFormControl) {
      this.adultFormGroup = new FormGroup({
        [this.dynamicAdultFormGroupName]: new FormGroup(this.createAdultFormControl(COMMON_CONSTANT.adultFormControl))
      });
    }
    if (this.dynamicFormGroupName && COMMON_CONST.CalculateFormControl) {
      this.formGroup = new FormGroup({
        [this.dynamicFormGroupName]: new FormGroup(this.createFormControl(COMMON_CONST.CalculateFormControl))
      });
    }
    if (COMMON_CONST && COMMON_CONST.CalculateFormControl && COMMON_CONST.CalculateFormControl.length) {
      this.findEndDate = this.findEndDateElement();
      this.findDuration = this.findDurationElement();
      this.findStartDate = this.findStartDateElement();
      COMMON_CONST.CalculateFormControl.forEach((control) => {
        if (this.constant && this.constant.formGroupName && control && control.controlName && this.formGroup && this.formGroup.controls && this.formGroup.controls[this.constant.formGroupName] && this.formGroup.controls[this.constant.formGroupName].get(control.controlName))
          this.formGroup.controls[this.constant.formGroupName].get(control.controlName).valueChanges.subscribe((date: any) => {
            this.onDateChange(control.controlName, date);
          });
      });
    }
  }
  /**
     * Method which is used to find start date element
     */
  findStartDateElement() {
    return COMMON_CONST.CalculateFormControl.find(value => { return value && (value.type === 'date' && value.start === 'true') })
  }
  /**
     * Method which is used to find end date element
     */
  findEndDateElement() {
    return COMMON_CONST.CalculateFormControl.find(value => { return value && (value.type === 'date' && value.end === 'true') })
  }
  /**
   * Method which is used to find duration date element
   */
  findDurationElement() {
    return COMMON_CONST.CalculateFormControl.find(value => { return value && value.type !== 'date' })
  }
  /**
   * Method which is used to calculate functionality
   */
  onDateChange(controlName: string, date: any) {
    if (this.findDuration && controlName === this.findDuration.controlName || (controlName === this.findStartDate.controlName)) {
      if (this.findStartDate && controlName === this.findStartDate.controlName) {
        this.minValueForEndDate = date;
        if (this.formGroup.controls[this.constant.formGroupName].get(this.findEndDate.controlName).value < this.formGroup.controls[this.constant.formGroupName].get(this.findStartDate.controlName).value) {
          this.formGroup.controls[this.constant.formGroupName].get(this.findEndDate.controlName).setValue(null, { emitEvent: false });
        }
      }
    }
    if ((controlName === this.findEndDate.controlName || controlName === this.findStartDate.controlName) && this.formGroup.controls[this.constant.formGroupName].get(this.findEndDate.controlName).value && this.formGroup.controls[this.constant.formGroupName].get(this.findStartDate.controlName).value) {
      this.calculateDurationBasedOnDates();
    }
    if ((controlName === this.findDuration.controlName || controlName === this.findStartDate.controlName) && this.formGroup.controls[this.constant.formGroupName].get(this.findDuration.controlName).value && this.formGroup.controls[this.constant.formGroupName].get(this.findStartDate.controlName).value) {
      this.calculateEndDateBasedOnDateAndDuration();
    }
  }
  /**
   * Method which is used to calculate duration value based n dates
   */
  calculateDurationBasedOnDates() {
    if (this.constant && this.constant.formGroupName && this.formGroup && this.formGroup.controls && this.formGroup.controls[this.constant.formGroupName]
      && ((this.formGroup?.controls[this.constant?.formGroupName].get(this.findEndDate.controlName) && this.formGroup?.controls[this.constant?.formGroupName].get(this.findEndDate.controlName).value) || (this.formGroup?.controls[this.constant?.formGroupName].get(this.findStartDate.controlName && this.formGroup?.controls[this.constant?.formGroupName].get(this.findStartDate.controlName).value)))) {
      let endDate = this.formGroup?.controls[this.constant?.formGroupName].get(this.findEndDate.controlName).value;
      let startDate = this.formGroup?.controls[this.constant?.formGroupName].get(this.findStartDate.controlName).value;
      if (endDate && startDate) {
        const findDiffernce = Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        this.formGroup?.controls[this.constant?.formGroupName].get(this.findDuration.controlName).setValue(findDiffernce, { emitEvent: false });
      }
    }
  }
  /**
   * Method which is used to calculate end date based on dates and duration
   */
  calculateEndDateBasedOnDateAndDuration() {
    let startDate = this.formGroup?.controls[this.constant?.formGroupName].get(this.findStartDate.controlName).value;
    const duration = this.formGroup?.controls[this.constant?.formGroupName].get(this.findDuration.controlName).value;
    if (startDate && duration >= 0) {
      const findEndDate = new Date(startDate);
      findEndDate.setDate(startDate.getDate() + Number(duration));
      this.formGroup?.controls[this.constant?.formGroupName].get(this.findEndDate.controlName).setValue(findEndDate);
    }
  }
  /**
     * by using this method we have create dynamic form control.
     */

  createFormControl(formControlName: any) {
    let controls: any = {};
    if (formControlName && formControlName.length) {
      for (const control of formControlName) {
        if (control && control.controlName) {
          const min = control && control.min;
          controls[control.controlName] = new FormControl(null, Validators.required)
          if (control.type !== 'date') {
            controls[control.controlName].setValidators([Validators.required, Validators.min(Number(min))]);
            controls[control.controlName].updateValueAndValidity();
          }
        }
      }
      return controls;
    }

  }
  /**
     * Method which is used to change one tab to another on that will bee called.
     */
  onTabChange(event: any) {
    if (event && event.tab && event.tab.textLabel) {
      if (event.tab.textLabel === 'Calculate Date And Duration') {
        if (this.adultConstant && this.adultConstant.formGroupName && this.adultFormGroup && this.adultFormGroup.controls && this.adultFormGroup.controls[this.adultConstant.formGroupName]) {
          this.adultFormGroup.controls[this.adultConstant.formGroupName].reset();
        }
      }
      else {
        if (this.constant && this.constant.formGroupName && this.formGroup && this.formGroup.controls && this.formGroup.controls[this.constant?.formGroupName]) {
          this.formGroup.controls[this.constant?.formGroupName].reset();
        }
      }
    }
  }

  /**
     * by using this method we have create dynamic form control.
     */

  createAdultFormControl(formControlName: any) {
    let controls: any = {};
    if (formControlName && formControlName.length) {
      for (const control of formControlName) {
        if (control && control.controlName) {
          controls[control.controlName] = new FormControl(null, Validators.required);
          if (control.readonly) {
            controls[control.controlName].disable();
          }
        }
      }
      return controls;
    }

  }
  /**
   * method which is used to display age rage based on choosing age group
   */
  setAgeRange(event: any) {
    let field = event && event.source && event.source.ngControl.name, findControl;
    COMMON_CONSTANT.adultFormControl.find((item) => {
      if (item && item.controlName !== field) {
        findControl = item.controlName;
      }
    })
    if (event && this.adultFormGroup && this.adultFormGroup.controls && this.adultFormGroup.controls[this.adultConstant.formGroupName] && this.adultFormGroup.controls[this.adultConstant.formGroupName].get(findControl)) {
      if (event.value === 'Infant') {
        this.adultFormGroup.controls[this.adultConstant.formGroupName].get(findControl).setValue('0-2 years');
      }
      else if (event.value === 'Child') {
        this.adultFormGroup.controls[this.adultConstant.formGroupName].get(findControl).setValue('3-12 years');
      }
      else if (event.value === 'Teenager') {
        this.adultFormGroup.controls[this.adultConstant.formGroupName].get(findControl).setValue('13-19 years');
      }
      else if (event.value === 'Young') {
        this.adultFormGroup.controls[this.adultConstant.formGroupName].get(findControl).setValue('20-39years');
      }
      else if (event.value === 'Adult') {
        this.adultFormGroup.controls[this.adultConstant.formGroupName].get(findControl).setValue('40-59 years');
      }
      else if (event.value === 'Senior') {
        this.adultFormGroup.controls[this.adultConstant.formGroupName].get(findControl).setValue('60+ years');
      }
    }
  }

}
