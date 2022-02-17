import MonitorInfo from './MonitorInfo';
import React from 'react';
import localData from './preview-print-test-data';
import DemoLine from "@/pages/DemoLine";
import {Card, List} from "antd";
import {LineChart} from "./MonitorInfo";

const ReportDetail: React.FC = () => {
  console.log(localData);
  return (
    <div id={'report-preview'}>
      <MonitorInfo localData={localData} />
      // 如下这种写法无法打印预览svg图
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
        dataSource={localData}
        renderItem={(item) => {
          return <List.Item>
            <Card>
              {LineChart(item)}
            </Card>
          </List.Item>
        }}
      ></List>
      // 如下这种写法可以打印预览svg图
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
        dataSource={localData.map(item => LineChart(item))}
        renderItem={(item) => {
          return <List.Item>
            <Card>
              {item}
            </Card>
          </List.Item>
        }}
      ></List>

      <DemoLine></DemoLine>
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
        dataSource={[<DemoLine></DemoLine>,<DemoLine></DemoLine>]}
        renderItem={(item) => {
            return <List.Item>
              <Card>
                {item}
              </Card>
            </List.Item>
        }}
      >

      </List>
    </div>
  );
};

export default ReportDetail;
