import Arena from "./Arena"

class GameManager {
  public arena: Arena | null = null

  registerArena(arena: Arena) {
    this.arena = arena
  }
}

export default new GameManager()