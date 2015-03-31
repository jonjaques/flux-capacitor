import { default as React }         from 'react'
import { default as alt }           from '../../services/alt'
import { default as appActions }    from '../../actions/app'
import { default as appStore }      from '../../stores/app'
import { default as Keybinding }    from 'react-keybinding'
import { default as ListenerMixin } from 'alt/mixins/ListenerMixin'
import { StateDebuggerModal }       from './debug-modals'
import { 
  Navbar, 
  Nav, 
  Button,
  DropdownButton, 
  MenuItem, 
  NavItem,
  Modal, 
  ModalTrigger 
} from '../utils/ui'


export var Debug = React.createClass({
  
  mixins: [ 
    Keybinding, 
    ListenerMixin 
  ],

  keybindings: {
    'ctrl+shift+/': function() {
      appActions.toggleDebugMenu()
    }
  },

  getInitialState() {
    return appStore.getState();
  },

  componentDidMount() {
    this.listenTo(appStore, this.onChange)
  },

  onChange() {
    return this.setState(this.getInitialState());
  },

  getSnapshot() {
    var obj = JSON.parse(alt.takeSnapshot());
    return JSON.stringify(obj, null, 2);
  },

  render() {
    return <Navbar brand="Debugger" fixedBottom inverse fluid className={this.state.debug ? '' : 'hidden'}>
      <Nav right>
        <ModalTrigger modal={<StateDebuggerModal />}>
          <NavItem>View State</NavItem>
        </ModalTrigger>
      </Nav>
    </Navbar>
  }

})