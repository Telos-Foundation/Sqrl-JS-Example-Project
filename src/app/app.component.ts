import { Component, OnInit } from '@angular/core';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import * as Eos from 'eosjs';
import { Observable } from 'rxjs/Observable';

import { NotificationsService } from 'angular2-notifications';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/dom/webSocket';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/throttleTime';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  isConnected: boolean = false;
  loadingMessage: string = '';
  appName: string;
  appNameFC: FormControl;
  applicationName$: Observable<string>;
  account;
  data;

  private _scatter: any = {};
  options = {
      position: ['top', 'right'],
      timeOut: 5000,
      lastOnBottom: true,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true,
      animate: 'scale'
  };

  blockchain = {
    name: 'TELOS',
    id: 'tlos'
  };

  network = {
    blockchain: this.blockchain.name,
    keyPrefix: "EOS",
    protocol: 'http',
    host: '18.223.79.140',
    port: 8888,
    chainId: '335e60379729c982a6f04adeaad166234f7bf5bf1191252b8941783559aec33e'
  };

  responsesToDisplay = {
    identity: {
      isError: false,
      response: {}
    }
  };

  constructor(
    private notifications: NotificationsService
  ) {}

  get scatter() {
    return this._scatter;
  }

  get identity() {
    return this._scatter.identity;
  }

  get accounts() {
    return this._scatter.identity.accounts || [];
  }

  ngOnInit() {
    ScatterJS.plugins(new ScatterEOS());
    this._scatter = ScatterJS.scatter;

    this.appNameFC = new FormControl('');
    this.appNameFC.valueChanges
      .map((name) => name.trim().toUpperCase().replace(/ /g, "_"))
      .do((name) => this.appName = name)
      .subscribe();
    
    this.appNameFC.setValue('MY_TELOS_APP');
  }

  connectToWallet() {
    this.isLoading = true;
    this.loadingMessage = 'Please wait ...';

    this.connect$()
      .finally(() => {this.isLoading = false; this.loadingMessage = '';})
      .do((connected) => connected ? this.notifications.success('Connected') : this.notifications.error('Connection attempt timed out!'))
      .subscribe();
  }

  forgetIdentity() {
    this.isLoading = true;
    this.loadingMessage = 'Please wait ...';

    this.forgetIdentity$()
      .finally(() => {this.isLoading = false; this.loadingMessage = '';})
      .do(() => this.notifications.success('Logged out...'))
      .catch((error) => {
        this.data = error;
        this.notifications.error('FAIL forgetting identity');
        return Observable.of(null);
      })
      .subscribe();
  }

  getIdentity() {
    this.isLoading = true;
    this.loadingMessage = 'Check Sqrl ...';

    this.getIdentity$()
      .finally(() => {this.isLoading = false; this.loadingMessage = '';})
      .do((response: any) => {
        if (response.isConnected === false)
          this.notifications.info('You have to connect to the wallet!');
        else if (response.hasIdentity)
          this.notifications.info('You already have an identity!');
        else {
          this.data = response;
          this.notifications.success('OK identity');
        }
      })
      .catch((error) => {
        this.data = error;
        this.notifications.error('FAIL identity');
        return Observable.of(null);
      }).subscribe();
  }

  authenticate() {
    this.isLoading = true;
    this.loadingMessage = 'Please wait ...';

    this.authenticate$()
      .finally(() => {this.isLoading = false; this.loadingMessage = '';})
      .do((response: any) => {
        this.data = response;
        this.notifications.success('SIGNED origin !');
      })
      .catch((error) => {
        this.data = error;
        this.notifications.error('FAIL auth');
        return Observable.of(null);
      }).subscribe();
  }

  fewTransactions(data) {
    this.isLoading = true;
    this.loadingMessage = 'Check Sqrl ...';

    this.fewTransactions$(data)
      .finally(() => {this.isLoading = false; this.loadingMessage = '';})
      .do((response: any) => {
        this.data = response;
        this.notifications.success('DONE few transaction!');
      })
      .catch((error) => {
        this.data = error;
        let errorMessage;

        switch (typeof error) {
          case 'string':
            errorMessage = error;
            break;
          case 'object':
            errorMessage = error.message;
            break;
          default:
            errorMessage = 'Error transactions ...'
        }

        this.notifications.error(errorMessage);
        return Observable.of(null);
      }).subscribe();
  }

  manyTransactions(data) {
    this.isLoading = true;
    this.loadingMessage = 'Check Sqrl ...';

    this.manyTransactions$(data)
      .finally(() => {this.isLoading = false; this.loadingMessage = '';})
      .do((response: any) => {
        this.data = response;
        this.notifications.success('DONE many transaction!');
      })
      .catch((error) => {
        this.data = error;
        let errorMessage;

        switch (typeof error) {
          case 'string':
            errorMessage = error;
            break;
          case 'object':
            errorMessage = error.message;
            break;
          default:
            errorMessage = 'Error transactions ...'
        }

        this.notifications.error(errorMessage);
        return Observable.of(null);
      }).subscribe();
  }

  private connect$() {
    // Optional!
    const connectionOptions = { initTimeout: 10000 }

    return Observable.fromPromise(this.scatter.connect(this.appName, connectionOptions))
      .do(() => this.isConnected = true);
  }

  private getIdentity$() {
    const requiredFields = { accounts: [this.network] };

    if (!this.isConnected)
      return Observable.of({isConnected: false});

    if (this._scatter.identity)
      return Observable.of({hasIdentity: true}); 

    return Observable.fromPromise(this.scatter.getIdentity(requiredFields));
  }

  private forgetIdentity$() {
    return Observable.fromPromise(this.scatter.forgetIdentity())
      .do(() => this.isConnected = false)
      .do(() => this.data = undefined)
      .do(() => this.account = undefined);
  }

  private authenticate$() {
    const requiredFields = { accounts: [this.network] };

    const account = this.scatter.identity.accounts.find(x => x.blockchain === this.blockchain.id);
    // const account = scatter.identity.accounts.find(x => x.blockchain === 'tlos');
    // const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    this.account = account;

    const transactionOptions = { authorization: [`${account.name}@${account.authority}`] };
    const eosOptions = { expireInSeconds: 60, keyPrefix: "EOS" };
    const eos = this.scatter.eos(this.network, Eos, eosOptions);

    return Observable.fromPromise(this.scatter.authenticate("a1234567890a"));
  }

  private fewTransactions$(data) {
    const account = this.scatter.identity.accounts.find(x => x.blockchain === this.blockchain.id);
    const transactionOptions = { authorization: [`${account.name}@${account.authority}`] };
    const eosOptions = { expireInSeconds: 60, keyPrefix: "EOS" };
    const eos = this.scatter.eos(this.network, Eos, eosOptions);

    const transaction = eos.transaction(tr => {
      tr.buyrambytes({
        "payer": data.buyrambytes.payer,
        "receiver": data.buyrambytes.receiver,
        "bytes": data.buyrambytes.bytes
      });

      tr.sellram({
        "account": data.sellram.account,
        "bytes": data.sellram.bytes
      });

      tr.delegatebw({
        "from": data.delegatebw.from,
        "stake_net_quantity": `${data.delegatebw.stake_net_quantity} TLOS`,
        "stake_cpu_quantity": `${data.delegatebw.stake_cpu_quantity} TLOS`,
        "transfer": data.delegatebw.transfer,
        "receiver": data.delegatebw.receiver
      });

      tr.voteproducer({
        "voter": data.voteproducer.voter,
        "proxy": data.voteproducer.proxy,
        "producers": data.voteproducer.producers
      });

      tr.transfer({
        "from": data.transfer.from,
        "to": data.transfer.to,
        "quantity": `${data.transfer.quantity} TLOS`,
        "memo": data.transfer.memo
      });

    }, transactionOptions);

    return Observable.fromPromise(transaction);
  }

  private manyTransactions$(data) {
    const account = this.scatter.identity.accounts.find(x => x.blockchain === this.blockchain.id);
    const transactionOptions = { authorization: [`${account.name}@${account.authority}`] };
    const eosOptions = { expireInSeconds: 60, keyPrefix: "EOS" };
    const eos = this.scatter.eos(this.network, Eos, eosOptions);

    const transaction = eos.transaction(tr => {
      tr.newaccount({
        "creator": data.newaccount.creator,
        "name": data.newaccount.name,
        "owner": data.newaccount.owner,
        "active": data.newaccount.active
      });

      tr.buyrambytes({
        "payer": data.buyrambytes.payer,
        "receiver": data.buyrambytes.receiver,
        "bytes": data.buyrambytes.bytes
      });

      tr.buyram({
        "payer": data.buyram.payer,
        "receiver": data.buyram.receiver,
        "quant": `${data.buyram.quant} TLOS`
      });

      tr.sellram({
        "account": data.sellram.account,
        "bytes": data.sellram.bytes
      });

      tr.delegatebw({
        "from": data.delegatebw0.from,
        "stake_net_quantity": `${data.delegatebw0.stake_net_quantity} TLOS`,
        "stake_cpu_quantity": `${data.delegatebw0.stake_cpu_quantity} TLOS`,
        "transfer": data.delegatebw0.transfer,
        "receiver": data.delegatebw0.receiver
      });

      tr.delegatebw({
        "from": data.delegatebw1.from,
        "stake_net_quantity": `${data.delegatebw1.stake_net_quantity} TLOS`,
        "stake_cpu_quantity": `${data.delegatebw1.stake_cpu_quantity} TLOS`,
        "transfer": data.delegatebw1.transfer,
        "receiver": data.delegatebw1.receiver
      });

      tr.delegatebw({
        "from": data.delegatebw2.from,
        "stake_net_quantity": `${data.delegatebw2.stake_net_quantity} TLOS`,
        "stake_cpu_quantity": `${data.delegatebw2.stake_cpu_quantity} TLOS`,
        "transfer": data.delegatebw2.transfer,
        "receiver": data.delegatebw2.receiver
      });

      tr.undelegatebw({
        "from": data.undelegatebw0.from,
        "unstake_net_quantity": `${data.undelegatebw0.unstake_net_quantity} TLOS`,
        "unstake_cpu_quantity": `${data.undelegatebw0.unstake_cpu_quantity} TLOS`,
        "receiver": data.undelegatebw0.receiver
      });

      tr.undelegatebw({
        "from": data.undelegatebw1.from,
        "unstake_net_quantity": `${data.undelegatebw1.unstake_net_quantity} TLOS`,
        "unstake_cpu_quantity": `${data.undelegatebw1.unstake_cpu_quantity} TLOS`,
        "receiver": data.undelegatebw1.receiver
      });

      tr.regproducer({
        "producer": data.regproducer.producer,
        "producer_key": data.regproducer.producer_key,
        "url": data.regproducer.url,
        "location": data.regproducer.location
      });

      tr.unregprod({
        "producer": data.unregprod.producer
      });

      tr.voteproducer({
        "voter": data.voteproducer.voter,
        "proxy": data.voteproducer.proxy,
        "producers": data.voteproducer.producers
      });

      tr.voteproducer({
        "voter": data.voteproducer1.voter,
        "proxy": data.voteproducer1.proxy,
        "producers": data.voteproducer1.producers
      });

      tr.voteproducer({
        "voter": data.voteproducer2.voter,
        "proxy": data.voteproducer2.proxy,
        "producers": data.voteproducer2.producers
      });

      tr.transfer({
        "from": data.transfer.from,
        "to": data.transfer.to,
        "quantity": `${data.transfer.quantity} TLOS`,
        "memo": data.transfer.memo
      });

      tr.claimrewards({
        "owner": data.claimrewards.owner
      })

      tr.setalimits({
        "account": data.setalimits.account,
        "ram_bytes": data.setalimits.ram_bytes,
        "net_weight": data.setalimits.net_weight,
        "cpu_weight": data.setalimits.cpu_weight
      });

    }, transactionOptions);

    return Observable.fromPromise(transaction);
  }
}
