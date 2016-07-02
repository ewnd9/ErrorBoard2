const _ = require('lodash');
const React = require('react/addons');
const cx = React.addons.classSet;

const slug = function(title) {
  return title && title.toLowerCase().replace(/\s+/g, '-');
};

module.exports = React.createClass({
  render: function() {
    const classes = cx({
      'browsers': true,
      'browsers_right': this.props.align === 'right'
    });

    const browsers = _.map(this.props.list, function(browser) {
      if (browser) {
        return <div className={ `browsers__item browsers__item_${slug(browser)}` } title={ browser } key={ browser } />;
      }
    });

    return <div className={ classes }>{ browsers }</div>;
    }
  });
