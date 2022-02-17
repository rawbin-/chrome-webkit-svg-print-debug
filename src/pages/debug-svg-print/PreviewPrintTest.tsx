import MonitorInfo from './MonitorInfo';
import React from 'react';
import localData from './preview-print-test-data';
import DemoLine from "@/pages/DemoLine";

const ReportDetail: React.FC = () => {
  console.log(localData);
  return (
    <div id={'report-preview'}>
      <DemoLine></DemoLine>
      <MonitorInfo localData={localData} />
    </div>
  );
};

export default ReportDetail;
