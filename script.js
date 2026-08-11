const clases=[
{n:1,d:"2026-08-24",t:"Presentación de la materia",u:1,desc:"Conceptualización de medios y recursos. Características y funciones de los medios y los recursos didácticos."},
{n:2,d:"2026-09-01",t:"Paradigmas de la utilización de medios",u:1,desc:"Paradigmas técnico, práctico y estratégico y utilización de medios y recursos didácticos en el aula."},
{n:3,d:"2026-08-31",t:"Concepción de medios",u:1,desc:"Medios impresos, audiovisuales, manipulativos e informáticos."},
{n:4,d:"2026-09-07",t:"Concepciones de enseñanza",u:2,desc:"Concepciones de enseñanza."},
{n:5,d:"2026-09-14",t:"Cultura escolar vs. cultura mediática",u:2,desc:"Desbordes y conflictos entre la cultura escolar y la cultura mediática."},
{n:6,d:"2026-09-21",t:"Mirada crítica sobre la educación",u:2,desc:"Tecnologías en y para la educación. Rol docente en la era digital. Diseño de cursos virtuales."},
{n:7,d:"2026-09-28",t:"Tecnología educativa y gamificación",u:2,desc:"Tecnología educativa en sentido didáctico. Gamificación. Diseño y uso de medios educativos."},
{n:8,d:"2026-10-05",t:"¿De qué hablamos cuando hablamos de discapacidad?",u:3,desc:"Aproximación al concepto de discapacidad."},
{n:9,d:"2026-10-19",t:"Discapacidad visual y auditiva",u:3,desc:"Medios y recursos específicos."},
{n:10,d:"2026-10-26",t:"Discapacidad neuromotora, intelectual y TES",u:3,desc:"Medios y recursos específicos."},
{n:11,d:"2026-11-02",t:"DUA · Diseño Universal del Aprendizaje y CAA",u:3,desc:"Diseño Universal del Aprendizaje y Comunicación Aumentativa y Alternativa."},
{n:12,d:"2026-11-09",t:"Encuentro de elaboración de trabajos finales",u:3,desc:"Elaboración de trabajos finales. Entrega de borrador."}
];
const unidades={
1:["Conceptos y enfoques sobre medios","Clases 1 · 2 · 3"],
2:["Cultura, crítica y tecnología educativa","Clases 4 · 5 · 6 · 7"],
3:["Inclusión y accesibilidad educativa","Clases 8 · 9 · 10 · 11 · 12"]
};
function hoy(){const x=new Date();return x.toISOString().slice(0,10)}
function bonito(x){const [y,m,d]=x.split("-");return `${d}/${m}`}
function disponible(x){return hoy()>=x}
function render(){
 const root=document.getElementById("roadmap");root.innerHTML="";
 [1,2,3].forEach(u=>{
   const s=document.createElement("section");s.id=`unidad-${u}`;s.className=`unit unit-${u}`;
   s.innerHTML=`<div class="unit-head"><div class="number">UNIDAD ${u}</div><h2>${unidades[u][0]}</h2><p>${unidades[u][1]}</p></div><div class="cards"></div>`;
   const cards=s.querySelector(".cards");
   clases.filter(c=>c.u===u).forEach(c=>{
     const ok=disponible(c.d), card=document.createElement("article");
     card.className=`card ${ok?"available":"future-card"}`;
     card.innerHTML=`<div class="card-top"><div class="num">${String(c.n).padStart(2,"0")}</div><div class="date">${bonito(c.d)} · 2026</div></div><h3>${c.t}</h3><p>${c.desc}</p><div class="status ${ok?"available":"future"}">${ok?`● DISPONIBLE<br><a class="open-btn" href="clases/clase${String(c.n).padStart(2,"0")}.html">INGRESAR →</a>`:`🔒 PRÓXIMAMENTE · SE HABILITA EL ${bonito(c.d)}`}</div>`;
     cards.appendChild(card);
   });
   root.appendChild(s);
 });
 const n=clases.filter(c=>disponible(c.d)).length;
 document.getElementById("progress-label").textContent=`${n} de 12 clases disponibles`;
 document.getElementById("progress-bar").style.width=`${n/12*100}%`;
}
render();
