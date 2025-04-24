class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs) {
    const input = inputs[0][0];
    if (!input) return true;

    // Converte para PCM16
    const pcm16Buffer = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      pcm16Buffer[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    this.port.postMessage(pcm16Buffer.buffer, [pcm16Buffer.buffer]);
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
