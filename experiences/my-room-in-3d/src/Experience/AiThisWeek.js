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
        this.pointerDownPos = { x: 0, y: 0 }
        this.touchStartPos = { x: 0, y: 0 }

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

        // Enlarge hit target with an invisible collider plane
        const hitGeometry = new THREE.PlaneGeometry(1.6, 1.4)
        hitGeometry.rotateY(- Math.PI * 0.5)
        const hitMaterial = new THREE.MeshBasicMaterial({
            visible: false,
            side: THREE.DoubleSide
        })
        this.model.hitMesh = new THREE.Mesh(hitGeometry, hitMaterial)
        this.model.group.add(this.model.hitMesh)

        this.interactiveObjects = [this.model.mesh, this.model.hitMesh]
    }

    setRaycaster()
    {
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2(-999, -999)

        this.onPointerDown = (_event) =>
        {
            this.pointerDownPos.x = _event.clientX
            this.pointerDownPos.y = _event.clientY
        }

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

        this.onClick = (_event) =>
        {
            if (_event)
            {
                const dist = Math.hypot(_event.clientX - this.pointerDownPos.x, _event.clientY - this.pointerDownPos.y)
                if (dist > 8) return

                const rect = this.targetElement.getBoundingClientRect()
                this.mouse.x = ((_event.clientX - rect.left) / rect.width) * 2 - 1
                this.mouse.y = - ((_event.clientY - rect.top) / rect.height) * 2 + 1
            }

            if (!this.model.mesh) return
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)
            const intersects = this.raycaster.intersectObjects(this.interactiveObjects)
            if (intersects.length > 0)
            {
                this.openNewsletter()
            }
        }

        this.onTouchStart = (_event) =>
        {
            if (_event.touches.length === 1)
            {
                this.touchStartPos.x = _event.touches[0].clientX
                this.touchStartPos.y = _event.touches[0].clientY
                this.cursorX = _event.touches[0].clientX
                this.cursorY = _event.touches[0].clientY

                const rect = this.targetElement.getBoundingClientRect()
                this.mouse.x = ((_event.touches[0].clientX - rect.left) / rect.width) * 2 - 1
                this.mouse.y = - ((_event.touches[0].clientY - rect.top) / rect.height) * 2 + 1
            }
        }

        this.onTouchEnd = (_event) =>
        {
            if (_event.changedTouches.length > 0)
            {
                const touch = _event.changedTouches[0]
                const dist = Math.hypot(touch.clientX - this.touchStartPos.x, touch.clientY - this.touchStartPos.y)

                if (dist < 10)
                {
                    const rect = this.targetElement.getBoundingClientRect()
                    this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
                    this.mouse.y = - ((touch.clientY - rect.top) / rect.height) * 2 + 1
                    this.cursorX = touch.clientX
                    this.cursorY = touch.clientY

                    this.raycaster.setFromCamera(this.mouse, this.camera.instance)
                    const intersects = this.raycaster.intersectObjects(this.interactiveObjects)

                    if (intersects.length > 0)
                    {
                        if (!this.isHovered)
                        {
                            this.setHoverState(true, true)
                        }
                        else
                        {
                            this.openNewsletter()
                        }
                    }
                    else if (this.isHovered)
                    {
                        this.setHoverState(false)
                    }
                }
            }
        }

        window.addEventListener('pointerdown', this.onPointerDown, { passive: true })
        window.addEventListener('pointermove', this.onPointerMove, { passive: true })
        window.addEventListener('click', this.onClick)
        window.addEventListener('touchstart', this.onTouchStart, { passive: true })
        window.addEventListener('touchend', this.onTouchEnd)
    }

    checkIntersection()
    {
        if (!this.model.mesh) return

        this.raycaster.setFromCamera(this.mouse, this.camera.instance)
        const intersects = this.raycaster.intersectObjects(this.interactiveObjects)
        const hovered = intersects.length > 0

        if (hovered && !this.isHovered)
        {
            this.setHoverState(true, false)
        }
        else if (!hovered && this.isHovered)
        {
            this.setHoverState(false)
        }
    }

    setHoverState(hovered, isTouch = false)
    {
        if (hovered && !this.isHovered)
        {
            this.isHovered = true
            this.targetElement.style.cursor = 'pointer'

            gsap.to(this.model.mesh.scale, {
                x: 1.14,
                y: 1.14,
                z: 1.14,
                duration: 0.35,
                ease: 'back.out(1.7)'
            })

            if (this.model.material && this.model.material.color)
            {
                gsap.to(this.model.material.color, {
                    r: 1.25,
                    g: 1.25,
                    b: 1.25,
                    duration: 0.3
                })
            }

            if (this.tooltip)
            {
                this.tooltip.textContent = isTouch
                    ? 'AI This Week ↗ (Tap to open)'
                    : 'AI This Week ↗ (Click to open)'
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
        this.tooltip.textContent = 'AI This Week ↗ (Click to open)'
        this.tooltip.addEventListener('click', (e) => {
            e.stopPropagation()
            this.openNewsletter()
        })
        document.body.appendChild(this.tooltip)

        const style = document.createElement('style')
        style.textContent = `
            .tv-newsletter-tooltip {
                position: fixed;
                top: 0;
                left: 0;
                color: #ffffff;
                background: rgba(0, 0, 0, 0.82);
                border: 1px solid rgba(0, 255, 102, 0.5);
                padding: 6px 12px;
                border-radius: 4px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 11.5px;
                font-weight: 600;
                letter-spacing: 0.04em;
                opacity: 0;
                pointer-events: auto;
                cursor: pointer;
                transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.1s ease-out;
                z-index: 9999;
                backdrop-filter: blur(8px);
                white-space: nowrap;
                will-change: transform;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 255, 102, 0.25);
            }
            .tv-newsletter-tooltip:hover {
                background: rgba(0, 255, 102, 0.95);
                color: #000000;
                border-color: #00ff66;
                box-shadow: 0 0 20px rgba(0, 255, 102, 0.6);
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
        const padding = 18
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
        window.removeEventListener('pointerdown', this.onPointerDown)
        window.removeEventListener('pointermove', this.onPointerMove)
        window.removeEventListener('click', this.onClick)
        window.removeEventListener('touchstart', this.onTouchStart)
        window.removeEventListener('touchend', this.onTouchEnd)
        if (this.tooltip && this.tooltip.parentNode)
        {
            this.tooltip.parentNode.removeChild(this.tooltip)
        }
    }
}
