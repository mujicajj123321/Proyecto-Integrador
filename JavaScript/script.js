class Cultivo {
    constructor(tipo, variedad, fecha, etapa, ubicacion, area, tipoSuelo, phSuelo, nivelMateriaO, climaP, temperaturaP, precipitacionesP, estacionA, eventosExtremos, tipoSistema, frecuenciaAgua, cantidadAgua, tipoFertilizante, frecuenciaFertilizante, plagas, pesticidas) {
        this.tipo = tipo;
        this.variedad = variedad;
        this.fecha = fecha;
        this.etapa = etapa;
        this.geografia = new Geografia(ubicacion, area, tipoSuelo, phSuelo, nivelMateriaO);
        this.condicionAtmosferica = new CondicionAtmosferica(climaP, temperaturaP, precipitacionesP, estacionA, eventosExtremos);
        this.sistemaRiego = new SistemaRiego(tipoSistema, frecuenciaAgua, cantidadAgua);
        this.fertilizante = new Fertilizante(tipoFertilizante, frecuenciaFertilizante, plagas, pesticidas);
    }

    

static desdeObjeto(obj) {
    return new Cultivo(
        obj.tipo,
        obj.variedad,
        obj.fecha,
        obj.etapa,
        obj.geografia.ubicacion,
        obj.geografia.area,
        obj.geografia.tipoSuelo,
        obj.geografia.phSuelo,
        obj.geografia.nivelMateriaO,
        obj.condicionAtmosferica.climaP,
        obj.condicionAtmosferica.temperaturaP,
        obj.condicionAtmosferica.precipitacionesP,
        obj.condicionAtmosferica.estacionA,
        obj.condicionAtmosferica.eventosExtremos,
        obj.sistemaRiego.tipoSistema,
        obj.sistemaRiego.frecuenciaAgua,
        obj.sistemaRiego.cantidadAgua,
        obj.fertilizante.tipoFertilizante,
        obj.fertilizante.frecuenciaFertilizante,
        obj.fertilizante.plagas,
        obj.fertilizante.pesticidas
    );
}

    obtenerResumen() {
        return `
        <div class="cultivo-card">
            <h3>Resumen del cultivo</h3>
            <p><strong>Tipo de cultivo:</strong> ${this.tipo}</p>
            <p><strong>Variedad:</strong> ${this.variedad}</p>
            <p><strong>Fecha de siembra:</strong> ${this.fecha}</p>
            <p><strong>Etapa:</strong> ${this.etapa}</p>
            <p><strong>Ubicación:</strong> ${this.geografia.ubicacion}</p>
            <p><strong>Área:</strong> ${this.geografia.area} hectáreas</p>
            <p><strong>Tipo de suelo:</strong> ${this.geografia.tipoSuelo}</p>
            <p><strong>pH del suelo:</strong> ${this.geografia.phSuelo}</p>
            <p><strong>Nivel materia orgánica:</strong> ${this.geografia.nivelMateriaO}%</p>
            <p><strong>Clima:</strong> ${this.condicionAtmosferica.climaP}</p>
            <p><strong>Temperatura promedio:</strong> ${this.condicionAtmosferica.temperaturaP}°C</p>
            <p><strong>Precipitaciones promedio:</strong> ${this.condicionAtmosferica.precipitacionesP} mm/mes</p>
            <p><strong>Estación:</strong> ${this.condicionAtmosferica.estacionA}</p>
            <p><strong>Eventos extremos:</strong> ${this.condicionAtmosferica.eventosExtremos}</p>
            <p><strong>Sistema de riego:</strong> ${this.sistemaRiego.tipoSistema}</p>
            <p><strong>Frecuencia de riego:</strong> ${this.sistemaRiego.frecuenciaAgua} veces/semana</p>
            <p><strong>Cantidad de agua por riego:</strong> ${this.sistemaRiego.cantidadAgua} litros/hectárea</p>
            <p><strong>Fertilizante:</strong> ${this.fertilizante.tipoFertilizante}</p>
            <p><strong>Frecuencia de fertilización:</strong> ${this.fertilizante.frecuenciaFertilizante}</p>
            <p><strong>Plagas:</strong> ${this.fertilizante.plagas}</p>
            <p><strong>Pesticidas:</strong> ${this.fertilizante.pesticidas}</p>
        </div>
        <hr>
        `;
    }

    buscarHistorial(cultivo){
        const cultivoBuscar = cultivos.find(c => c.tipo === cultivo || c.variedad=== cultivo);
        if(!cultivoBuscar){
            alert("Cultivo no encontrado");
        }else{
            alert("historial del cultivo mostrado");
            cultivoBuscar.obtenerResumen();
        }
    }
}

