import palette from "../../../../../../../../theme/palette";


export const data = {
  labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
  datasets: [
    {
      borderColor: palette.warning.main,
      data: [18, 5, 19, 27, 29, 19, 20],
      fill: false,
    },
  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: { display: false },
  elements: { 
      line: { tension: 0 } ,
      point: { backgroundColor: palette.primary.dark}
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};
