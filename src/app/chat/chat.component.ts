import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatChannel } from './chat-channel.model';
import { ChatMessage } from './chat-message.model';
import { SignalR } from 'ng2-signalr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  channels: Array<ChatChannel>;
  currentChannel: ChatChannel;
  newMessage: string;
  private readonly chatMessage = 'newChatMessage';

  constructor(private chatService: ChatService, private signalR: SignalR) { }

  ngOnInit() {
    this.chatService.getChannels()
      .subscribe(result => this.channels = result);

    this.listenForPushNotifications();
  }

  createChannel(): void {
    this.chatService.createChannel()
      .subscribe(result => {
        this.currentChannel = result;
        this.channels.push(result);
      });
  }

  selectChannel(channel: ChatChannel): void {
    this.currentChannel = channel;
    this.chatService.getMessages(channel.channelId)
      .subscribe(result => this.currentChannel.messages = result);
  }

  createMessage(message): void {
    if (message == null || message === '') {
      return;
    }
    this.chatService.createMessage(this.currentChannel.channelId, message)
      .subscribe(result => this.currentChannel.messages.push(result));
  }

  private listenForPushNotifications(): void {
    this.signalR.connect().then(connection => {
      connection.listenFor(this.chatMessage)
        .subscribe((message: ChatMessage) => {
          this.onPushReceived(message);
      });
    });
  }

  private onPushReceived(message: ChatMessage): void {
    const channels = this.channels.filter(channel => channel.channelId === message.channelId);

    if (channels.length) {
      const channel = channels[0];
      if (!channel.messages) {
        channel.messages = [];
      }
      channel.messages.push(message);
    }
  }

}
