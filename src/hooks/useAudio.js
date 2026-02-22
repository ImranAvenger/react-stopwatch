import { useEffect, useRef } from "react";
import { audioManager } from "../utils/audioManager";

export function useAudio(runningAudioUrl) {
  const audioSourceRef = useRef(null);

  useEffect(() => {
    audioManager.loadAudioFile(runningAudioUrl).catch((e) => {
      console.error("Failed to preload audio:", e);
    });
  }, [runningAudioUrl]);

  const playSound = (frequency, duration) => {
    audioManager.playSound(frequency, duration);
  };

  const startRunningSound = () => {
    const audioBuffer = audioManager.getAudioBuffer();
    const ctx = audioManager.getContext();

    if (!audioBuffer || !ctx) return;

    // Resume context if suspended
    if (ctx.state === "suspended") {
      ctx.resume().catch((e) => {
        console.error("Failed to resume audio context:", e);
      });
    }

    try {
      // Stop any existing source
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }

      // Create new source for seamless loop
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.25, ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(ctx.currentTime);
      audioSourceRef.current = source;
      console.log("Running sound started");
    } catch (e) {
      console.error("Failed to start running sound:", e);
    }
  };

  const stopRunningSound = () => {
    if (audioSourceRef.current) {
      try {
        audioSourceRef.current.stop();
        console.log("Running sound stopped");
      } catch (e) {
        console.warn("Audio source was already stopped:", e);
      }
      audioSourceRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      try {
        if (audioSourceRef.current) {
          audioSourceRef.current.stop();
          console.log("Audio source cleaned up");
        }
      } catch (e) {
        console.warn("Audio source was already stopped:", e);
      }
    };
  }, []);

  return {
    playSound,
    startRunningSound,
    stopRunningSound,
  };
}
