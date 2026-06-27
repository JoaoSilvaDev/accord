import { Application, Text } from 'pixi.js'

export class GameRenderer {
  protected app: Application

  constructor(container: HTMLElement) {
    this.app = new Application()
    this.app.init({
      resizeTo: container,
      backgroundColor: 0x111111,
      antialias: true,
    }).then(() => {
      container.appendChild(this.app.canvas)
      this.onReady()
    })
  }

  protected onReady() {
    const label = new Text({
      text: 'Scaffold ready — replace this with your game',
      style: { fill: '#ffffff', fontSize: 18, fontFamily: 'system-ui' },
    })
    label.anchor.set(0.5)
    label.x = this.app.screen.width / 2
    label.y = this.app.screen.height / 2
    this.app.stage.addChild(label)
  }

  destroy() {
    this.app.destroy(true)
  }
}
