import * as THREE from 'three'
import { gsap } from 'gsap'
import Experience from './Experience.js'

export default class AiThisWeek
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.targetElement = this.experience.targetElement

        this.newsletterUrl = 'https://www.linkedin.com/newsletters/ai-this-week-7353859555715436544/'
        this.isHovered = false
        this.cursorX = 0
        this.cursorY = 0

        this.setModel()
        this.setRaycaster()
        this.setTooltip()
    }

    setModel()
    {
        this.model = {}

        this.model.group = new THREE.Group()
        // TV screen plane position on wall
        this.model.group.position.x = 4.19
        this.model.group.position.y = 2.717
        this.model.group.position.z = 1.630
        this.scene.add(this.model.group)

        // Texture
        this.model.texture = this.resources.items.aiThisWeekTexture
        if (this.model.texture)
        {
            this.model.texture.encoding = THREE.sRGBEncoding
            this.model.texture.generateMipmaps = true
            this.model.texture.minFilter = THREE.LinearMipmapLinearFilter
        }

        // Geometry: square artwork card on TV (proportional to TV bezels)
        this.model.geometry = new THREE.PlaneGeometry(0.95, 0.95)
        this.model.geometry.rotateY(- Math.PI * 0.5)

        // Material with tuned ambient brightness
        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture,
            color: new THREE.Color(0.85, 0.85, 0.85),
            transparent: true,
            side: THREE.DoubleSide
        })

        this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material)
        this.model.group.add(this.model.mesh)

        // 3D text label directly below the artwork on the TV screen
        const labelCanvas = document.createElement('canvas')
        labelCanvas.width = 512
        labelCanvas.height = 128
        const lctx = labelCanvas.getContext('2d')
        lctx.fillStyle = '#ffffff'
        lctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        lctx.textAlign = 'center'
        lctx.textBaseline = 'middle'
        lctx.fillText('AI THIS WEEK ↗', 256, 64)

        const labelTexture = new THREE.CanvasTexture(labelCanvas)
        labelTexture.encoding = THREE.sRGBEncoding
        const labelGeo = new THREE.PlaneGeometry(0.85, 0.22)
        labelGeo.rotateY(- Math.PI * 0.5)
        const labelMat = new THREE.MeshBasicMaterial({
            map: labelTexture,
            transparent: true,
            color: new THREE.Color(0.85, 0.85, 0.85),
            side: THREE.DoubleSide
        })
        this.model.labelMesh = new THREE.Mesh(labelGeo, labelMat)
        this.model.labelMesh.position.y = - 0.58
        this.model.group.add(this.model.labelMesh)
    }

    setRaycaster()
    {
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2(-999, -999)

        this.onPointerMove = (_event) =>
        {
            this.cursorX = _event.clientX
            this.cursorY = _event.clientY

            const rect = this.targetElement.getBoundingClientRect()
            this.mouse.x = ((_event.clientX - rect.left) / rect.width) * 2 - 1
            this.mouse.y = - ((_event.clientY - rect.top) / rect.height) * 2 + 1

            if (this.tooltip && this.isHovered)
            {
                this.updateTooltipPosition()
            }

            this.checkIntersection()
        }

        this.onClick = () =>
        {
            const interactables = [this.model.mesh, this.model.labelMesh].filter(Boolean)
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)
            const intersects = this.raycaster.intersectObjects(interactables)
            if (intersects.length > 0)
            {
                // ONLY open after user clicks!
                this.openNewsletter()
            }
        }

        window.addEventListener('pointermove', this.onPointerMove, { passive: true })
        window.addEventListener('click', this.onClick)
    }

    checkIntersection()
    {
        const interactables = [this.model.mesh, this.model.labelMesh].filter(Boolean)
        if (interactables.length === 0) return

        this.raycaster.setFromCamera(this.mouse, this.camera.instance)
        const intersects = this.raycaster.intersectObjects(interactables)
        const hovered = intersects.length > 0

        if (hovered && !this.isHovered)
        {
            this.isHovered = true
            this.targetElement.style.cursor = 'pointer'

            gsap.to(this.model.mesh.scale, {
                x: 1.08,
                y: 1.08,
                z: 1.08,
                duration: 0.3,
                ease: 'power2.out'
            })

            if (this.model.material && this.model.material.color)
            {
                gsap.to(this.model.material.color, {
                    r: 1.0,
                    g: 1.0,
                    b: 1.0,
                    duration: 0.3
                })
            }

            if (this.model.labelMesh && this.model.labelMesh.material && this.model.labelMesh.material.color)
            {
                gsap.to(this.model.labelMesh.material.color, {
                    r: 1.0,
                    g: 1.0,
                    b: 1.0,
                    duration: 0.3
                })
            }

            this.showTooltip()
            // NOTE: Do NOT open link on hover! Only open when clicked.
        }
        else if (!hovered && this.isHovered)
        {
            this.isHovered = false
            this.targetElement.style.cursor = 'default'

            gsap.to(this.model.mesh.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: 'power2.out'
            })

            if (this.model.material && this.model.material.color)
            {
                gsap.to(this.model.material.color, {
                    r: 0.85,
                    g: 0.85,
                    b: 0.85,
                    duration: 0.3
                })
            }

            if (this.model.labelMesh && this.model.labelMesh.material && this.model.labelMesh.material.color)
            {
                gsap.to(this.model.labelMesh.material.color, {
                    r: 0.85,
                    g: 0.85,
                    b: 0.85,
                    duration: 0.3
                })
            }

            this.hideTooltip()
        }
    }

    openNewsletter()
    {
        try
        {
            window.open(this.newsletterUrl, '_blank', 'noopener,noreferrer')
        }
        catch (err)
        {
            console.warn('Could not open newsletter link:', err)
        }
    }

    setTooltip()
    {
        this.tooltip = document.createElement('div')
        this.tooltip.className = 'tv-newsletter-tooltip'
        this.tooltip.innerHTML = `
            <span class="tooltip-badge">NEWSLETTER</span>
            <span class="tooltip-title">AI THIS WEEK &nearr;</span>
            <span class="tooltip-sub">(Click to open)</span>
        `
        document.body.appendChild(this.tooltip)

        const style = document.createElement('style')
        style.textContent = `
            .tv-newsletter-tooltip {
                position: fixed;
                top: 0;
                left: 0;
                background: rgba(10, 10, 14, 0.94);
                border: 1px solid rgba(255, 30, 66, 0.7);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(255, 30, 66, 0.35);
                color: #ffffff;
                padding: 6px 12px;
                border-radius: 4px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 11px;
                letter-spacing: 0.08em;
                display: flex;
                align-items: center;
                gap: 8px;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.15s ease;
                z-index: 9999;
                backdrop-filter: blur(8px);
                white-space: nowrap;
                will-change: transform;
            }
            .tv-newsletter-tooltip.is-visible {
                opacity: 1;
            }
            .tooltip-badge {
                background: #ff1e42;
                color: #000;
                font-size: 9px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 2px;
                letter-spacing: 0.12em;
            }
            .tooltip-title {
                font-weight: 700;
                color: #fff;
            }
            .tooltip-sub {
                font-size: 10px;
                color: rgba(255, 255, 255, 0.65);
                font-weight: 400;
            }
        `
        document.head.appendChild(style)
    }

    updateTooltipPosition()
    {
        if (!this.tooltip) return
        const padding = 16
        let x = this.cursorX + padding
        let y = this.cursorY + padding
        if (x + 220 > window.innerWidth)
        {
            x = this.cursorX - 220
        }
        if (y + 40 > window.innerHeight)
        {
            y = this.cursorY - 40
        }
        this.tooltip.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    showTooltip()
    {
        if (this.tooltip)
        {
            this.updateTooltipPosition()
            this.tooltip.classList.add('is-visible')
        }
    }

    hideTooltip()
    {
        if (this.tooltip)
        {
            this.tooltip.classList.remove('is-visible')
        }
    }

    update()
    {
        if (!this.model.mesh) return

        // Gentle floating hover motion across TV surface
        const time = this.time.elapsed * 0.001
        this.model.mesh.position.y = Math.sin(time * 1.4) * 0.04
        this.model.mesh.position.z = Math.cos(time * 1.1) * 0.05
    }

    destroy()
    {
        window.removeEventListener('pointermove', this.onPointerMove)
        window.removeEventListener('click', this.onClick)
        if (this.tooltip && this.tooltip.parentNode)
        {
            this.tooltip.parentNode.removeChild(this.tooltip)
        }
    }
}
