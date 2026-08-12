"use client";

import { useEffect, useRef } from "react";

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vsSource = `
      attribute vec4 aVertexPosition;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = aVertexPosition;
        v_texCoord = (aVertexPosition.xy + 1.0) * 0.5;
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        vec3 baseColor = vec3(0.043, 0.078, 0.063);
        
        float n = snoise(uv * 2.0 + u_time * 0.05);
        float n2 = snoise(uv * 1.0 - u_time * 0.02);
        
        float dist = length(uv - mouse);
        float mouseGlow = smoothstep(0.8, 0.0, dist) * 0.15;
        
        float flow = smoothstep(0.4, 0.6, n + n2 * 0.5);
        vec3 accentColor = vec3(0.722, 1.0, 0.235);
        
        vec3 color = baseColor;
        color += accentColor * flow * 0.08;
        color += accentColor * mouseGlow;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(shaderProgram));
      return;
    }
    gl.useProgram(shaderProgram);

    const positions = new Float32Array([
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    const uTimeInfo = gl.getUniformLocation(shaderProgram, "u_time");
    const uResInfo = gl.getUniformLocation(shaderProgram, "u_resolution");
    const uMouseInfo = gl.getUniformLocation(shaderProgram, "u_mouse");

    let mouseX = 0;
    let mouseY = 0;
    let isRunning = true;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = window.innerHeight - e.clientY;
    };
    if (!prefersReduced) document.addEventListener("mousemove", handleMouseMove);

    function resizeCanvas() {
      if (!canvas || !gl) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function render(now: number) {
      if (!canvas || !gl || !isRunning) return;
      now *= 0.001;
      gl.uniform1f(uTimeInfo, now);
      gl.uniform2f(uResInfo, canvas.width, canvas.height);
      gl.uniform2f(uMouseInfo, mouseX, mouseY);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!prefersReduced) animationRef.current = requestAnimationFrame(render);
    }
    animationRef.current = requestAnimationFrame(render);

    // IntersectionObserver to pause/resume (no context destruction)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (prefersReduced) return;
        if (entry.isIntersecting && !isRunning) {
          isRunning = true;
          animationRef.current = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && isRunning) {
          isRunning = false;
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas.parentElement || canvas);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (gl) {
        gl.deleteProgram(shaderProgram);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-2] pointer-events-none opacity-40 w-full h-full"
      aria-hidden="true"
    />
  );
}
