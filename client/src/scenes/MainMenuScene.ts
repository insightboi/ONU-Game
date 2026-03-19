import Phaser from 'phaser';
import { getSocket } from '../network/socket';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create() {
    const { width, height } = this.scale;
    const socket = getSocket();

    // 1. Display title "ONU Game" at top center
    this.add.text(width / 2, 100, 'ONU Game', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // 2. Create button: "Create Room"
    const createBtnBg = this.add.rectangle(width / 2, height / 2 - 50, 200, 50, 0x444444)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height / 2 - 50, 'Create Room', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    createBtnBg.on('pointerdown', () => {
      socket.emit('c:createRoom');
    });

    // 3 & 4. Create button: "Join Room" and ask for room ID via prompt
    const joinBtnBg = this.add.rectangle(width / 2, height / 2 + 50, 200, 50, 0x444444)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height / 2 + 50, 'Join Room', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    joinBtnBg.on('pointerdown', () => {
      const roomId = window.prompt('Enter Room ID:');
      if (roomId && roomId.trim() !== '') {
        socket.emit('c:joinRoom', roomId.trim());
      }
    });

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
