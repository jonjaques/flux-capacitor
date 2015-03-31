import { default as React} from 'react'
import { Button } from './ui'

export var FileTextReader = React.createClass({

  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.props.onChange(upload)
    }

    reader.readAsText(file);
  },

  render: function() {
    return (
      <div className="clearfix">
        <Button
          onClick={this.props.onCancel} 
          className="pull-left"><i className="fa fa-close" /></Button>
        <input type="file" 
          style={{marginTop: 6, marginLeft: 18 }}
          onChange={this.handleFile} 
          className="pull-left" />
      </div>
    );
  },
});