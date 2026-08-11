const clases = [
  {
    n: 1,
    d: "2026-08-24",
    t: "Presentación de la materia",
    u: 1,
    desc: "Conceptualización de medios y recursos. Características y funciones de los medios y los recursos didácticos."
  },
  {
    n: 2,
    d: "2026-08-31",
    t: "Paradigmas de la utilización de medios",
    u: 1,
    desc: "Paradigmas técnico, práctico y estratégico."
  },
  {
    n: 3,
    d: "2026-09-07",
    t: "Concepción de medios",
    u: 1,
    desc: "Medios impresos, audiovisuales, manipulativos e informáticos."
  },
  {
    n: 4,
    d: "2026-09-14",
    t: "Concepciones de enseñanza",
    u: 2,
    desc: "Concepciones de enseñanza."
  },
  {
    n: 5,
    d: "2026-09-21",
    t: "Cultura escolar vs. cultura mediática",
    u: 2,
    desc: "Desbordes y conflictos entre la cultura escolar y la cultura mediática."
  },
  {
    n: 6,
    d: "2026-09-28",
    t: "Mirada crítica sobre la educación",
    u: 2,
    desc: "Tecnologías en y para la educación. Rol e identidad docente en la era digital."
  },
  {
    n: 7,
    d: "2026-10-05",
    t: "Tecnología educativa y gamificación",
    u: 2,
    desc: "Tecnología educativa en sentido didáctico. Gamificación."
  },
  {
    n: 8,
    d: "2026-10-12",
    t: "¿De qué hablamos cuando hablamos de discapacidad?",
    u: 3,
    desc: "Aproximación al concepto de discapacidad."
  },
  {
    n: 9,
    d: "2026-10-26",
    t: "Discapacidad visual y auditiva",
    u: 3,
    desc: "Medios y recursos específicos."
  },
  {
    n: 10,
    d: "2026-11-02",
    t: "Discapacidad neuromotora, intelectual y TES",
    u: 3,
    desc: "Medios y recursos específicos."
  },
  {
    n: 11,
    d: "2026-11-09",
    t: "DUA · Diseño Universal del Aprendizaje y CAA",
    u: 3,
    desc: "Diseño Universal del Aprendizaje y Comunicación Aumentativa y Alternativa."
  },
  {
    n: 12,
    d: "2026-11-16",
    t: "Encuentro de elaboración de trabajos finales",
    u: 3,
    desc: "Elaboración de trabajos finales. Entrega de borrador."
  }
];


const unidades = {
  1: [
    "Conceptos y enfoques sobre medios",
    "Clases 1 · 2 · 3"
  ],

  2: [
    "Cultura, crítica y tecnología educativa",
    "Clases 4 · 5 · 6 · 7"
  ],

  3: [
    "Inclusión y accesibilidad educativa",
    "Clases 8 · 9 · 10 · 11 · 12"
  ]
};


/* =====================================================
   FUNCIONES DE FECHA
   ===================================================== */

function disponible(fecha) {

  const hoy = new Date();

  const fechaClase =
    new Date(fecha + "T00:00:00");

  return hoy >= fechaClase;
}


function bonito(fecha) {

  const [y, m, d] = fecha.split("-");

  return `${d}/${m}`;
}


/* =====================================================
   RENDER DE LA HOJA DE RUTA
   ===================================================== */

function render() {

  const root =
    document.getElementById("roadmap");

  if (!root) return;

  root.innerHTML = "";


  [1, 2, 3].forEach(u => {

    let section =
      document.createElement("section");

    section.id =
      `unidad-${u}`;

    section.className =
      `unit unit-${u}`;


    section.innerHTML = `

      <div class="unit-head">

        <div class="number">
          UNIDAD ${u}
        </div>

        <h2>
          ${unidades[u][0]}
        </h2>

        <p>
          ${unidades[u][1]}
        </p>

      </div>

      <div class="cards"></div>

    `;


    const cards =
      section.querySelector(".cards");


    clases
      .filter(c => c.u === u)
      .forEach(c => {

        const ok =
          disponible(c.d);


        const card =
          document.createElement("article");


        card.className =
          `card ${ok ? "available" : "future-card"}`;


        card.innerHTML = `

          <div class="card-top">

            <div class="num">
              ${String(c.n).padStart(2, "0")}
            </div>

            <div class="date">
              ${bonito(c.d)} · 2026
            </div>

          </div>


          <h3>
            ${c.t}
          </h3>


          <p>
            ${c.desc}
          </p>


          <div class="status ${ok ? "available" : "future"}">

            ${
              ok

              ? `
                ● DISPONIBLE

                <br>

                <a
                  class="open-btn"
                  href="clases/clase${String(c.n).padStart(2, "0")}.html"
                >
                  INGRESAR →
                </a>
              `

              : `
                🔒 PRÓXIMAMENTE
                · SE HABILITA EL ${bonito(c.d)}
              `
            }

          </div>

        `;


        cards.appendChild(card);

      });


    root.appendChild(section);

  });


  /* =====================================================
     CONTADOR
     ===================================================== */

  const cantidadDisponible =
    clases.filter(c => disponible(c.d)).length;


  const progressLabel =
    document.getElementById("progress-label");


  const progressBar =
    document.getElementById("progress-bar");


  if (progressLabel) {

    progressLabel.textContent =
      `${cantidadDisponible} de 12 clases disponibles`;

  }


  if (progressBar) {

    progressBar.style.width =
      `${cantidadDisponible / 12 * 100}%`;

  }

}


/* =====================================================
   INICIAR
   ===================================================== */

render();
