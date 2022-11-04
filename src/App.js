import React, {useState} from 'react';
import moment from 'moment';
import { v4 } from 'uuid';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function DateTimeWithFormat(WrappedComponent) {
  return class WithFormat extends React.Component {
    constructor(props) {
      super(props);
      this.date = props.date;
    }

    formatDate() {
      const subDate = moment() - moment(this.date);

      if (subDate < 3600000) {
        return '12 минут назад'
      }

      if (subDate >= 3600000 && subDate < 86400000) {
        return '5 часов назад'
      }

      if (subDate >= 86400000) {
        return `${Math.round(subDate / 86400000)} дней назад...`
      }
      
      return this.date;
    }

    render() {
      return (
        <WrappedComponent date={ this.formatDate() } />
      )
    }
  }
}

const DateTimePretty = DateTimeWithFormat(DateTime);


function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" title='video' allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} key={v4()} />);
}

export default function App() {
    const [list] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}
