export enum Sender {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isError?: boolean;
}

export enum AppView {
  HOME = 'home',
  CHAT = 'chat',
  VISION = 'vision',
}

export interface DemoConfig {
  model: string;
  temperature: number;
}