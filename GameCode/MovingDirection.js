// //Para colocar el codigo relacionado a Teachable Machine

export default class MovingDirection {
  constructor() {
    this.classifier = null;
    this.label = "Nothing"; // Clase detectada
    this.video = null; // Referencia al video capturado
    this.isModelLoaded = false;
  }

  // Cargar el modelo
  async loadModel(modelURL) {
    // Verificar si el modelo ya está cargado
    if (this.isModelLoaded) {
      console.log("El modelo ya está cargado.");
      return;
    }

    this.classifier = ml5.imageClassifier(modelURL + "model.json", () => {
      console.log("Modelo cargado con éxito");
      this.isModelLoaded = true;
    });

    // Verificar si ya existe un video en el contenedor
    const existingVideo = document.querySelector("#video-container video");
    if (!existingVideo) {
      // Crear el video solo si no existe
      this.video = document.createElement("video");
      this.video.width = 320;
      this.video.height = 240;
      this.video.autoplay = true;
      this.video.style.transform = "scaleX(-1)"; // Reflejar el video horizontalmente
      this.video.style.objectFit = "cover"; // Ajustar el contenido al tamaño del video

      // Configurar el stream de la cámara
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.srcObject = stream;
      this.video.play();
    } else {
      console.log("El video ya está creado.");
      this.video = existingVideo; // Reutilizar el video existente
    }

    this.classifyVideo(); // Iniciar clasificación del video
  }

  // Clasificar el video
  classifyVideo() {
    if (this.isModelLoaded) {
      this.classifier.classify(this.video, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }

        // Actualizar la etiqueta detectada
        if (results && results[0]) {
          this.label = results[0].label;
        }

        // Clasificar de nuevo
        this.classifyVideo();
      });
    }
  }

  // Obtener el gesto detectado
  getGestureCommand() {
    return this.label;
  }

  // Agregar el video al contenedor
  addVideoToScreen(containerId) {
    // Busca el contenedor donde se agregará el video
    const container = document.getElementById(containerId);
    if (container && this.video) {
      // Verificar si el video ya está en el contenedor
      if (!container.contains(this.video)) {
        this.video.style.width = "320px";
        this.video.style.height = "240px";
        this.video.style.border = "2px solid black"; // Opcional, para destacar el video
        container.appendChild(this.video);
      } else {
        console.log("El video ya está en el contenedor.");
      }
    }
  }
}
