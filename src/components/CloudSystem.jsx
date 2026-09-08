import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'

const CLOUD_Y = 10

const cloudMat = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  roughness: 1,
  metalness: 0,
  transparent: true,
  opacity: 0.92,
  depthWrite: false,
})

const LEFT_PUFFS = [
  { pos: [-1.5, 0.2, 0.5], s: [3.8, 2.0, 2.8] },
  { pos: [-4.0, -0.4, -1.0], s: [3.0, 1.7, 2.2] },
  { pos: [-2.5, 1.3, -1.5], s: [2.4, 1.4, 2.0] },
  { pos: [-6.0, 0.3, 0.8], s: [2.8, 1.6, 2.2] },
  { pos: [-0.8, -0.8, 1.8], s: [2.0, 1.2, 1.8] },
  { pos: [-4.8, 1.0, 1.5], s: [2.2, 1.3, 1.8] },
]

const RIGHT_PUFFS = [
  { pos: [1.5, 0.2, 0.5], s: [3.8, 2.0, 2.8] },
  { pos: [4.0, -0.4, -1.0], s: [3.0, 1.7, 2.2] },
  { pos: [2.5, 1.3, -1.5], s: [2.4, 1.4, 2.0] },
  { pos: [6.0, 0.3, 0.8], s: [2.8, 1.6, 2.2] },
  { pos: [0.8, -0.8, 1.8], s: [2.0, 1.2, 1.8] },
  { pos: [4.8, 1.0, 1.5], s: [2.2, 1.3, 1.8] },
]

function CloudGroup({ puffs, groupRef }) {
  return (
    <group ref={groupRef}>
      {puffs.map(({ pos, s }, i) => (
        <mesh key={i} position={pos} scale={s} material={cloudMat}>
          <sphereGeometry args={[1, 9, 7]} />
        </mesh>
      ))}
    </group>
  )
}

export function CloudSystem() {
  const leftRef = useRef()
  const rightRef = useRef()

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return

    // Both groups start centered over the tower, then part to each side to reveal it
    leftRef.current.position.set(0, CLOUD_Y, 0)
    rightRef.current.position.set(0, CLOUD_Y, 0)

    const tl = gsap.timeline({ delay: 0.5 })
    tl.to(leftRef.current.position, { x: -10, duration: 4.0, ease: 'power2.inOut' }, 0)
      .to(rightRef.current.position, { x: 10, duration: 4.0, ease: 'power2.inOut' }, 0)

    return () => tl.kill()
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (leftRef.current) {
      leftRef.current.position.y = CLOUD_Y + Math.sin(t * 0.25) * 0.25
    }
    if (rightRef.current) {
      rightRef.current.position.y = CLOUD_Y + Math.sin(t * 0.25 + 1.2) * 0.25
    }
  })

  return (
    <>
      <CloudGroup puffs={LEFT_PUFFS} groupRef={leftRef} />
      <CloudGroup puffs={RIGHT_PUFFS} groupRef={rightRef} />
    </>
  )
}
