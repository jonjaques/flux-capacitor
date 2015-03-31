import { default as alt } from '../services/alt'
import { default as appActions } from '../actions/app'

class AppStore {
  constructor() {
    this.bindActions(appActions)

    this.debug = false;
  }

  toggleDebugMenu() {
    this.debug = !this.debug;
  }
}

export default alt.createStore(AppStore, 'AppStore')