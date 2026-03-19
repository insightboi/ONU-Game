import Phaser from "phaser";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { LobbyScene } from "./scenes/LobbyScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#121212",
  scene: [MainMenuScene, LobbyScene]
};

new Phaser.Game(config);
