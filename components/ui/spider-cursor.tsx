"use client"

import { useEffect, useRef } from "react"

export function SpiderCursor({ isDark = true }: { isDark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let w: number, h: number
    const ctx = canvas.getContext("2d")!
    const { sin, cos, PI, hypot, min, max } = Math

    function spawn() {
      const pts = many(333, () => ({
        x: rnd(window.innerWidth),
        y: rnd(window.innerHeight),
        len: 0,
        r: 0,
      }))

      const pts2 = many(9, (i) => ({
        x: cos((i / 9) * PI * 2),
        y: sin((i / 9) * PI * 2),
      }))

      const seed = rnd(100)
      let tx = rnd(window.innerWidth)
      let ty = rnd(window.innerHeight)
      let x = rnd(window.innerWidth)
      let y = rnd(window.innerHeight)
      const kx = rnd(0.5, 0.5)
      const ky = rnd(0.5, 0.5)
      const walkRadius = pt(rnd(50, 50), rnd(50, 50))
      const r = window.innerWidth / rnd(100, 150)

      function paintPt(p: { x: number; y: number; len: number; r: number }) {
        pts2.forEach((pt2) => {
          if (!p.len) return
          drawLine(
            lerp(x + pt2.x * r, p.x, p.len * p.len),
            lerp(y + pt2.y * r, p.y, p.len * p.len),
            x + pt2.x * r,
            y + pt2.y * r,
          )
        })
        drawCircle(p.x, p.y, p.r)
      }

      return {
        follow(fx: number, fy: number) {
          tx = fx
          ty = fy
        },
        tick(t: number) {
          const selfMoveX = cos(t * kx + seed) * walkRadius.x
          const selfMoveY = sin(t * ky + seed) * walkRadius.y
          const fx = tx + selfMoveX
          const fy = ty + selfMoveY
          x += min(window.innerWidth / 100, (fx - x) / 10)
          y += min(window.innerWidth / 100, (fy - y) / 10)

          let i = 0
          pts.forEach((p) => {
            const dx = p.x - x
            const dy = p.y - y
            const len = hypot(dx, dy)
            let r2 = min(2, window.innerWidth / len / 5)
            const increasing = len < window.innerWidth / 10 && i++ < 8
            const dir = increasing ? 0.1 : -0.1
            if (increasing) r2 *= 1.5
            p.r = r2
            p.len = max(0, min(p.len + dir, 1))
            paintPt(p)
          })
        },
      }
    }

    const spiders = many(2, spawn)

    const handlePointerMove = (e: PointerEvent) => {
      spiders.forEach((spider) => spider.follow(e.clientX, e.clientY))
    }

    let rafId: number
    function anim(t: number) {
      if (w !== window.innerWidth) w = canvas!.width = window.innerWidth
      if (h !== window.innerHeight) h = canvas!.height = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = ctx.strokeStyle = isDark ? "#fff" : "#000"
      t /= 1000
      spiders.forEach((spider) => spider.tick(t))
      rafId = requestAnimationFrame(anim)
    }

    function rnd(x = 1, dx = 0) {
      return Math.random() * x + dx
    }

    function drawCircle(x: number, y: number, r: number) {
      ctx.beginPath()
      ctx.ellipse(x, y, r, r, 0, 0, PI * 2)
      ctx.fill()
    }

    function drawLine(x0: number, y0: number, x1: number, y1: number) {
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      many(100, (i) => {
        i = (i + 1) / 100
        const x = lerp(x0, x1, i)
        const y = lerp(y0, y1, i)
        const k = noise(x / 5 + x0, y / 5 + y0) * 2
        ctx.lineTo(x + k, y + k)
      })
      ctx.stroke()
    }

    function many<T>(n: number, f: (i: number) => T): T[] {
      return [...Array(n)].map((_, i) => f(i))
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function noise(x: number, y: number, t = 101) {
      const w0 = sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * sin(0.4 * y + -1.3 * t + 1.0))
      const w1 = sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * sin(0.5 * x + -1.2 * t + 0.5))
      return w0 + w1
    }

    function pt(x: number, y: number) {
      return { x, y }
    }

    window.addEventListener("pointermove", handlePointerMove)
    rafId = requestAnimationFrame(anim)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(rafId)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ display: "block", zIndex: 1 }}
    />
  )
}
