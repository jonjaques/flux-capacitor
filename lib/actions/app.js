import { default as alt } from '../services/alt'

class AppActions {
  constructor() {
    this.generateActions(
      'toggleDebugMenu'
    )
  }
}

export default alt.createActions(AppActions)