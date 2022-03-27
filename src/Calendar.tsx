import { CSSProperties, FC, useState } from 'react';

interface IDateInfo {
  day: number;
  month: number; // Month start from 0
  year: number;
  dayOfWeek: number;
}

const styles: Record<string, CSSProperties> = {
  daysOfWeek: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
  },
  dayOfWeek: {
    padding: 10
  },
  currentMonth: {
    color: '#000'
  },
  otherMonth: {
    color: 'grey'
  }
};
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const getDate = (date: Date): IDateInfo => ({
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
  dayOfWeek: date.getDay(),
});
const calculateDay = (date: IDateInfo, count: number): IDateInfo => getDate(
  new Date(date.year, date.month, date.day + count)
);
const calculateDays = (
  date: IDateInfo,
  count: number,
  callback: (index: number) => number
) => Array.from({
  length: count
}, (_, index): IDateInfo => calculateDay(date, callback(index)));

const now = getDate(new Date());

const Calendar: FC<{ startDay?: number; }> = ({ startDay = 1 }) => {
  const [month, setMonth] = useState(now.month);

  const date = getDate(new Date(now.year, month));
  const startOfMonth = new Date(date.year, date.month, 1);
  const endOfMonth = new Date(date.year, date.month + 1, 0);

  const startOfMonthData = getDate(startOfMonth);
  const endOfMonthData = getDate(endOfMonth);

  const prevDaysOfMonthCount = (startOfMonthData.dayOfWeek - startDay + 7) % 7;
  const nextDaysOfMonthCount = (6 - endOfMonthData.dayOfWeek + startDay) % 7;

  const prevDaysOfMonth = calculateDays(
    startOfMonthData,
    prevDaysOfMonthCount,
    (index) => -index - 1
  ).reverse();
  const currentDaysOfMonth = calculateDays(
    { ...startOfMonthData, day: startOfMonthData.day - 1 },
    endOfMonthData.day - startOfMonthData.day + 1,
    (index) => index + 1
  );
  const nextDaysOfMonth = calculateDays(
    endOfMonthData,
    nextDaysOfMonthCount,
    (index) => index + 1
  );

  const allDays = [...prevDaysOfMonth, ...currentDaysOfMonth, ...nextDaysOfMonth];

  const prevMonth = () => setMonth(month - 1);
  const nextMonth = () => setMonth(month + 1);

  return (
    <div>
      <header>Calendar</header>
      <h3>{monthNames[date.month]} {date.year}</h3>
      <button onClick={prevMonth}>prev</button>
      <button onClick={nextMonth}>next</button>
      <div style={styles.daysOfWeek}>
        {[...daysOfWeek.slice(startDay), ...daysOfWeek.slice(0, startDay)].map((dayOfWeek, index) => <div key={index} style={styles.dayOfWeek}>{dayOfWeek}</div>)}
      </div>
      <div style={styles.daysOfWeek}>
        {allDays.map((dayInfo) =>
          <div
            key={`${dayInfo.day}.${dayInfo.month}.${dayInfo.year}`}
            style={date.month === dayInfo.month ? styles.currentMonth : styles.otherMonth}
          >{`${dayInfo.day} ${(
            dayInfo.day === 1 ? shortMonthNames[dayInfo.month] : ''
          )}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;