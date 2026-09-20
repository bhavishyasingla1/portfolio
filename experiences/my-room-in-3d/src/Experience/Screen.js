import * as THREE from 'three'
import Experience from './Experience.js'

export default class Screen
{
    constructor(_mesh, _sourcePath)
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.mesh = _mesh
        this.sourcePath = _sourcePath

        this.setModel()
    }

    setModel()
    {
        this.model = {}

        // Video Element
        this.model.element = document.createElement('video')
        this.model.element.muted = true
        this.model.element.loop = true
        this.model.element.playsInline = true
        this.model.element.autoplay = true
        this.model.element.crossOrigin = 'anonymous'
        this.model.element.src = this.sourcePath
        this.model.element.play().catch(() => {})

        // Ensure playback starts upon first user interaction if browser initially blocked autoplay
        const resumePlayback = () =>
        {
            if (this.model.element && this.model.element.paused)
            {
                this.model.element.play().catch(() => {})
            }
        }
        window.addEventListener('pointerdown', resumePlayback, { once: true })
        window.addEventListener('keydown', resumePlayback, { once: true })

        // Three.js Video Texture
        this.model.texture = new THREE.VideoTexture(this.model.element)
        this.model.texture.encoding = THREE.sRGBEncoding
        this.model.texture.generateMipmaps = false
        this.model.texture.minFilter = THREE.LinearFilter
        this.model.texture.magFilter = THREE.LinearFilter

        // Material with tuned ambient brightness to blend with the warm baked room lighting
        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture,
            color: new THREE.Color(0.80, 0.78, 0.76)
        })

        // Mesh
        this.model.mesh = this.mesh
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)
    }

    update()
    {
    }

    destroy()
    {
        if (this.model.element)
        {
            this.model.element.pause()
            this.model.element.src = ''
        }
        if (this.model.texture)
        {
            this.model.texture.dispose()
        }
    }
}