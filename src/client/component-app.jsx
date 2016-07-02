const page = require('page');
const React = require('react');

const api = require('./api');

const Nav = require('./component-nav.jsx');
const Dashboard = require('./component-dashboard.jsx');
const Report = require('./component-report.jsx');
const Details = require('./component-details.jsx');

const DETAIL_TYPES = {
  messages: 'message',
  browsers: 'browser',
  scripts: 'script',
  pages: 'page',
  meta: 'metagroup'
};

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      params: {},
      state: {}
    };
  },
  render: function() {
    return <div className='container'>
      <div className='menu'>
        <Nav pathname={ this.props.pathname } />
      </div>
      <div className='content'>
        { this.renderMain() }
        <div className="screen">
          { this.renderDetails() }
        </div>
      </div>
    </div>;
  },
  renderMain: function() {
    if (this.props.params.type === 'dashboard') {
      return <Dashboard />;
    }

    return <Report type={ this.props.params.type } onClick={ this._showDetails } />;
  },
  renderDetails: function() {
    const params = this.props.params;
    const detailsType = DETAIL_TYPES[params.type];

    if (params.id) {
      return <Details
        type={ detailsType }
        id={ params.id }
        title={ this.props.state.details || null }
        onClose={ this._hideDetails } />;
    }
  },
  _showDetails: function(data) {
    const url = `${api.getBaseUrl()}/${this.props.params.type}/${encodeURIComponent(encodeURIComponent(data.key))}`;
    // double `encodeURIComponent` workaround https://github.com/visionmedia/page.js/issues/187
    page.show(url, {details: data.title});
  },
  _hideDetails: function() {
    page.show(`${api.getBaseUrl()}/${this.props.params.type}/`);
  }
});
