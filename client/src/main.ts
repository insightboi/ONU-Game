import Phaser from "phaser";

class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    this.add.text(300, 250, "ONU Running", {
      color: "#ffffff",
      fontSize: "24px"
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#121212",
  scene: [BootScene]
};

new Phaser.Game(config);