class Geografia {
    constructor(ubicacion, area, tipoSuelo, phSuelo, nivelMateriaO) {
        this.ubicacion = ubicacion;
        this.area = area;
        this.tipoSuelo = tipoSuelo;
        this.phSuelo = phSuelo;
        this.nivelMateriaO = nivelMateriaO;
    }
}

class CondicionAtmosferica {
    constructor(climaP, temperaturaP, precipitacionesP, estacionA, eventosExtremos) {
        this.climaP = climaP;
        this.temperaturaP = temperaturaP;
        this.precipitacionesP = precipitacionesP;
        this.estacionA = estacionA;
        this.eventosExtremos = eventosExtremos;
    }
}

class SistemaRiego {
    constructor(tipoSistema, frecuenciaAgua, cantidadAgua) {
        this.tipoSistema = tipoSistema;
        this.frecuenciaAgua = frecuenciaAgua;
        this.cantidadAgua = cantidadAgua;
    }
}

class Fertilizante {
    constructor(tipoFertilizante, frecuenciaFertilizante, plagas, pesticidas) {
        this.tipoFertilizante = tipoFertilizante;
        this.frecuenciaFertilizante = frecuenciaFertilizante;
        this.plagas = plagas;
        this.pesticidas = pesticidas;
    }
}


let cultivos = []

const historialGuardado = localStorage.getItem("cultivos");
if (historialGuardado) {
    const cultivosJSON = JSON.parse(historialGuardado);
    cultivos = cultivosJSON.map(c => Cultivo.desdeObjeto(c));
    if(cultivos.length === 0){
        console.log("no haz añadido cultivos");
    }else{
        document.getElementById("cultivos-container").innerHTML="";
        cultivos.forEach(c =>{
        document.getElementById("cultivos-container").innerHTML+=c.obtenerResumen();
    });
    };
}
document.getElementById("FormularioCultivoRiego").addEventListener("submit", event=>{
    event.preventDefault();
    console.log("Formulario enviado");

    const tipo = document.getElementById("tipoCultivo").value;
    const variedad = document.getElementById("variedadPlanta").value;
    const fecha = document.getElementById("fechaSiembra").value;
    const etapa = document.getElementById("etapaCrecimiento").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const area = document.getElementById("area").value;
    const tipoSuelo = document.getElementById("tipoSuelo").value;
    const phSuelo = document.getElementById("phSuelo").value;
    const nivelMateriaO = document.getElementById("materiaOrganica").value;
    const climaP = document.getElementById("clima").value;
    const temperaturaP = document.getElementById("temperatura").value;
    const precipitacionesP = document.getElementById("precipitaciones").value;
    const estacionA = document.getElementById("estacion").value;
    const eventosExtremos = document.getElementById("eventos").value;
    const tipoSistema = document.getElementById("tipoRiego").value;
    const frecuenciaAgua = document.getElementById("frecuenciaRiego").value;
    const cantidadAgua = document.getElementById("cantidadAgua").value;
    const tipoFertilizante = document.getElementById("fertilizante").value;
    const frecuenciaFertilizante = document.getElementById("frecuenciaAplicacion").value;
    const plagas = document.getElementById("plagas").value;
    const pesticidas = document.getElementById("pesticidas").value;

    const cultivoN = new Cultivo(tipo, variedad, fecha, etapa, ubicacion, area, tipoSuelo, phSuelo, nivelMateriaO, climaP, temperaturaP, precipitacionesP, estacionA, eventosExtremos, tipoSistema, frecuenciaAgua, cantidadAgua, tipoFertilizante, frecuenciaFertilizante, plagas, pesticidas);

    cultivos.push(cultivoN);

    localStorage.setItem("cultivos", JSON.stringify(cultivos));

    alert(`cultivo registrado nombre: ${cultivoN.tipo}(${cultivoN.variedad})`);

    document.getElementById("cultivos-container").innerHTML += cultivoN.obtenerResumen();
    document.getElementById("mensaje-vacio").innerHTML = "";

    document.getElementById("FormularioCultivo").reset();
    document.getElementById("FormularioCultivoGeo").reset();
    document.getElementById("FormularioCultivoRiego").reset();
});

