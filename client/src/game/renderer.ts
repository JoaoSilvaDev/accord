import { Application, Graphics, Container, type FederatedPointerEvent } from 'pixi.js'
import type { MapData } from '@accord/shared'
import { hexCenter, hexVertices, mapPixelSize, HEX_SIZE } from './hexUtils.js'

// Tile fill colors
const TILE_COLOR: Record<number, number> = {
  1: 0x1e2a1e, // plain
  2: 0x2a2a10, // neutral SC
  3: 0x101030, // home SC player 1
  4: 0x300f0f, // home SC player 2
  5: 0x1a2a10, // home SC player 3
  6: 0x2a1a00, // home SC player 4
}

const TILE_BORDER: Record<number, number> = {
  1: 0x2e3e2e,
  2: 0x4a4a20,
  3: 0x2020508,
  4: 0x502020,
  5: 0x2a3a20,
  6: 0x3a2a10,
}

export interface HexTapEvent {
  col: number
  row: number
  tile: number
}

export class GameRenderer {
  protected app: Application
  private mapContainer: Container
  private initDone = false
  private destroyPending = false
  private onHexTap?: (e: HexTapEvent) => void

  // Pan state
  private dragging = false
  private dragStart = { x: 0, y: 0 }
  private containerStart = { x: 0, y: 0 }

  constructor(container: HTMLElement, onHexTap?: (e: HexTapEvent) => void) {
    this.onHexTap = onHexTap
    this.mapContainer = new Container()
    this.app = new Application()

    this.app.init({
      resizeTo: container,
      background: 0x0f0f0f,
      antialias: true,
    }).then(() => {
      this.initDone = true
      if (this.destroyPending) { this.app.destroy(true); return }
      container.appendChild(this.app.canvas)
      this.setupStage()
      this.onReady()
    })
  }

  private setupStage() {
    this.app.stage.addChild(this.mapContainer)
    this.app.stage.eventMode = 'static'
    this.app.stage.hitArea = this.app.screen

    this.app.stage.on('pointerdown', (e: FederatedPointerEvent) => {
      if (e.target !== this.app.stage) return
      this.dragging = true
      this.dragStart = { x: e.globalX, y: e.globalY }
      this.containerStart = { x: this.mapContainer.x, y: this.mapContainer.y }
    })

    this.app.stage.on('pointermove', (e: FederatedPointerEvent) => {
      if (!this.dragging) return
      this.mapContainer.x = this.containerStart.x + (e.globalX - this.dragStart.x)
      this.mapContainer.y = this.containerStart.y + (e.globalY - this.dragStart.y)
    })

    this.app.stage.on('pointerup', () => { this.dragging = false })
    this.app.stage.on('pointerupoutside', () => { this.dragging = false })
  }

  protected onReady() {
    // Subclasses or callers use loadMap() to render a map
  }

  loadMap(map: MapData) {
    this.mapContainer.removeChildren()

    for (let row = 0; row < map.rows; row++) {
      for (let col = 0; col < map.cols; col++) {
        const tile = map.tiles[row]?.[col] ?? 0
        if (tile === 0) continue

        const { x, y } = hexCenter(col, row)
        const pts = hexVertices(0, 0, HEX_SIZE - 1)

        const g = new Graphics()
        g.poly(pts).fill(TILE_COLOR[tile] ?? 0x1e2a1e)
        g.stroke({ width: 1.5, color: TILE_BORDER[tile] ?? 0x2e3e2e })
        g.position.set(x, y)
        g.eventMode = 'static'
        g.cursor = 'pointer'
        g.on('pointerdown', (e: FederatedPointerEvent) => {
          e.stopPropagation()
          this.onHexTap?.({ col, row, tile })
        })

        this.mapContainer.addChild(g)
      }
    }

    this.centerMap(map)
  }

  private centerMap(map: MapData) {
    const { width, height } = mapPixelSize(map.cols, map.rows)
    this.mapContainer.x = Math.max(0, (this.app.screen.width - width) / 2)
    this.mapContainer.y = Math.max(0, (this.app.screen.height - height) / 2)
  }

  destroy() {
    if (this.initDone) {
      this.app.destroy(true)
    } else {
      this.destroyPending = true
    }
  }
}
