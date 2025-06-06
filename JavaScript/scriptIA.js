document.getElementById("btnIA").addEventListener("click", async () => {
if (cultivos.length === 0) {
alert("No hay cultivos registrados");
return;
}

const cultivo = cultivos[cultivos.length - 1];
const input = cultivo.generarRecomendacion();
const respuestaDiv = document.getElementById("recomendaciones-container");

const apiKey = "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";

try {
const res = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer " + apiKey
},
body: JSON.stringify({
model: "gpt-4o",
messages: [{ role: "user", content: input }]
})
});

const data = await res.json();

if (data.choices && data.choices.length > 0) {
  respuestaDiv.textContent = data.choices[0].message.content;
const mensajeIA = data.choices[0].message.content;
respuestaDiv.textContent = mensajeIA;
const nuevaRespuestaIA = new RespuestasIA(mensajeIA);
respuestasIA.push(nuevaRespuestaIA);
localStorage.setItem("historialIA", JSON.stringify(respuestasIA));

} else if (data.error) {
  respuestaDiv.textContent = "Error: " + data.error.message;
} else {
  respuestaDiv.textContent = "Respuesta inesperada.";
}

} catch (err) {
respuestaDiv.textContent = "Error de red o solicitud: " + err.message;
}
});

class RespuestasIA{
    constructor(mensaje){
        this.mensaje=mensaje;
    }

    mostrarRespuesta(){
        return this.mensaje;
    }

    static desdeObjeto(obj) {
    return new RespuestasIA(obj.mensaje);
}
}

