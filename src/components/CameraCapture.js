import React, { useRef, useEffect, useState } from 'react';

export function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        alert('Camera access denied: ' + err.message);
      }
    }

    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  const capturePhoto = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);
    canvasRef.current.toBlob(async (blob) => {
      try {
        const formData = new FormData();
        formData.append('file', blob, 'selfie.jpg');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const { url } = await res.json();
        onCapture(url);
        if (stream) stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        alert('Upload failed: ' + err.message);
      }
    }, 'image/jpeg');
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay playsInline width={320} height={240} className="rounded shadow" />
      <canvas ref={canvasRef} width={320} height={240} style={{ display: 'none' }} />
      <button
        onClick={capturePhoto}
        className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow"
      >
        Take Selfie
      </button>
    </div>
  );
}

export default CameraCapture;