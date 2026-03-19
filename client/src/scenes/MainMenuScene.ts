import Phaser from 'phaser';
import { getSocket } from '../network/socket';

export class MainMenuScene extends Phaser.Scene {
  private roomIdInput: string = '';

  constructor() {
    super('MainMenuScene');
  }

  create() {
    const { width, height } = this.scale;
    const socket = getSocket();

    // 1. Display title: "ONU Game"
    this.add.text(width / 2, height / 2 - 150, 'ONU Game', {
      fontSize: '64px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // 2. Create button: "Create Room"
    const createBtnBg = this.add.rectangle(width / 2, height / 2 - 30, 240, 50, 0x4285F4)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height / 2 - 30, 'Create Room', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    createBtnBg.on('pointerdown', () => {
      socket.emit('c:createRoom');
    });
    createBtnBg.on('pointerover', () => createBtnBg.setFillStyle(0x5c9aff));
    createBtnBg.on('pointerout', () => createBtnBg.setFillStyle(0x4285F4));

    // 3. Create input field (simple prompt)
    const inputBg = this.add.rectangle(width / 2, height / 2 + 50, 240, 40, 0x333333)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(2, 0x555555);
    const inputText = this.add.text(width / 2, height / 2 + 50, 'Click to enter Room ID', {
      fontSize: '18px',
      color: '#aaaaaa',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    inputBg.on('pointerdown', () => {
      const id = window.prompt('Enter Room ID:');
      if (id !== null && id.trim() !== '') {
        this.roomIdInput = id.trim();
        inputText.setText(this.roomIdInput);
        inputText.setColor('#ffffff');
      }
    });

    // 4. Create button: "Join Room"
    const joinBtnBg = this.add.rectangle(width / 2, height / 2 + 120, 240, 50, 0x34A853)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height / 2 + 120, 'Join Room', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    joinBtnBg.on('pointerdown', () => {
      if (this.roomIdInput) {
        socket.emit('c:joinRoom', this.roomIdInput);
      } else {
        window.alert('Please enter a Room ID first.');
      }
    });
    joinBtnBg.on('pointerover', () => joinBtnBg.setFillStyle(0x46c267));
    joinBtnBg.on('pointerout', () => joinBtnBg.setFillStyle(0x34A853));

    // 5. Listen for "s:roomState"
    const onRoomState = (roomData: any) => {
      this.scene.start('LobbyScene', roomData);
    };
    
    socket.on('s:roomState', onRoomState);

    // Clean up socket listener when scene shuts down
    this.events.on('shutdown', () => {
      socket.off('s:roomState', onRoomState);
    });
  }
}