document.getElementById("mostrarHistorial").addEventListener("submit", event=>{
    event.preventDefault();

    if(cultivos.length === 0){
        alert("no haz añadido cultivos");return;
    }else{
        alert("historial cargado en la sección correspondiente");
        document.getElementById("cultivos-container").innerHTML="";
        cultivos.forEach(c =>{
        document.getElementById("cultivos-container").innerHTML+=c.obtenerResumen();
    })
    };

    location.hash = "#historial";
});

document.getElementById("buscarFecha").addEventListener("submit", event =>{
    event.preventDefault();

    const fecha = document.getElementById("fechaHistorial").value;

    const buscarFecha = cultivos.find(c=>c.fecha===fecha);

    if(!buscarFecha){
        alert("no hay registros en la fecha ingresada");return;
    }else{
        document.getElementById("cultivos-container").innerHTML="";
        alert("Historial por fecha cargado en la sección Historial")
        cultivos.forEach(c=>{
        if(c.fecha===fecha){
            document.getElementById("cultivos-container").innerHTML+=c.obtenerResumen();
        }
        location.hash = "#historial";
    });
    }

    document.getElementById("buscarFecha").reset();
});

document.getElementById("buscarCultivo").addEventListener("submit", event=>{
    event.preventDefault();

    const cultivoN = document.getElementById("cultivoB").value;

    const cultivoNo = cultivos.find(c=> c.tipo===cultivoN || c.variedad===cultivoN);

    if(!cultivoNo){
        alert("Cultivo no encontrado");return;
    }else{
        document.getElementById("cultivos-container").innerHTML="";
        cultivos.forEach(c=>{
            if(c.tipo===cultivoN || c.variedad===cultivoN){
                document.getElementById("cultivos-container").innerHTML+=c.obtenerResumen();
            }
        });
    }
    location.hash = "#historial";

    document.getElementById("buscarCultivo").reset();
})

document.getElementById("exportarPDF").addEventListener("click", () => {
    if (cultivos.length === 0) {
        alert("No hay cultivos para exportar.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(12);
    doc.text("Historial de Cultivos", 10, y);
    y += 10;

    cultivos.forEach((cultivo, index) => {
        const resumen = [
            `Cultivo ${index + 1}`,
            `Tipo: ${cultivo.tipo}`,
            `Variedad: ${cultivo.variedad}`,
            `Fecha: ${cultivo.fecha}`,
            `Etapa: ${cultivo.etapa}`,
            `Ubicación: ${cultivo.geografia.ubicacion}`,
            `Área: ${cultivo.geografia.area} ha`,
            `Suelo: ${cultivo.geografia.tipoSuelo}, pH ${cultivo.geografia.phSuelo}, Materia Orgánica ${cultivo.geografia.nivelMateriaO}%`,
            `Clima: ${cultivo.condicionAtmosferica.climaP}, Temp: ${cultivo.condicionAtmosferica.temperaturaP}°C, Precip: ${cultivo.condicionAtmosferica.precipitacionesP} mm`,
            `Estación: ${cultivo.condicionAtmosferica.estacionA}, Eventos: ${cultivo.condicionAtmosferica.eventosExtremos}`,
            `Riego: ${cultivo.sistemaRiego.tipoSistema}, Frecuencia: ${cultivo.sistemaRiego.frecuenciaAgua}/sem, Cantidad: ${cultivo.sistemaRiego.cantidadAgua} L/ha`,
            `Fertilizante: ${cultivo.fertilizante.tipoFertilizante}, Frecuencia: ${cultivo.fertilizante.frecuenciaFertilizante}`,
            `Plagas: ${cultivo.fertilizante.plagas}, Pesticidas: ${cultivo.fertilizante.pesticidas}`
        ];

        resumen.forEach(linea => {
            if (y >= 280) { 
                doc.addPage();
                y = 10;
            }
            doc.text(linea, 10, y);
            y += 7;
        });

        y += 5;
    });

    doc.save("historial_cultivos.pdf");
});
