import { default as React } from 'react'
import { default as alt } from '../../services/alt'
import { Modal, Button, Alert, ButtonGroup } from '../utils/ui'
import { FileTextReader } from '../utils/file'

const FILE_READER_SUPPORTED = (global 
                                && global.File 
                                && global.FileReader 
                                && global.FileList 
                                && global.Blob);

export var StateDebuggerModal = React.createClass({

  getInitialState() {
    var json = JSON.parse(alt.takeSnapshot());
    var timestamp = new Date();
    return {
      snapshot: {
        title: `${document ? document.title : null}-${timestamp.valueOf()}`,
        timestamp: timestamp,
        data: json
      },
      preview: false,
      hasSnapshotLoadingError: false,
      isLoadingSnapshot: false
    };
  },

  onRequestLoadSnapshot() {
    this.setState({ 
      isLoadingSnapshot: true,
      hasSnapshotLoadingError: false 
    })
  },

  onCancelSnapshot() {
    this.setState({ 
      isLoadingSnapshot: false,
      isLoadingSnapshotSuccessful: false,
      hasSnapshotLoadingError: false 
    })
  },
  
  onLoadSnapshot(e) {
    var doc;
    if (e.target.result && e.target.result.length) {
      try {
        doc = JSON.parse(e.target.result);
        if (!doc.title || !doc.timestamp || !doc.data) throw new Error;
        this.setState({ 
          preview: doc,
          isLoadingSnapshotSuccessful: true,
          hasSnapshotLoadingError: false
        })
      } catch(e) {
        this.setState({
          hasSnapshotLoadingError: "Unable to parse file!"
        })
      }
    }
  },

  onSaveSnapshot() {
    var doc = this.state.snapshot;
    doc.url = location ? location.href : null;
    download(doc.title + '.json', JSON.stringify(doc, null, 2));
  },

  onApplySnapshot() {
    alt.bootstrap(JSON.stringify(this.state.preview.data))
    this.setState({ snapshot: this.state.preview })
    this.onCancelSnapshot()
  },

  renderLoadSnapshot() {
    if (FILE_READER_SUPPORTED) {
      if (this.state.isLoadingSnapshot) {
        return <FileTextReader 
                  onChange={this.onLoadSnapshot} 
                  onCancel={this.onCancelSnapshot} />
      } else {
        return <Button bsStyle="warning" onClick={this.onRequestLoadSnapshot}>
          Replay <i className="fa fa-repeat" />
        </Button>
      }
    }
  },

  renderLoadSnapshotApply() {
    return <ButtonGroup>
      <Button onClick={this.onCancelSnapshot}>
        <i className="fa fa-close" />
      </Button>
      <Button bsStyle="success" onClick={this.onApplySnapshot}>
        Apply <i className="fa fa-play" />
      </Button>
    </ButtonGroup>
  },

  render() {
    return <Modal {...this.props} title="State Debugger">
      <div className="modal-body">
        <div>
          <pre>{JSON.stringify(
            this.state.isLoadingSnapshotSuccessful
              ? this.state.preview.data
              : this.state.snapshot.data
            , null, 2)
          }</pre>
          <Alert bsStyle={ this.state.isLoadingSnapshotSuccessful ? 'success' : 'info' }>
            { this.state.isLoadingSnapshotSuccessful 
              ? "Loaded Successfully: " + this.state.preview.title 
              : this.state.snapshot.title }
          </Alert>
          {this.state.hasSnapshotLoadingError && <Alert bsStyle="danger">
            {this.state.hasSnapshotLoadingError}
          </Alert>}
        </div>
      </div>
      <div className="modal-footer">
        <div className="pull-left">{ 
          this.state.isLoadingSnapshotSuccessful 
            ? this.renderLoadSnapshotApply()
            : this.renderLoadSnapshot() }</div>
        <Button bsStyle="primary" onClick={this.onSaveSnapshot}>
          Save <i className="fa fa-save" />
        </Button>
        <Button onClick={this.props.onRequestHide}>
          Close
        </Button>
      </div>
    </Modal>
  }

})

function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else {
    pom.click();
  }
}
