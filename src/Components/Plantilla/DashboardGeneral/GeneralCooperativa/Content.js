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
          labels: ["Filial 1", "Filial 2", "Filial 3"], // Filiales
          datasets: [
            {
              label: "Altas",
              data: [100, 120, 150], // Datos de altas por filial
              backgroundColor: "#007236", // Color verde
              borderColor: "#007236",
              borderWidth: 1,
            },
            {
              label: "Bajas",
              data: [30, 50, 40], // Datos de bajas por filial
              backgroundColor: "#FF6600", // Color naranja
              borderColor: "#FF6600",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Gráfico de líneas (Carteras de préstamos por Filial)
      new window.Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"], // Meses
          datasets: [
            {
              label: "Filial 1",
              data: [100000, 120000, 115000, 130000, 140000], // Saldo de la cartera de préstamos de Filial 1
              fill: false,
              borderColor: "#007236", // Color verde
              tension: 0.1,
            },
            {
              label: "Filial 2",
              data: [80000, 85000, 90000, 95000, 100000], // Saldo de la cartera de préstamos de Filial 2
              fill: false,
              borderColor: "#FF6600", // Color naranja
              tension: 0.1,
            },
            {
              label: "Filial 3",
              data: [50000, 60000, 70000, 75000, 80000], // Saldo de la cartera de préstamos de Filial 3
              fill: false,
              borderColor: "#F0F0E6", // Color gris
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      // Gráfico de torta (Distribución de Préstamos Aprobados por Tipo)
      new window.Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
          labels: ["Personal", "Hipotecario", "Vehicular", "Estudios"],
          datasets: [
            {
              label: "Distribución de Préstamos Aprobados",
              data: [40, 30, 20, 10], // Proporción de tipos de préstamos aprobados
              backgroundColor: ["#007236", "#FF6600", "#F0F0E6", "#FF7F32"],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      // Gráfico de barras (Tasas de Interés de Préstamos)
      new window.Chart(document.getElementById("interestChart"), {
        type: "bar",
        data: {
          labels: ["Personal", "Hipotecario", "Vehicular", "Estudios"],
          datasets: [
            {
              label: "Tasas de Interés (%)",
              data: [10, 8, 12, 7], // Tasas de interés para cada tipo de préstamo
              backgroundColor: "#007236", // Color verde
              borderColor: "#007236",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="content-wrapper" style={{ backgroundColor: "#F0F0E6" }}>
      <section className="content py-4">
        <div className="container-fluid px-3 px-md-4">
          <div className="row g-4 justify-content-center">
            {/* Gráfico de líneas - Carteras de préstamos */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    Carteras de Préstamos por Filial
                  </h3>
                </div>
                <div className="card-body">
                  <canvas id="lineChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de torta - Préstamos aprobados */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    Distribución de Préstamos Aprobados por Tipo
                  </h3>
                </div>
                <div className="card-body">
                  <canvas id="pieChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Gráfico de barras - Tasas de interés */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Tasas de Interés de Préstamos</h3>
                </div>
                <div className="card-body">
                  <canvas id="interestChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
