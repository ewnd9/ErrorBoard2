const React = require('react');
const moment = require('moment');

const Reports = require('./reports');
const Graph = require('./component-graph.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      from: moment().startOf('hour').subtract(4, 'days').valueOf(),
      to: Date.now(),
      hourly: {}
    };
  },
  render: function() {
    return <div className='dashboard'>
      <div className='title title_big'>
        Hourly errors in the last 4 days
      </div>
      <Graph data={ this.state.hourly } from={ this.state.from } to={ this.state.to } />
    </div>;
  },
  componentDidMount: function() {
    Reports.fetch('hourly', this._getReportParams()).done(this.updateGraphData);
  },
  updateGraphData: function() {
    this.setState({
      hourly: Reports.get('hourly', this._getReportParams())
    });
  },
  _getReportParams: function() {
    return {
      from: this.state.from,
      to: this.state.to
    };
  },
});
