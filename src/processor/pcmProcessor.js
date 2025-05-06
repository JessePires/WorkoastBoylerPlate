class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (!input || !input[0]) return true;

    const inputChannel = input[0]; // Mono
    const float32Array = new Float32Array(inputChannel.length);
    float32Array.set(inputChannel);

    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);

    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    this.port.postMessage(buffer);

    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
