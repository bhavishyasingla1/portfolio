import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Game from '@/Game.js'
import View from '@/View/View.js'
import Debug from '@/Debug/Debug.js'
import State from '@/State/State.js'
import PlayerMaterial from './Materials/PlayerMaterial.js'
import PlayerSpeech from './PlayerSpeech.js'

export default class Player
{
    constructor()
    {
        this.game = Game.getInstance()
        this.state = State.getInstance()
        this.view = View.getInstance()
        this.debug = Debug.getInstance()

        this.scene = this.view.scene

        this.setGroup()
        this.setLights()
        this.setHelper()
        this.setModel()
        this.setSpeech()
        this.setDebug()
    }

    setSpeech()
    {
        this.speech = new PlayerSpeech(this)
    }

    setGroup()
    {
        this.group = new THREE.Group()
        this.scene.add(this.group)
    }

    setLights()
    {
        // High-ambient base so character is always visible
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
        this.scene.add(this.ambientLight)

        // Character-attached key light (follows the character)
        this.charKeyLight = new THREE.DirectionalLight(0xffffff, 1.8)
        this.charKeyLight.position.set(2, 4, -3)
        this.group.add(this.charKeyLight)

        // Soft back-fill light
        this.charFillLight = new THREE.DirectionalLight(0xbbe0ff, 0.9)
        this.charFillLight.position.set(-2, 3, 3)
        this.group.add(this.charFillLight)
    }
    
    setHelper()
    {
        this.helper = new THREE.Mesh()
        this.helper.material = new PlayerMaterial()
        this.helper.material.uniforms.uColor.value = new THREE.Color('#fff8d6')
        this.helper.material.uniforms.uSunPosition.value = new THREE.Vector3(- 0.5, - 0.5, - 0.5)

        this.helper.geometry = new THREE.CapsuleGeometry(0.5, 0.8, 3, 16)
        this.helper.geometry.translate(0, 0.9, 0)
        // Keep helper visible as fallback until the 3D model finishes loading
        this.helper.visible = true
        this.group.add(this.helper)
    }

    setModel()
    {
        this.loader = new GLTFLoader()
        this.actions = {}
        this.currentAction = null

        // Try candidate paths in order (handles standalone dev, embedded iframe, and root deployment)
        const candidateUrls = [
            './models/player.glb',
            'models/player.glb',
            '/world/models/player.glb',
            '/models/player.glb'
        ]

        const tryLoadNext = (urls) =>
        {
            if(urls.length === 0)
            {
                console.error('All player model candidate URLs failed. Keeping helper active.')
                return
            }

            const url = urls.shift()

            this.loader.load(
                url,
                (gltf) =>
                {
                    console.log('Player model successfully loaded from:', url)
                    this.setupModel(gltf)
                },
                undefined,
                (error) =>
                {
                    console.warn(`Failed loading model from "${url}", trying next candidate...`)
                    tryLoadNext(urls)
                }
            )
        }

        tryLoadNext(candidateUrls)
    }

    setupModel(gltf)
    {
        this.model = gltf.scene
        this.model.position.set(0, 0.95, 0)

        // Ensure materials have vertex colors enabled, no frustum culling, and correct shading
        this.model.traverse((child) =>
        {
            if(child.isMesh)
            {
                child.frustumCulled = false // Critical: prevent Three.js from hiding animated skinned mesh
                child.castShadow = true
                child.receiveShadow = true
                if(child.material)
                {
                    child.material.vertexColors = true
                    child.material.roughness = 0.5
                    child.material.metalness = 0.0
                    child.material.needsUpdate = true
                }
            }
        })

        this.group.add(this.model)

        // Hide fallback capsule now that 3D model is active
        if(this.helper)
            this.helper.visible = false

        // Setup Animation Mixer
        if(gltf.animations && gltf.animations.length > 0)
        {
            this.mixer = new THREE.AnimationMixer(this.model)

            for(const clip of gltf.animations)
            {
                const action = this.mixer.clipAction(clip)
                this.actions[clip.name] = action
            }

            // Start with Idle if available, otherwise Run
            if(this.actions.Idle)
            {
                this.actions.Idle.play()
                this.currentAction = this.actions.Idle
            }
            else if(this.actions.Run)
            {
                this.actions.Run.play()
                this.currentAction = this.actions.Run
            }
        }
    }

    setDebug()
    {
        if(!this.debug.active)
            return

        const playerFolder = this.debug.ui.getFolder('view/player')
        playerFolder.addColor(this.helper.material.uniforms.uColor, 'value')
    }

    update()
    {
        const playerState = this.state.player
        const sunState = this.state.sun
        const delta = this.state.time.delta

        // Update group position to follow player coordinates
        this.group.position.set(
            playerState.position.current[0],
            playerState.position.current[1],
            playerState.position.current[2]
        )
        
        // Helper rotation & sun uniform
        this.helper.rotation.y = playerState.rotation
        this.helper.material.uniforms.uSunPosition.value.set(sunState.position.x, sunState.position.y, sunState.position.z)

        // Sun light orientation
        if(this.sunLight && sunState)
        {
            this.sunLight.position.set(
                sunState.position.x * 50 + playerState.position.current[0],
                Math.max(20, sunState.position.y * 50),
                sunState.position.z * 50 + playerState.position.current[2]
            )
            this.sunLight.target = this.group
        }

        // Model orientation
        if(this.model)
        {
            this.model.rotation.y = playerState.rotation + Math.PI
        }

        // Animation state transition
        if(this.mixer)
        {
            this.mixer.update(delta)

            const isMoving = playerState.speed > 0.005

            if(isMoving && this.actions.Run)
            {
                if(this.currentAction !== this.actions.Run)
                {
                    this.actions.Run.reset().fadeIn(0.2).play()
                    if(this.currentAction)
                        this.currentAction.fadeOut(0.2)
                    this.currentAction = this.actions.Run
                }

                // Modulate run playback speed based on velocity
                const speedScale = Math.min(2.2, Math.max(0.8, (playerState.speed / Math.max(0.001, delta)) / 10.0))
                this.actions.Run.timeScale = speedScale
            }
            else if(!isMoving && this.actions.Idle)
            {
                if(this.currentAction !== this.actions.Idle)
                {
                    this.actions.Idle.reset().fadeIn(0.25).play()
                    if(this.currentAction)
                        this.currentAction.fadeOut(0.25)
                    this.currentAction = this.actions.Idle
                }
            }
        }

        // Update speech bubble position and state
        if(this.speech)
        {
            this.speech.update(delta)
        }
    }
}

