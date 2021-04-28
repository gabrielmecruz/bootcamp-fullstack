import React, { useState, useEffect } from 'react';

import ClickButton from './ClickButton';
import date_create from '../helpers/dateHelper.js';

import { monthList } from '../helpers/monthHelper.js';

export default function ChooseMonth({ selectedMonth }) {
  const currentMonth = monthList.find((month) => month.name === selectedMonth);

  const [monthId, setMonthId] = useState(currentMonth.id);
  const [monthName, setMonthName] = useState(currentMonth.name);

  useEffect(() => {
    const monthObject = monthList.find((month) => month.id === monthId);
    setMonthName(monthObject.name);
  }, [monthId]);

  const handleMonthChange = (selectedMonth) => {
    const newMonth = parseInt(selectedMonth.target.value, 10);
    setMonthId(newMonth);
  };
  return (
    <div>
      <ClickButton />
      <select
        className="browser-default"
        value={monthId}
        onChange={handleMonthChange}
      >
        {monthList.map((month) => {
          const { id, name } = month;
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
      <ClickButton />
    </div>
  );
}
