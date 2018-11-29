import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-many-actions',
  templateUrl: './many-actions.component.html',
  styleUrls: ['./many-actions.component.css']
})
export class ManyActionsComponent implements OnInit, OnChanges {
  formGroup: FormGroup;

  @Input()
  account;

  @Input()
  key;

  @Output()
  onSend = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.formGroup = this._createFormGoup();

    if (this.account && this.account.name)
      this.formGroup.patchValue(this._getPatchValue(this.account.name, this.key));
  }

  ngOnChanges() {
    if (this.formGroup && this.account && this.account.name)
      this.formGroup.patchValue(this._getPatchValue(this.account.name, this.key));
  }

  send() {
    if (!this.formGroup.valid) return;

    const value = Object.assign({}, this.formGroup.value);

    this.onSend.emit(value);
  }

  private _getPatchValue(name: string, key: string) {
    return {
      newaccount: {
        creator: name,
        owner: key,
        active: key
      },
      buyrambytes: {
        payer: name,
      },
      buyram: {
        payer: name,
        receiver: name
      },
      sellram: {
        account: name,
      },
      delegatebw0: {
        from: name,
        receiver: name
      },
      delegatebw1: {
        from: name,
        receiver: name
      },
      delegatebw2: {
        from: name,
        receiver: name
      },
      undelegatebw0: {
        from: name,
        receiver: name
      },
      undelegatebw1: {
        from: name,
        receiver: name
      },
      regproducer: {
        producer: name,
        producer_key: key
      },
      unregprod: {
        producer: name
      },
      voteproducer: {
        voter: name
      },
      voteproducer1: {
        voter: name
      },
      voteproducer2: {
        voter: name
      },
      transfer: {
        from: name
      },
      claimrewards: {
        owner: name
      },
      setalimits: {
        account: name
      }
    }
  }

  private _createFormGoup() {
    return new FormGroup({
      newaccount: new FormGroup({
        creator: new FormControl({value: '', disabled: false}, [Validators.required]),
        name: new FormControl('testaccoun44', [Validators.required]),
        owner: new FormControl('', [Validators.required]),
        active: new FormControl('', [Validators.required])
      }),

      buyrambytes: new FormGroup({
        payer: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl('testaccoun44', [Validators.required]),
        bytes: new FormControl(128, [Validators.required, Validators.min(0)])
      }),

      buyram: new FormGroup({
        payer: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl({value: '', disabled: false}, [Validators.required]),
        quant: new FormControl(0.1, [Validators.required, Validators.min(0)])
      }),

      sellram: new FormGroup({
        account: new FormControl({value: '', disabled: false}, [Validators.required]),
        bytes: new FormControl(128, [Validators.required, Validators.min(0)])
      }),

      delegatebw0: new FormGroup({
        from: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl('', [Validators.required]),
        stake_net_quantity: new FormControl(0.001, [Validators.required, Validators.min(0)]),
        stake_cpu_quantity: new FormControl(0.002, [Validators.required, Validators.min(0)]),
        transfer: new FormControl({value: 0, disabled: false}, [Validators.required])
      }),

      delegatebw1: new FormGroup({
        from: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl('', [Validators.required]),
        stake_net_quantity: new FormControl(0.002, [Validators.required, Validators.min(0)]),
        stake_cpu_quantity: new FormControl(0.001, [Validators.required, Validators.min(0)]),
        transfer: new FormControl({value: 1, disabled: false}, [Validators.required])
      }),

      delegatebw2: new FormGroup({
        from: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl('', [Validators.required]),
        stake_net_quantity: new FormControl(0.002, [Validators.required, Validators.min(0)]),
        stake_cpu_quantity: new FormControl(0.002, [Validators.required, Validators.min(0)]),
        transfer: new FormControl({value: 0, disabled: false}, [Validators.required])
      }),

      undelegatebw0: new FormGroup({
        from: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl('', [Validators.required]),
        unstake_net_quantity: new FormControl(0.001, [Validators.required, Validators.min(0)]),
        unstake_cpu_quantity: new FormControl(0.001, [Validators.required, Validators.min(0)]),
      }),

      undelegatebw1: new FormGroup({
        from: new FormControl({value: '', disabled: false}, [Validators.required]),
        receiver: new FormControl('', [Validators.required]),
        unstake_net_quantity: new FormControl(0.001, [Validators.required, Validators.min(0)]),
        unstake_cpu_quantity: new FormControl(0.001, [Validators.required, Validators.min(0)]),
      }),

      regproducer: new FormGroup({
        producer: new FormControl({value: '', disabled: false}, [Validators.required]),
        producer_key: new FormControl({value: '', disabled: false}, [Validators.required]),
        url: new FormControl('protocol://host:port', [Validators.required]),
        location: new FormControl(13, [Validators.required, Validators.min(0)]),
      }),

      unregprod: new FormGroup({
        producer: new FormControl({value: '', disabled: false}, [Validators.required])
      }),

      voteproducer: new FormGroup({
        voter: new FormControl({value: '', disabled: false}, [Validators.required]),
        proxy: new FormControl('', []),
        producers: new FormControl(["21zephyr1111", "amplifiedtls", "beyondbtctls", "blindblocart", "bpeosindexio", "cryptosuviio", "csxcommunity", "eosawakeiobp", "eossandiego1", "goodblocktls", "kainosblkpro", "okayplanetbp", "swedencornet", "telasiachina", "telgoingos13", "teloscantons", "telosdacnode", "telosgermany", "telosglobal1", "telosgreenbp", "telosinspace", "telosintasia", "telosmadrid1", "telosmedinod", "telossuperbp", "telosuknodes", "telosunlimit", "theteloscope", "tlosimperabp", "votedutcheos"], [])
      }),

      voteproducer1: new FormGroup({
        voter: new FormControl({value: '', disabled: false}, [Validators.required]),
        proxy: new FormControl('', []),
        producers: new FormControl([], [])
      }),

      voteproducer2: new FormGroup({
        voter: new FormControl({value: '', disabled: false}, [Validators.required]),
        proxy: new FormControl('amplifiedtls', []),
        producers: new FormControl([], [])
      }),

      transfer: new FormGroup({
        from: new FormControl({value: '', disabled: false}, [Validators.required]),
        to: new FormControl('testaccoun54', [Validators.required]),
        quantity: new FormControl(0.0001, [Validators.required, Validators.min(0)]),
        memo: new FormControl('testing wi2', [Validators.required])
      }),

      claimrewards: new FormGroup({
        owner: new FormControl({value: '', disabled: false}, [Validators.required])
      }),

      setalimits: new FormGroup({
        account: new FormControl({value: '', disabled: false}, [Validators.required]),
        ram_bytes: new FormControl(128, [Validators.required, Validators.min(0)]),
        net_weight: new FormControl(128, [Validators.required, Validators.min(0)]),
        cpu_weight: new FormControl(128, [Validators.required, Validators.min(0)])
      })
    });
  }
}
