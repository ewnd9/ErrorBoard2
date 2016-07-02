const _ = require('lodash');
const React = require('react');
const moment = require('moment');

const GraphMixin = require('./mixin-graph');

const HOUR = 60 * 60 * 1000;
const Y_CAP = 0.9;

module.exports = React.createClass({
  mixins: [GraphMixin],
  getDefaultProps: function() {
    return {height: 300};
  },
  render: function() {
    const plot = this.plot();

    const width = this.state.width;
    const height = this.props.height;
    const viewBox = `-0.5 0 ${width + 0.5} ${height}`;

    const points = _.map(plot.points, function(item, index, array) {
      const y = (item.count / plot.max) || 0;

      return {
        x: index * (width / (array.length - 1)),
        y: height - (y * height * Y_CAP),
        value: item.count,
        time: item.timestamp
      };
    });

    const path = _.reduce(points, function(d, point, index) {
      const tool = index === 0 ? 'M' : 'L';
      return `${d + tool + point.x} ${point.y}`;
    }, '');

    const circles = _.map(points, function(point, index) {
      if (point.value > 0) {
        return <circle key={ point.time } cx={ point.x } cy={ point.y } r='1' />;
      }
    });

    const days = _.map(points, function(point, index) {
      if (point.time === moment(point.time).startOf('day').valueOf()) {
        const x = Math.floor(point.x);
        const isLeft = (point.x / width) < 0.95;

        const labelOffset = isLeft ? 5 : -5;
        const labelAnchor = isLeft ? 'start' : 'end';

        return <g key={ point.time }>
          <text x={ x + labelOffset } y='10' textAnchor={ labelAnchor } className='graph__day'>
            { moment(point.time).format('DD.MM') }
          </text>
          <line x1={ x } y1='0' x2={ x } y2={ height } className='graph__axis' />
        </g>;
      }
    });

    return <div className='graph'>
      <svg xmlns='http://www.w3.org/2000/svg' width={ width } height={ height } viewBox={ viewBox }>
        <line x1='0' y1={ height } x2={ width } y2={ height } className='graph__axis' />
        { days }
        <path d={ path } className='graph__main' />
        { circles }
      </svg>
    </div>;
  },
  plot: function() {
    const data = this.props.data;
    const points = [];
    let max = 0;

    for (let t = this.props.from; t <= this.props.to; t += HOUR) {
      let count = 0;

      if (data[t]) {
        count = data[t].count;
        max = Math.max(max, count);
      }

      points.push({
        timestamp: t,
        count: count
      });
    }

    return {
      points: points,
      max: max
    };
  }
});
