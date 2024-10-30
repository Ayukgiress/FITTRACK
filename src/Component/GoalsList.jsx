import React from "react";
import { TEChart } from "tw-elements-react";

export default function ChartDoughnut() {
  return (
    <div style={{ width: "500px", height: "700px" }}> {/* Adjust width and height here */}
      <TEChart
        type="doughnut"
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              label: "Traffic",
              data: [2343, 2545, 3423, 2365, 1985, 987, 333, 333, 444, 555, 666, 777],
              backgroundColor: [
                "rgba(63, 81, 181, 0.5)",
                "rgba(77, 182, 172, 0.5)",
                "rgba(66, 133, 244, 0.5)",
                "rgba(156, 39, 176, 0.5)",
                "rgba(233, 30, 99, 0.5)",
                "rgba(66, 73, 244, 0.4)",
                "rgba(66, 133, 244, 0.2)",
                "orange",
                "green",
                "purple",
                "black",
                "white"
              ],
            },
          ],
        }}
      />
    </div>
  );
}
