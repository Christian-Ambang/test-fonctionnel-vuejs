// Init blob video
let blob = null;

// Load jszip.js pour zip fichier
//https://gildas-lormeau.github.io/zip.js/api/index.html

// import { ZipWriter, BlobWriter, BlobReader, TextReader } from "./jszip.js";
import JSZip from "./jszip.js";
import CircularJSON from "./cycle.js";
// const JSZip = require("./jszip");
// const CircularJSON = require("./cycle");

async function zipGenerate(
  video,
  log,
  warn,
  error,
  info,
  descriptif,
  commentaire
) {
  const { ZipWriter, BlobWriter, BlobReader, TextReader } = JSZip();
  const zipWriter = new ZipWriter(new BlobWriter("application/zip"));
  await Promise.all([
    zipWriter.add("testFonctionnel.webm", new BlobReader(video)),
    zipWriter.add("log.json", new BlobReader(log)),
    zipWriter.add("warn.json", new BlobReader(warn)),
    zipWriter.add("error.json", new BlobReader(error)),
    zipWriter.add("info.json", new BlobReader(info)),
    zipWriter.add(
      "descriptif.txt",
      new TextReader(descriptif + "\n\n" + commentaire)
    ),
  ]);
  return zipWriter.close();
}

// On instancie le lien de téléchargement
function downloadFile(blob, loadZip) {
  loadZip.download = "testFonctionnel.zip";
  loadZip.href = URL.createObjectURL(blob);
}

(function (console) {
  console.save = function (data, filename) {
    if (!data) {
      console.error("Console.save: No data");
      return;
    }

    if (!filename) filename = "console.json";

    if (typeof data === "object") {
      const cloneData = { ...data };
      data = CircularJSON.stringify(cloneData, null, 4);
    }

    var blob = new Blob([data], { type: "text/json" });
    return blob;
  };
})(console);

// Lancement du stream screen
async function startCapture(displayMediaOptions, videoElem) {
  try {
    let screenStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );

    const stream = new MediaStream([...screenStream.getTracks()]);

    videoElem.src = null;
    videoElem.srcObject = stream;
    videoElem.muted = true;

    let recorder = new MediaRecorder(stream);
    let chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      blob = new Blob(chunks, {
        type: "video/webm",
      });

      chunks = [];
    };
    recorder.start(200);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function stopCapture(videoElem) {
  let tracks = videoElem.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}

function zipCapture(
  dataLog,
  dataWarn,
  dataError,
  dataInfo,
  loadZip,
  descriptif,
  commentaire
) {
  let video = blob;
  let log = console.save(dataLog);
  let warn = console.save(dataWarn);
  let error = console.save(dataError);
  let info = console.save(dataInfo);
  zipGenerate(video, log, warn, error, info, descriptif, commentaire).then(
    (blob) => {
      downloadFile(blob, loadZip);
    }
  );
}

export { startCapture as start, stopCapture as stop, zipCapture as zip };
