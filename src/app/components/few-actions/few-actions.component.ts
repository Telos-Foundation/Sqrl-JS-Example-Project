import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-few-actions',
  templateUrl: './few-actions.component.html',
  styleUrls: ['./few-actions.component.css']
})
export class FewActionsComponent implements OnInit, OnChanges {
  formGroup: FormGroup;

  @Input()
  account;

  @Output()
  onSend = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.formGroup = this._createFormGoup();

    if (this.account && this.account.name)
      this.formGroup.patchValue(this._getPatchValue(this.account.name));
  }

  ngOnChanges() {
    if (this.formGroup && this.account && this.account.name)
      this.formGroup.patchValue(this._getPatchValue(this.account.name));
  }

  send() {
    if (!this.formGroup.valid) return;

    const value = Object.assign({}, this.formGroup.value);

    this.onSend.emit(value);
  }

  private _getPatchValue(name: string) {
    return {
      buyrambytes: {
        payer: name,
      },
      sellram: {
        account: name,
      },
      delegatebw: {
        from: name,
        receiver: name
      },
      voteproducer: {
        voter: name
      },
      transfer: {
        from: name
      }
    }
  }

  private _createFormGoup() {
    return new FormGroup({
      buyrambytes: new FormGroup({
        payer: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl('testaccoun44', [Validators.required]),
        bytes: new FormControl(128, [Validators.required, Validators.min(0)])
      }),

      sellram: new FormGroup({
        account: new FormControl({value: '', disabled: false}, [Validators.required]),
        bytes: new FormControl(128, [Validators.required, Validators.min(0)])
      }),

      delegatebw: new FormGroup({
        from: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl('', [Validators.required]),
        stake_net_quantity: new FormControl(0.002, [Validators.required, Validators.min(0)]),
        stake_cpu_quantity: new FormControl(0.002, [Validators.required, Validators.min(0)]),
        transfer: new FormControl({value: 0, disabled: false}, [Validators.required])
      }),

      voteproducer: new FormGroup({
        voter: new FormControl({value: '', disabled: false}, [Validators.required]),
        proxy: new FormControl('amplifiedtls', [Validators.required]),
        producers: new FormControl([], [])
      }),

      transfer: new FormGroup({
        from: new FormControl({value: '', disabled: false}, [Validators.required]),
        to: new FormControl('testaccoun54', [Validators.required]),
        quantity: new FormControl(0.0001, [Validators.required, Validators.min(0)]),
        memo: new FormControl('testing wi2', [Validators.required])
      })
    });
  }
}
