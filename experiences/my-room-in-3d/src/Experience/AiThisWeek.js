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
            if (!this.model.mesh) return
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)
            const intersects = this.raycaster.intersectObject(this.model.mesh)
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
        if (!this.model.mesh) return

        this.raycaster.setFromCamera(this.mouse, this.camera.instance)
        const intersects = this.raycaster.intersectObject(this.model.mesh)
        const hovered = intersects.length > 0

        if (hovered && !this.isHovered)
        {
            this.isHovered = true
            this.targetElement.style.cursor = 'pointer'

            gsap.to(this.model.mesh.scale, {
                x: 1.06,
                y: 1.06,
                z: 1.06,
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

            this.showTooltip()
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
        this.tooltip.textContent = '(newsletter: click to open)'
        document.body.appendChild(this.tooltip)

        const style = document.createElement('style')
        style.textContent = `
            .tv-newsletter-tooltip {
                position: fixed;
                top: 0;
                left: 0;
                color: #ffffff;
                background: rgba(0, 0, 0, 0.65);
                padding: 4px 10px;
                border-radius: 4px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 11px;
                font-weight: 500;
                letter-spacing: 0.04em;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.15s ease;
                z-index: 9999;
                backdrop-filter: blur(4px);
                white-space: nowrap;
                will-change: transform;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
            }
            .tv-newsletter-tooltip.is-visible {
                opacity: 1;
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
