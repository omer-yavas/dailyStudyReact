import React from "react";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";

const Reports = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  return (
    <>
      <CCard className="mt-3">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Satış Rakamları
              </h4>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: "300px", marginTop: "40px" }}
            data={{
              labels: [
                "Ocak",
                "Şubat",
                "Mart",
                "Nisan",
                "Mayıs",
                "Haziran",
                "Temmuz",
              ],
              datasets: [
                {
                  label: "İçecekler",
                  backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                  borderColor: getStyle("--cui-info"),
                  pointHoverBackgroundColor: getStyle("--cui-info"),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: "Tatlılar",
                  backgroundColor: "transparent",
                  borderColor: getStyle("--cui-success"),
                  pointHoverBackgroundColor: getStyle("--cui-success"),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: "Minimum Şirket Hedefi",
                  backgroundColor: "transparent",
                  borderColor: getStyle("--cui-danger"),
                  pointHoverBackgroundColor: getStyle("--cui-danger"),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Reports;
