import React from 'react';

interface ChartDataItem {
  name: string;
  value: number;
  color?: string;
  count?: number;
}

interface DonutChartProps {
  data: ChartDataItem[];
  calories: number;
}

interface ChartDataValues {
  name: string;
  value: number;
  color?: string;
  count?: number;
  start_value?: number;
  end_value?: number;
  start_percent?: number;
  end_percent?: number;
  start_degrees?: number;
  end_degrees?: number;
}

// TODO - doesnt work properly
const DonutChart = ({ data, calories }: DonutChartProps) => {
  const total_value = data.reduce((a, b) => a + b.value, 0);
  // const convertToPercent = (num) => Math.round((num / total_value) * 100);
  // const convertToDegrees = (num) => Math.round((num / 100) * 360);

  // const css_string = data
  //   .reduce((items, item, index, array) => {
  //     items.push(item);

  //     item.count = item.count || 0;
  //     item.count += array[index - 1]?.count || item.count;
  //     item.start_value = array[index - 1]?.count ? array[index - 1].count : 0;
  //     item.end_value = item.count += item.value;
  //     item.start_percent = convertToPercent(item.start_value);
  //     item.end_percent = convertToPercent(item.end_value);
  //     item.start_degrees = convertToDegrees(item.start_percent);
  //     item.end_degrees = convertToDegrees(item.end_percent);

  //     return items;
  //   }, [])
  //   .map((chart) => {
  //     const { color, start_degrees, end_degrees } = chart;
  //     return ` ${color} ${start_degrees}deg ${end_degrees}deg`;
  //   })
  //   .join();
  const convertToPercent = (num: number): number =>
    Math.round((num / total_value) * 100);
  const convertToDegrees = (num: number): number =>
    Math.round((num / 100) * 360);

  const css_string: string = data
    .reduce<ChartDataValues[]>((items, item, index, array) => {
      const newItem: ChartDataValues = { ...item };

      newItem.count = newItem.count || 0;
      newItem.count += array[index - 1]?.count || newItem.count;
      newItem.start_value = array[index - 1]?.count
        ? array[index - 1].count
        : 0;
      newItem.end_value = newItem.count += newItem.value;
      newItem.start_percent = convertToPercent(newItem.start_value || 0);
      newItem.end_percent = convertToPercent(newItem.end_value);
      newItem.start_degrees = convertToDegrees(newItem.start_percent);
      newItem.end_degrees = convertToDegrees(newItem.end_percent);

      items.push(newItem);
      return items;
    }, [])
    .map((chart) => {
      const { color, start_degrees, end_degrees } = chart;
      return ` ${color || ''} ${start_degrees}deg ${end_degrees}deg`;
    })
    .join();

  return (
    <div className='max-w-[120px]'>
      <svg
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full rounded-full'
      >
        <foreignObject
          x='0'
          y='0'
          width='100'
          height='100'
          clipPath='url(#hole)'
        >
          <div
            // xmlns='http://www.w3.org/1999/xhtml'
            className='w-full h-full'
            style={{
              background: `conic-gradient(${css_string})`,
            }}
          />
        </foreignObject>

        <circle cx='50' cy='50' r='43' fill='white' />
        <text
          x='50%'
          y='45%'
          textAnchor='middle'
          fontSize='16'
          fill='#0284c7'
          fontWeight='bold'
        >
          {calories?.toFixed(0) || 0}
        </text>

        <text
          x='50%'
          y='60%'
          textAnchor='middle'
          fontSize='11'
          fill='#0284c7'
          fontWeight='bold'
        >
          Calories
        </text>
      </svg>
    </div>
  );
};

export default DonutChart;
