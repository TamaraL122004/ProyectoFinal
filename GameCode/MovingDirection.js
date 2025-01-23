// //Para colocar el codigo relacionado a Teachable Machine

export default class MovingDirection {
  constructor() {
    this.classifier = null; // Clasificador cargado desde Teachable Machine
    this.label = "Nothing"; // Clase detectada inicialmente
    this.video = null; // Elemento de video capturado
    this.isModelLoaded = false; // Indicador de si el modelo está cargado
  }

  // Método para cargar el modelo
  async loadModel(modelURL) {
    if (this.isModelLoaded) {
      console.log("El modelo ya está cargado.");
      return;
    }

    try {
      // Cargar el clasificador
      this.classifier = await ml5.imageClassifier(modelURL + "model.json");
      console.log("Modelo cargado con éxito");
      this.isModelLoaded = true;
    } catch (error) {
      console.error("Error al cargar el modelo:", error);
      return;
    }

    // Configurar el video
    await this.setupVideo();

    // Iniciar la clasificación del video
    this.classifyVideo();
  }

  // Método para configurar la captura de video
  async setupVideo() {
    try {
      const existingVideo = document.querySelector("#video-container video");
      if (!existingVideo) {
        this.video = document.createElement("video");
        this.video.width = 320;
        this.video.height = 240;
        this.video.autoplay = true;

        // Solicitar acceso a la cámara
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.video.srcObject = stream;
        this.video.play();
      } else {
        console.log("El video ya está creado.");
        this.video = existingVideo;
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  }

  // Método para clasificar el video continuamente
  classifyVideo() {
    if (!this.isModelLoaded || !this.video) {
      console.warn("El modelo o el video no están listos para clasificar.");
      return;
    }

    this.classifier.classify(this.video, (error, results) => {
      if (error) {
        console.error("Error durante la clasificación:", error);
        return;
      }

      // Actualizar la etiqueta detectada
      if (results && results[0]) {
        this.label = results[0].label;
        this.updateGestureDisplay(this.label); // Mostrar el gesto detectado
      }

      // Clasificar nuevamente
      this.classifyVideo();
    });
  }

  // Método para actualizar el texto del gesto detectado en pantalla
  updateGestureDisplay(gesture) {
    const display = document.getElementById("gesture-display");
    if (display) {
      display.textContent = `Gesto detectado: ${gesture}`;
    }
  }

  // Método para obtener el comando del gesto detectado
  getGestureCommand() {
    return this.label;
  }

  // Método para agregar el video al contenedor en pantalla
  addVideoToScreen(containerId) {
    const container = document.getElementById(containerId);
    if (container && this.video) {
      if (!container.contains(this.video)) {
        this.video.style.width = "320px";
        this.video.style.height = "240px";
        this.video.style.border = "2px solid black";
        this.video.style.transform = "scaleX(-1)"; // Voltear horizontalmente
        container.appendChild(this.video);
      } else {
        console.log("El video ya está en el contenedor.");
      }
    } else {
      console.error(
        "No se encontró el contenedor o el video no está configurado."
      );
    }
  }
}
