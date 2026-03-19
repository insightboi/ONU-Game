import Phaser from 'phaser';

export class LobbyScene extends Phaser.Scene {
  constructor() {
    super('LobbyScene');
  }

  create() {
    const { width, height } = this.scale;
    
    this.add.text(width / 2, height / 2 - 50, 'Lobby', {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    const backButton = this.add.text(width / 2, height / 2 + 50, 'Back to Main Menu', {
      fontSize: '24px',
      color: '#ff0000',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    backButton.on('pointerdown', () => {
      this.scene.start('MainMenuScene');
    });
    
    backButton.on('pointerover', () => backButton.setColor('#ffffff'));
    backButton.on('pointerout', () => backButton.setColor('#ff0000'));
  }
}
