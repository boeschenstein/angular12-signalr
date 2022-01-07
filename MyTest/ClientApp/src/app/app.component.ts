import { Component } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';

  main() {
    var connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5197/signalrdemohub')
      .build();

    connection.on('DisplayMessage', (data: any) => {
      // check browser console
      console.warn('Hello! Client got message from server: data:', data);
    });
    connection.start().then(() => connection.invoke('Hello', 'Hi from client'));
  }

  constructor() {
    this.main();
  }
}
