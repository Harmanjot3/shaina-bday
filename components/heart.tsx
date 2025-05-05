"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"
import { PerspectiveCamera, Environment } from "@react-three/drei"
import { MathUtils } from "three"
import * as THREE from "three"

function HeartMesh() {
  const meshRef = useRef<any>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.z = MathUtils.lerp(
        meshRef.current.rotation.z,
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1,
        0.1,
      )
    }
  })

  // Heart shape function
  function createHeartShape() {
    const x = 0,
      y = 0
    const shape = new THREE.Shape()

    shape.moveTo(x + 0, y + 0.5)
    shape.bezierCurveTo(x + 0, y + 0.8, x - 0.3, y + 1, x - 0.6, y + 1)
    shape.bezierCurveTo(x - 1, y + 1, x - 1, y + 0.6, x - 1, y + 0.3)
    shape.bezierCurveTo(x - 1, y - 0.1, x - 0.5, y - 0.5, x + 0, y - 1)
    shape.bezierCurveTo(x + 0.5, y - 0.5, x + 1, y - 0.1, x + 1, y + 0.3)
    shape.bezierCurveTo(x + 1, y + 0.6, x + 1, y + 1, x + 0.6, y + 1)
    shape.bezierCurveTo(x + 0.3, y + 1, x + 0, y + 0.8, x + 0, y + 0.5)

    return shape
  }

  return (
    <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]} position={[0, 0, 0]}>
      <extrudeGeometry
        args={[
          createHeartShape(),
          { depth: 0.4, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.1, bevelThickness: 0.1 },
        ]}
      />
      <meshStandardMaterial
        color="#ff5c8f"
        roughness={0.3}
        metalness={0.5}
        emissive="#ff2c6a"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export function Heart() {
  return (
    <div className="w-full aspect-square max-w-md mx-auto">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, 10]} angle={0.3} intensity={1} />
        <HeartMesh />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
