// src/components/ar/CameraView.tsx
// FIXED ESLint no-explicit-any error

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  AlertTriangle,
} from "lucide-react";

type Props = {
  onReady?: () => void;
};

const CameraView = ({
  onReady,
}: Props) => {
  const videoRef =
    useRef<HTMLVideoElement>(
      null
    );

  const [error, setError] =
    useState<string | null>(
      null
    );

  const [
    requesting,
    setRequesting,
  ] = useState(true);

  useEffect(() => {
    let stream:
      | MediaStream
      | null = null;

    const start =
      async () => {
        try {
          if (
            !navigator
              .mediaDevices
              ?.getUserMedia
          ) {
            throw new Error(
              "Camera not supported"
            );
          }

          stream =
            await navigator.mediaDevices.getUserMedia(
              {
                video: {
                  facingMode:
                    {
                      ideal:
                        "environment",
                    },
                },
                audio: false,
              }
            );

          if (
            videoRef.current
          ) {
            videoRef.current.srcObject =
              stream;

            videoRef.current
              .play()
              .catch(
                () => {}
              );

            setTimeout(
              () => {
                setRequesting(
                  false
                );

                onReady?.();
              },
              700
            );
          }
        } catch (
          err: unknown
        ) {
          setRequesting(
            false
          );

          if (
            err instanceof
            Error
          ) {
            setError(
              err.message
            );
          } else {
            setError(
              "Camera permission denied"
            );
          }
        }
      };

    start();

    return () => {
      stream
        ?.getTracks()
        .forEach((t) =>
          t.stop()
        );
    };
  }, [onReady]);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        controls={false}
        className="absolute inset-0 h-full w-full object-cover bg-black"
      />

      {requesting && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 px-6 text-center">
          <Camera className="mb-4 h-12 w-12 animate-pulse text-primary" />

          <p className="text-lg font-bold">
            Opening Camera...
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Please allow camera access
          </p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/95 px-6 text-center">
          <AlertTriangle className="mb-4 h-12 w-12 text-red-400" />

          <p className="text-lg font-bold">
            Camera Unavailable
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            {error}
          </p>

          <p className="mt-4 text-xs text-muted-foreground">
            Use Chrome on Android with HTTPS.
          </p>
        </div>
      )}
    </>
  );
};

export default CameraView;