// src/components/ar/CameraView.tsx
// FULL ESLINT FIXED VERSION
// Fixed:
// react-hooks/exhaustive-deps
// missing dependency
// ref cleanup warning

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Camera,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

type Props = {
  onReady?: () => void;
};

const CameraView = ({ onReady }: Props) => {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const startCamera = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Camera not supported on this device."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

      const video = videoRef.current;

      if (video) {
        video.srcObject = stream;

        await video.play().catch(() => {});

        setTimeout(() => {
          setLoading(false);
          onReady?.();
        }, 500);
      }
    } catch (err: unknown) {
      setLoading(false);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to open camera.");
      }
    }
  }, [onReady]);

  useEffect(() => {
    startCamera();

    const videoElement = videoRef.current;

    return () => {
      const stream =
        videoElement?.srcObject as MediaStream | null;

      stream?.getTracks().forEach((track) =>
        track.stop()
      );
    };
  }, [startCamera]);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* CAMERA VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        controls={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* TOP OVERLAY */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-[2]" />

      {/* BOTTOM OVERLAY */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent z-[2]" />

      {/* LOADING */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/75 text-center px-6">
          <Camera className="h-14 w-14 animate-pulse text-cyan-400" />

          <p className="mt-4 text-lg font-bold text-white">
            Opening Camera...
          </p>

          <p className="mt-1 text-sm text-white/70">
            Please allow camera permission
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 px-6 text-center">
          <AlertTriangle className="h-14 w-14 text-red-400" />

          <p className="mt-4 text-lg font-bold text-white">
            Camera Unavailable
          </p>

          <p className="mt-2 text-sm text-white/70">
            {error}
          </p>

          <button
            onClick={startCamera}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-bold text-black"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Camera
          </button>

          <p className="mt-4 text-xs text-white/50">
            Use HTTPS + Chrome on mobile.
          </p>
        </div>
      )}
    </div>
  );
};

export default CameraView;