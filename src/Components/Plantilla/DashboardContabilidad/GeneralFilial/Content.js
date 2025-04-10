import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Content() {
  useEffect(() => {
    // Cargar Chart.js para los gráficos
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      // Gráfico de barras comparativo entre filiales
      new window.Chart(document.getElementById("barChartFiliales"), {
        type: "bar",
        data: {
          labels: ["Filial A", "Filial B", "Filial C", "Filial D"],
          datasets: [{
            label: "Ventas por Filial",
            data: [120, 150, 180, 200], // Aquí deberías poner los datos dinámicos de cada filial
            backgroundColor: ["#007236", "#FF6600", "#F0F0E6", "#FF7F32"],
            borderColor: "#007236",
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Gráfico de líneas comparativo entre filiales
      new window.Chart(document.getElementById("lineChartFiliales"), {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [
            {
              label: "Filial A",
              data: [30, 40, 50, 60, 70],
              borderColor: "#007236",
              fill: false,
              tension: 0.1
            },
            {
              label: "Filial B",
              data: [20, 35, 55, 80, 100],
              borderColor: "#FF6600",
              fill: false,
              tension: 0.1
            },
            {
              label: "Filial C",
              data: [40, 60, 90, 120, 150],
              borderColor: "#F0F0E6",
              fill: false,
              tension: 0.1
            },
            {
              label: "Filial D",
              data: [10, 20, 30, 40, 50],
              borderColor: "#FF7F32",
              fill: false,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Gráfico de torta comparativo entre filiales
      new window.Chart(document.getElementById("pieChartFiliales"), {
        type: "pie",
        data: {
          labels: ["Filial A", "Filial B", "Filial C", "Filial D"],
          datasets: [{
            label: "Distribución de Ventas por Filial",
            data: [120, 150, 180, 200], // Aquí deberías poner los datos dinámicos de cada filial
            backgroundColor: ["#007236", "#FF6600", "#F0F0E6", "#FF7F32"]
          }]
        },
        options: {
          responsive: true
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="content-wrapper" style={{ backgroundColor: "#F0F0E6" }}>
      <section className="content py-4">
        <div className="container-fluid px-3 px-md-4">
          <div className="row g-4 justify-content-center">
            {/* Gráfico de barras comparativo entre filiales */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Ventas por Filial</h3>
                </div>
                <div className="card-body">
                  <canvas id="barChartFiliales" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de líneas comparativo entre filiales */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Desempeño Mensual por Filial</h3>
                </div>
                <div className="card-body">
                  <canvas id="lineChartFiliales" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de torta comparativo entre filiales */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Distribución de Ventas</h3>
                </div>
                <div className="card-body">
                  <canvas id="pieChartFiliales" width="400" height="400"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
