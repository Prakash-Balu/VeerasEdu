import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  pusher: any;
  channel: any;

  constructor() {
    this.pusher = new Pusher('5c4c57966ccb9e52d4d8', {
      cluster: 'ap2',
    });
  }

  subscribe(
    channelName: string,
    eventName: string,
    callback: (data: any) => void
  ) {
    this.channel = this.pusher.subscribe(channelName);
    this.channel.bind(eventName, callback);
  }

  unsubscribe() {
    if (this.channel) {
      this.channel.unbind_all();
      this.channel.unsubscribe();
    }
  }
}
