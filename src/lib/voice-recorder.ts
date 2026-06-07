// iOS Safari–friendly audio recording helper.
// Captures raw PCM via Web Audio API and encodes WAV.

export type RecorderState = "idle" | "recording" | "processing";

export interface RecordingResult {
  base64: string;
  mimeType: string;
  durationMs: number;
}

export function isVoiceRecordingSupported(): boolean {
  if (typeof window === "undefined") return false;
  const AC =
    (window as any).AudioContext || (window as any).webkitAudioContext;
  return !!navigator?.mediaDevices?.getUserMedia && !!AC;
}

const TARGET_SAMPLE_RATE = 16000;

export class VoiceRecorder {
  private stream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private buffers: Float32Array[] = [];
  private startedAt = 0;
  private sourceSampleRate = 44100;

  async start(): Promise<void> {
    if (!isVoiceRecordingSupported()) {
      throw new Error(
        "Voice recording isn't supported in this browser. Try Safari 14.3+ on iOS, or Chrome.",
      );
    }
    this.buffers = [];
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const AC =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    this.audioCtx = new AC();
    this.sourceSampleRate = this.audioCtx!.sampleRate;

    this.source = this.audioCtx!.createMediaStreamSource(this.stream);
    this.processor = this.audioCtx!.createScriptProcessor(4096, 1, 1);
    this.processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      this.buffers.push(new Float32Array(input));
    };
    this.source.connect(this.processor);
    this.processor.connect(this.audioCtx!.destination);

    this.startedAt = Date.now();
  }

  async stop(): Promise<RecordingResult> {
    if (!this.audioCtx) throw new Error("Recorder is not active");
    const durationMs = Date.now() - this.startedAt;

    try {
      this.processor?.disconnect();
      this.source?.disconnect();
    } catch {}

    const merged = mergeBuffers(this.buffers);
    const downsampled = downsample(merged, this.sourceSampleRate, TARGET_SAMPLE_RATE);
    const wav = encodeWav(downsampled, TARGET_SAMPLE_RATE);
    const base64 = arrayBufferToBase64(wav);

    await this.audioCtx.close().catch(() => {});
    this.cleanup();

    return { base64, mimeType: "audio/wav", durationMs };
  }

  cancel() {
    try {
      this.processor?.disconnect();
      this.source?.disconnect();
      this.audioCtx?.close();
    } catch {}
    this.cleanup();
  }

  private cleanup() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.audioCtx = null;
    this.source = null;
    this.processor = null;
    this.buffers = [];
  }
}

function mergeBuffers(buffers: Float32Array[]): Float32Array {
  let total = 0;
  for (const b of buffers) total += b.length;
  const out = new Float32Array(total);
  let offset = 0;
  for (const b of buffers) {
    out.set(b, offset);
    offset += b.length;
  }
  return out;
}

function downsample(input: Float32Array, inRate: number, outRate: number): Float32Array {
  if (outRate === inRate) return input;
  const ratio = inRate / outRate;
  const newLength = Math.round(input.length / ratio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < newLength) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < input.length; i++) {
      accum += input[i];
      count++;
    }
    result[offsetResult] = count > 0 ? accum / count : 0;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
}

function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  };
  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunk)) as any,
    );
  }
  return btoa(binary);
}
