import React, { useEffect, useRef, useState } from 'react'

interface MatrixProps {
  width?: number
  height?: number
  children?: React.ReactNode
}

const Matrix: React.FC<MatrixProps> = (props) => {
  const [dimensions, setDimensions] = useState({
    width: props.width || 0,
    height: props.height || 0
  })

  useEffect(() => {
    // Set default dimensions after the component mounts (and thus is in a browser context)
    if (!props.width || !props.height) {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }, [props.width, props.height])

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ!@$#@1234567890ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ・."=*+-<>'.repeat(6).split('')
  const fontSize = 10

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const columns = Math.floor(dimensions.width / fontSize)
    const drops: number[] = Array.from({ length: columns }, () => Math.floor((Math.random() * dimensions.height) / fontSize))

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, .1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)]
        ctx.fillStyle = '#0f0'
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        drops[i]++
        if (drops[i] * fontSize > dimensions.height && Math.random() > 0.95) {
          drops[i] = 0
        }
      }
    }

    const interval = setInterval(draw, 33)
    return () => clearInterval(interval)
  }, [dimensions])

  return (
    <div style={{ position: 'relative', width: dimensions.width, height: dimensions.height }}>
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
      <div style={{ position: 'absolute', top: '0%', left: '25%' }}>{props.children}</div>
    </div>
  )
}

export default Matrix
