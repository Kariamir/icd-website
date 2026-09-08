import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TehranTower } from './TehranTower'
import { CloudSystem } from './CloudSystem'

gsap.registerPlugin(ScrollTrigger)

// Camera start/end positions for scroll zoom
const CAM_START = new THREE.Vector3(0, 2.5, 22)
const CAM_END = new THREE.Vector3(2.0, 6.5, 6.5)
const LOOK_START = new THREE.Vector3(0, 2, 0)
const LOOK_END = new THREE.Vector3(0, 5, 0)

function CameraController() {
  const { camera } = useThree()
  const progressRef = useRef(0)
  const targetPos = useRef(CAM_START.clone())
  const lookTarget = useRef(LOOK_START.clone())

  useEffect(() => {
    camera.position.copy(CAM_START)

    const trigger = ScrollTrigger.create({
      trigger: '#hero-scroll',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.8,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
    })
    return () => trigger.kill()
  }, [camera])

  useFrame((_, delta) => {
    const t = progressRef.current
    const lerpSpeed = 1 - Math.pow(0.015, delta)

    targetPos.current.set(
      THREE.MathUtils.lerp(CAM_START.x, CAM_END.x, t),
      THREE.MathUtils.lerp(CAM_START.y, CAM_END.y, t),
      THREE.MathUtils.lerp(CAM_START.z, CAM_END.z, t)
    )
    lookTarget.current.set(
      THREE.MathUtils.lerp(LOOK_START.x, LOOK_END.x, t),
      THREE.MathUtils.lerp(LOOK_START.y, LOOK_END.y, t),
      THREE.MathUtils.lerp(LOOK_START.z, LOOK_END.z, t)
    )

    camera.position.lerp(targetPos.current, lerpSpeed)
    camera.lookAt(lookTarget.current)
  })

  return null
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#f0ece4" />
      <directionalLight position={[-6, 14, 8]} intensity={1.4} color="#cddaeb" />
      <directionalLight position={[8, 4, 12]} intensity={0.5} color="#e8dcc8" />
      <pointLight position={[4, -6, 6]} intensity={1.2} color="#B08D57" distance={30} />
      <hemisphereLight color="#c8d8ea" groundColor="#d4c4a0" intensity={0.35} />
    </>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 22], fov: 45, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.1
        scene.background = new THREE.Color('#F6F5F1')
      }}
    >
      <fog attach="fog" args={['#F6F5F1', 35, 90]} />
      <Suspense fallback={null}>
        <SceneLights />
        <TehranTower />
        <CloudSystem />
        <CameraController />
      </Suspense>
    </Canvas>
  )
}
