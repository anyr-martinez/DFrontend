import React, { useEffect } from "react";

export default function Content() {
  useEffect(() => {
    // Inicialización de gráficos de AdminLTE utilizando Chart.js
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      // Gráfico de barras (Altas y Bajas de Afiliados por Filial)
      new window.Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
          labels: ["Filial 1", "Filial 2", "Filial 3"],  // Filiales
          datasets: [
            {
              label: "Altas",
              data: [100, 120, 150],  // Datos de altas por filial
              backgroundColor: "#007236",  // Color verde
              borderColor: "#007236",
              borderWidth: 1
            },
            {
              label: "Bajas",
              data: [30, 50, 40],  // Datos de bajas por filial
              backgroundColor: "#FF6600",  // Color naranja
              borderColor: "#FF6600",
              borderWidth: 1
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

      // Gráfico de líneas (Remesas recibidas por Filial)
      new window.Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],  // Meses
          datasets: [
            {
              label: "Filial 1",
              data: [5000, 7000, 6000, 8000, 7500],  // Remesas recibidas por la Filial 1
              fill: false,
              borderColor: "#007236",  // Color verde
              tension: 0.1
            },
            {
              label: "Filial 2",
              data: [4500, 5500, 4800, 6000, 6200],  // Remesas recibidas por la Filial 2
              fill: false,
              borderColor: "#FF6600",  // Color naranja
              tension: 0.1
            },
            {
              label: "Filial 3",
              data: [3000, 4000, 3500, 5000, 4600],  // Remesas recibidas por la Filial 3
              fill: false,
              borderColor: "#F0F0E6",  // Color gris
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true
        }
      });

      // Gráfico de torta (Afiliados Activos vs Inactivos)
      new window.Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
          labels: ["Activos", "Inactivos"],
          datasets: [
            {
              label: "Afiliados Activos vs Inactivos",
              data: [300, 120],  // Datos de afiliados activos e inactivos
              backgroundColor: ["#007236", "#FF6600"]
            }
          ]
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
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Altas y Bajas de Afiliados por Filial</h3>
                </div>
                <div className="card-body">
                  <canvas id="barChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de líneas */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Remesas Recibidas por Filial</h3>
                </div>
                <div className="card-body">
                  <canvas id="lineChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de torta (pie) */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Afiliados Activos vs Inactivos</h3>
                </div>
                <div className="card-body">
                  <canvas id="pieChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
