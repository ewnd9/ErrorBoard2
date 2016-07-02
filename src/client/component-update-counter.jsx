const React = require('react/addons');
const moment = require('moment');

const cx = React.addons.classSet;

module.exports = React.createClass({
  render: function() {
    const count = this.props.count;
    const phrase = (count === 1) ? 'One update' : `${count} updates`;

    const classes = cx({
      'counter': true,
      'counter_hidden': count === 0
    });

    return <div className={ classes } onClick={ this.props.onClick } title='Refresh table'>
      { phrase } since { moment(this.props.since).format('LT') }
    </div>;
  }
});
