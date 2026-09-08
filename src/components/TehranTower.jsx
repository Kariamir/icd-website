import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WING_W = 2.0
const WING_H = 16
const WING_D = 5.5
const HALF_D = WING_D / 2

// 3 wings at 120° intervals — one pointing into scene, two flanking the viewer
const WING_ANGLES = [
  (3 * Math.PI) / 2,  // 270° — pointing away (-z)
  Math.PI / 6,         // 30°  — front-right
  (5 * Math.PI) / 6,  // 150° — front-left
]

function createWindowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0e1a28'
  ctx.fillRect(0, 0, 128, 512)

  const cols = 6
  const rows = 56
  const cw = 128 / cols
  const ch = 512 / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = r * cols + c
      const lit = (n * 7 + r * 3 + c * 11) % 10 > 2
      if (lit) {
        const b = 0.28 + ((n * 13) % 20) * 0.016
        ctx.fillStyle = `rgba(170, 205, 235, ${b})`
        ctx.fillRect(c * cw + 1.5, r * ch + 1.5, cw - 3, ch - 3)
      }
    }
  }

  return new THREE.CanvasTexture(canvas)
}

export function TehranTower() {
  const groupRef = useRef()

  const windowTex = useMemo(() => createWindowTexture(), [])

  const facadeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#162535',
        map: windowTex,
        metalness: 0.45,
        roughness: 0.55,
      }),
    [windowTex]
  )

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#B08D57',
        metalness: 0.88,
        roughness: 0.22,
        envMapIntensity: 1.2,
      }),
    []
  )

  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#111e2c',
        metalness: 0.3,
        roughness: 0.6,
      }),
    []
  )

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })

  const bandPositions = useMemo(
    () => Array.from({ length: 7 }, (_, i) => -WING_H / 2 + (i + 1) * (WING_H / 8)),
    []
  )

  return (
    <group ref={groupRef} position={[0, -WING_H / 2, 0]}>
      {/* Three wings */}
      {WING_ANGLES.map((theta, i) => {
        const x = Math.cos(theta) * HALF_D
        const z = Math.sin(theta) * HALF_D
        const ry = Math.PI / 2 - theta
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, ry, 0]} material={facadeMat}>
            <boxGeometry args={[WING_W, WING_H, WING_D]} />
          </mesh>
        )
      })}

      {/* Triangular center core */}
      <mesh material={coreMat}>
        <cylinderGeometry args={[1.1, 1.3, WING_H, 3]} />
      </mesh>

      {/* Gold horizontal setback bands */}
      {bandPositions.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} material={goldMat}>
          <cylinderGeometry args={[3.8, 3.8, 0.07, 3]} />
        </mesh>
      ))}

      {/* Crown cap */}
      <mesh position={[0, WING_H / 2, 0]} material={goldMat}>
        <cylinderGeometry args={[0.8, 2.2, 0.35, 3]} />
      </mesh>

      {/* Spire */}
      <mesh position={[0, WING_H / 2 + 1.4, 0]} material={goldMat}>
        <cylinderGeometry args={[0.02, 0.18, 2.8, 8]} />
      </mesh>

      {/* Ground base plate */}
      <mesh position={[0, -WING_H / 2, 0]} material={goldMat}>
        <cylinderGeometry args={[4.5, 4.5, 0.12, 3]} />
      </mesh>
    </group>
  )
}
