import { Card, List } from 'antd';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';

export const LineChart: React.FC = (props: ComponentProps<any>) => {
  const {
    xField = '',
    yField = '',
    xUnit = '',
    yUnit = '',
    xTitle = '',
    yTitle = '',
    data = [],
  } = props;
  const config = {
    renderer: 'svg', // 这样报表才清晰
    xField,
    yField,
    seriesField: 'name',
    xUnit,
    yUnit,
    xTitle,
    yTitle,
    data,
    meta: {
      value: {
        formatter: (value: any) => {
          return `${value} ${yUnit || ''}`;
        },
      },
    },
  };
  // @ts-ignore
  return <Line {...config} />;
};

const chartTypeFCMap = {
  line: LineChart,
};

// 图表数据
const useChartInfo = (params: any, updatingTimer: any, localData?: any[]) => {
  // 图表数据
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (!localData) {

    } else {
      // @ts-ignore
      setChartData(localData || []);
    }
  }, [updatingTimer]);

  return chartData;
};

const MonitorInfo: React.FC = ({ params, updatingTimer, localData }) => {
  const chartData = useChartInfo(params, updatingTimer, localData);

  // 如下代码可以让svg图像在打印预览的时候显示出来，PDF打印也就能出来
  // return (
  //     chartData.map(item => {
  //         const {chartType, title} = item;
  //         const targetFC = chartTypeFCMap[chartType];
  //         // @ts-ignore
  //         targetFC.key = title;
  //         if (targetFC) {
  //           return (
  //             <Card title={title}>
  //               {typeof targetFC === 'function' && (targetFC as Function)(item)}
  //             </Card>
  //           );
  //         }
  //         return null
  //       }
  //     )
  //   )

  // 如下代码可以让svg图像在打印预览的时候显示出来，PDF打印也就能出来，但没有响应式效果
  // return (
  //   <List
  //     grid={{
  //       gutter: 16,
  //       xs: 1,
  //       sm: 1,
  //       md: 2,
  //       lg: 2,
  //       xl: 2,
  //       xxl: 3,
  //     }}
  //   >
  //     {
  //       chartData.map(item => {
  //                 const {chartType, title} = item;
  //                 const targetFC = chartTypeFCMap[chartType];
  //                 // @ts-ignore
  //                 targetFC.key = title;
  //                 if (targetFC) {
  //                   return (
  //                     <List.Item>
  //                     <Card title={title}>
  //                       {typeof targetFC === 'function' && (targetFC as Function)(item)}
  //                     </Card>
  //                       </List.Item>
  //                   );
  //                 }
  //                 return null
  //               }
  //             )
  //     }
  //   </List>
  // );

  // 以下代码svg 图形在Chrome打印预览无法看到图片，导出PDF就没有图片
  // return (
  //   <List
  //     grid={{
  //       gutter: 16,
  //       xs: 1,
  //       sm: 1,
  //       md: 2,
  //       lg: 2,
  //       xl: 2,
  //       xxl: 3,
  //     }}
  //     dataSource={chartData}
  //     renderItem={(item) => {
  //       const { chartType, title } = item;
  //       const targetFC = chartTypeFCMap[chartType];
  //       // @ts-ignore
  //       targetFC.key = title;
  //       if (targetFC) {
  //         return (
  //           <List.Item>
  //             <Card title={title}>
  //               {typeof targetFC === 'function' && (targetFC as Function)(item)}
  //             </Card>
  //           </List.Item>
  //         );
  //       } else {
  //         console.error('暂不支持的图表类型:', chartType);
  //         return null;
  //       }
  //     }}
  //   />
  // );

  // 如下代码可以让svg图像在打印预览的时候显示出来，PDF打印也就能出来
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 3,
      }}
      dataSource={chartData.map(item => {
        const { chartType, title } = item;
        const targetFC = chartTypeFCMap[chartType];
        // @ts-ignore
        targetFC.key = title;
        if (targetFC) {
          return (
                typeof targetFC === 'function' && (targetFC as Function)(item)
          );
        } else {
          console.error('暂不支持的图表类型:', chartType);
          return null;
        }
      })}
      renderItem={(item) => {
          return (
            <List.Item>
              <Card>
                {item}
              </Card>
            </List.Item>
          );
      }}
    />
  );
};

export default MonitorInfo;
