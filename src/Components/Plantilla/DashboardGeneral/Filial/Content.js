import React, { useEffect } from "react";

export default function ContentFilial() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      // Gráfico de barras - Desempeño mensual
      new window.Chart(document.getElementById("barChartFilial"), {
        type: "bar",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [{
            label: "Ventas Mensuales",
            data: [30, 40, 50, 60, 70],
            backgroundColor: "#007236",
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

      // Gráfico de líneas - Desempeño mensual
      new window.Chart(document.getElementById("lineChartFilial"), {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [{
            label: "Tendencia de Ventas",
            data: [30, 40, 50, 60, 70],
            borderColor: "#FF6600",
            backgroundColor: "#FF6600",
            fill: false,
            tension: 0.3
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

      // Gráfico de dona - Ingresos por tipo de producto
      new window.Chart(document.getElementById("doughnutChartFilial"), {
        type: "doughnut",
        data: {
          labels: ["Créditos", "Ahorros", "Seguros"],
          datasets: [{
            label: "Ingresos por Tipo de Producto",
            data: [150, 90, 60],
            backgroundColor: ["#007236", "#FF6600", "#FF7F32"]
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
            {/* Gráfico de barras */}
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Ventas Mensuales - Filial A</h3>
                </div>
                <div className="card-body">
                  <canvas id="barChartFilial" width="400" height="300"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de líneas */}
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Tendencia de Ventas - Filial A</h3>
                </div>
                <div className="card-body">
                  <canvas id="lineChartFilial" width="400" height="300"></canvas>
                </div>
              </div>
            </div>

         
          </div>
        </div>
      </section>
    </div>
  );
}
