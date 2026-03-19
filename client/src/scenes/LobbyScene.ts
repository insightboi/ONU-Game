import Phaser from 'phaser';
import { getSocket } from '../network/socket';

export class LobbyScene extends Phaser.Scene {
  private roomIdText!: Phaser.GameObjects.Text;
  private playersTexts: Phaser.GameObjects.Text[] = [];

  constructor() {
    super('LobbyScene');
  }

  create(data: any) {
    const socket = getSocket();
    
    // Basic title
    this.add.text(50, 50, 'Lobby', { fontSize: '32px', color: '#ffffff' });
    
    // 1. Show Room ID
    this.roomIdText = this.add.text(50, 100, `Room ID: ${data?.id || 'Unknown'}`, { 
      fontSize: '24px', 
      color: '#ffffff' 
    });
    
    // 4. Add "Waiting for players..." text
    this.add.text(50, 150, 'Waiting for players...', { 
      fontSize: '20px', 
      color: '#aaaaaa' 
    });

    // Initial render of players
    this.updatePlayers(data);

    // 2. Listen for "s:roomState"
    const onRoomState = (roomData: any) => {
      this.roomIdText.setText(`Room ID: ${roomData.id || 'Unknown'}`);
      this.updatePlayers(roomData);
    };

    socket.on('s:roomState', onRoomState);

    // Clean up listener on scene shutdown
    this.events.on('shutdown', () => {
      socket.off('s:roomState', onRoomState);
    });
  }

  private updatePlayers(roomData: any) {
    // Clear existing player texts
    this.playersTexts.forEach(text => text.destroy());
    this.playersTexts = [];

    if (!roomData || !roomData.players) return;

    let startY = 200;
    
    // Handle both array and object map structures for players
    const playersList = Array.isArray(roomData.players) 
      ? roomData.players 
      : Object.values(roomData.players);

    playersList.forEach((player: any, index: number) => {
      // 3. Highlight host
      const isHost = player.id === roomData.hostId || player.isHost;
      const hostText = isHost ? ' (Host)' : '';
      const playerName = player.name || player.id || `Player ${index + 1}`;
      
      const text = this.add.text(50, startY + (index * 30), `- ${playerName}${hostText}`, {
        fontSize: '18px',
        color: isHost ? '#ffff00' : '#ffffff' // Yellow for host, white for others
      });
      
      this.playersTexts.push(text);
    });
  }
}
