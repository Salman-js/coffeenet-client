import React from 'react';
import { Pie } from '@ant-design/plots';

const ScoreChart = ({ cuppings }) => {
  const data = [
    {
      category: 'Good',
      value: cuppings.filter((cupping) => cupping.qualityScale === 'Good')
        .length,
    },
    {
      category: 'Very Good',
      value: cuppings.filter((cupping) => cupping.qualityScale === 'Very Good')
        .length,
    },
    {
      category: 'Exellent',
      value: cuppings.filter((cupping) => cupping.qualityScale === 'Exellent')
        .length,
    },
    {
      category: 'Outstanding',
      value: cuppings.filter(
        (cupping) => cupping.qualityScale === 'Outstanding'
      ).length,
    },
    {
      category: 'Unacceptable',
      value: cuppings.filter(
        (cupping) => cupping.qualityScale === 'Unacceptable'
      ).length,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'category',
    radius: 1,
    innerRadius: 0.6,
    label: {
      category: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        category: 'element-selected',
      },
      {
        category: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Cupping Quality Scale',
      },
    },
  };
  return (
    <div
      className='chart-container lg:w-1/3 w-full flex justify-center text-left p-3 bg-white rounded-lg shadow-md'
      data-aos='fade-up'
    >
      <Pie {...config} legend={false} className='w-full h-1/2' />
    </div>
  );
};

export default ScoreChart;
