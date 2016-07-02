const _ = require('lodash');
const React = require('react/addons');

const cx = React.addons.classSet;
const Timespan = require('./component-timespan.jsx');
const Browsers = require('./component-browsers.jsx');

module.exports = React.createClass({
  render: function() {
    const data = this.props.data;
    const timespan = this.props.timespan;

    const isBrowserType = this.props.type === 'browsers';
    const delta = data.delta || 0;

    const rowClasses = cx({
      'report__row': true,
      'report__row_clickable': _.isFunction(this.props.onClick),
    });

    const titleClasses = cx({
      'report__cut': true,
      'report__mono': !isBrowserType
    });

    return <tr className={ rowClasses } onClick={ this.props.onClick }>
      <td className='report__cell report__cell_cut'>
        { data.browsers ? <Browsers list={ data.browsers } align='right' /> : null }
        <div className={ titleClasses } title={ data.title }>
          { isBrowserType ? <Browsers list={ [data.title.split(' ').slice(0, -1).join(' ')] } /> : null }
          { data.title }
        </div>
      </td>
      <td className='report__cell report__cell_count'>
        { data.count - delta }
      </td>
      <td className='report__cell report__cell_delta'>
        { delta > 0 ? `+${delta}` : null }
      </td>
      {
        timespan ?
        <td className='report__cell report__cell_timespan'>
          <Timespan min={ timespan.earliest } max={ timespan.latest } start={ data.earliest } finish={ data.latest } />
        </td> : null
      }
    </tr>;
  }
});
