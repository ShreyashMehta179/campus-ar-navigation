import { useEffect, useRef, useState } from "react";
import { Camera, AlertTriangle } from "lucide-react";

type Props = { onReady?: () => void };

/** Live rear-camera feed background for AR. */
const CameraView = ({ onReady }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setRequesting(false);
          onReady?.();
        }
      } catch (e: any) {
        setRequesting(false);
        setError(e?.message ?? "Camera permission denied");
      }
    };
    start();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [onReady]);

  return (
    <>
      <video
        ref={videoRef}
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover"
      />
      {requesting && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 px-6 text-center">
          <Camera className="mb-4 h-12 w-12 animate-glow text-primary" />
          <p className="font-display text-lg text-foreground">Requesting camera…</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Allow camera access to start AR navigation.
          </p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/95 px-6 text-center">
          <AlertTriangle className="mb-4 h-12 w-12 text-accent" />
          <p className="font-display text-lg">Camera unavailable</p>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Use Chrome on Android over HTTPS for best results.
          </p>
        </div>
      )}
    </>
  );
};

export default CameraView;