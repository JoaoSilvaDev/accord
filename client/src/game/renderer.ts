import { Application, Text } from 'pixi.js'

export class GameRenderer {
  protected app: Application
  private initDone = false
  private destroyPending = false

  constructor(container: HTMLElement) {
    this.app = new Application()
    this.app.init({
      resizeTo: container,
      backgroundColor: 0x111111,
      antialias: true,
    }).then(() => {
      this.initDone = true
      if (this.destroyPending) {
        this.app.destroy(true)
        return
      }
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
    if (this.initDone) {
      this.app.destroy(true)
    } else {
      this.destroyPending = true
    }
  }
}
