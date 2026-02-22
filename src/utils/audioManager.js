export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.audioBuffer = null;
  }

  initContext() {
    if (!this.audioContext) {
      this.audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
      console.log("Audio context created");
    }
    return this.audioContext;
  }

  playSound(frequency, duration) {
    try {
      if (!this.audioContext) {
        this.initContext();
      }

      const ctx = this.audioContext;

      // Resume context if suspended (user interaction requirement)
      if (ctx.state === "suspended") {
        ctx
          .resume()
          .catch((e) => console.error("Failed to resume context:", e));
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + duration,
      );

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio playback error:", e);
    }
  }

  async loadAudioFile(audioUrl) {
    try {
      if (!this.audioContext) {
        this.initContext();
      }

      if (!this.audioBuffer) {
        const response = await fetch(audioUrl);
        if (!response.ok) throw new Error("Failed to fetch audio");
        const arrayBuffer = await response.arrayBuffer();

        console.log("Audio file loaded, decoding...");
        return new Promise((resolve, reject) => {
          this.audioContext.decodeAudioData(
            arrayBuffer,
            (buffer) => {
              this.audioBuffer = buffer;
              console.log("Audio decoded successfully");
              resolve(buffer);
            },
            (e) => {
              console.error("Failed to decode audio:", e);
              reject(e);
            },
          );
        });
      }
      return this.audioBuffer;
    } catch (e) {
      console.error("Audio context error:", e);
      throw e;
    }
  }

  getContext() {
    if (!this.audioContext) {
      this.initContext();
    }
    return this.audioContext;
  }

  getAudioBuffer() {
    return this.audioBuffer;
  }
}

export const audioManager = new AudioManager();
