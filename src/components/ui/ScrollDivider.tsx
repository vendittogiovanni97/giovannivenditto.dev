"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollDividerProps {
  color?: string;
  height?: number;
}

export function ScrollDivider({ color = "#b8ff3c", height = 120 }: ScrollDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible || isMobile) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec4 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = (aPosition.xy + 1.0) * 0.5;
        gl_Position = aPosition;
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float uScroll;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uColor;

      void main() {
        vec2 uv = vUv;
        float progress = uScroll;

        float wave1 = sin(uv.x * 6.0 + uTime * 0.5) * 0.03;
        float wave2 = sin(uv.x * 12.0 - uTime * 0.3) * 0.015;
        float wave3 = cos(uv.x * 3.0 + uTime * 0.7) * 0.02;

        float lineY = 0.5 + wave1 + wave2 + wave3;
        float dist = abs(uv.y - lineY);

        float glow = smoothstep(0.08, 0.0, dist) * progress;
        float core = smoothstep(0.02, 0.0, dist) * progress;

        vec3 color = uColor * glow * 0.5 + uColor * core;

        float particles = 0.0;
        for (float i = 0.0; i < 5.0; i++) {
          float px = fract(sin(i * 127.1 + floor(uTime * 0.5)) * 43758.5);
          float py = 0.5 + sin(uTime * 0.3 + i * 2.1) * 0.3;
          float pdist = length(uv - vec2(px, py));
          particles += smoothstep(0.01, 0.0, pdist) * progress * 0.6;
        }

        color += uColor * particles;

        float alpha = (glow + core + particles) * 0.8;
        gl_FragColor = vec4(color, alpha);
      }
    `;

    function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const positions = new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    const uScroll = gl.getUniformLocation(program, "uScroll");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uColor = gl.getUniformLocation(program, "uColor");

    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    let scrollProgress = 0;
    let animId: number;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleScroll = () => {
      const rect = canvas!.getBoundingClientRect();
      const viewH = window.innerHeight;
      scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / viewH));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    function resize() {
      if (!canvas || !gl) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function render(now: number) {
      if (!canvas || !gl) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uScroll, scrollProgress);
      gl.uniform1f(uTime, now * 0.001);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform3f(uColor, r, g, b);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!prefersReduced) animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, [isVisible, color, isMobile]);

  return (
    <div className="w-full" style={{ height }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}
