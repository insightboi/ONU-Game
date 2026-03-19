import Phaser from 'phaser';
import { MainMenuScene } from './scenes/MainMenuScene';
import { LobbyScene } from './scenes/LobbyScene';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#121212',
  parent: 'game-container',
  scene: [MainMenuScene, LobbyScene],
};

export const startGame = (parent: string | HTMLElement) => {
  return new Phaser.Game({ ...config, parent });
};
