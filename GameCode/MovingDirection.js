//Para colocar el codigo relacionado a Teachable Machine
export default class MovingDirection {
  constructor() {
    this.classifier = null;
    this.label = "Nothing"; // Clase detectada
    this.video = null; // Referencia al video capturado
    this.isModelLoaded = false;
  }

  // Cargar el modelo
  async loadModel(modelURL) {
    this.classifier = ml5.imageClassifier(modelURL + "model.json", () => {
      console.log("Modelo cargado con éxito");
      this.isModelLoaded = true;
    });

    // Configurar la cámara
    this.video = document.createElement("video");
    this.video.width = 320;
    this.video.height = 240;
    this.video.autoplay = true;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.video.srcObject = stream;
    this.video.play();

    this.classifyVideo(); // Iniciar clasificación de video
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
}
