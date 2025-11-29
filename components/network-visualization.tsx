"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  type: "academic" | "ea" | "lesswrong"
}

export function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const nodes: Node[] = []
    const nodeCount = 40
    const rect = canvas.getBoundingClientRect()

    for (let i = 0; i < nodeCount; i++) {
      const types: Node["type"][] = ["academic", "ea", "lesswrong"]
      nodes.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 4 + 3,
        type: types[Math.floor(Math.random() * types.length)],
      })
    }

    const getColor = (type: Node["type"]) => {
      switch (type) {
        case "academic":
          return "rgba(100, 180, 200, 0.8)"
        case "ea":
          return "rgba(120, 200, 160, 0.8)"
        case "lesswrong":
          return "rgba(200, 160, 120, 0.8)"
      }
    }

    const animate = () => {
      const currentRect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, currentRect.width, currentRect.height)

      // Draw connections
      ctx.strokeStyle = "rgba(100, 180, 200, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > currentRect.width) node.vx *= -1
        if (node.y < 0 || node.y > currentRect.height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = getColor(node.type)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-2xl" />
}
