import * as THREE from 'three'
import Experience from './Experience.js'

export default class LaptopSlideshow
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.imageUrls = [
            './assets/memories/IMG-20230806-WA0019.jpg',
            './assets/memories/IMG-20231127-WA0006.jpg',
            './assets/memories/IMG-20240404-WA0029.jpg',
            './assets/memories/IMG-20240914-WA0034.jpg',
            './assets/memories/IMG-20241110-WA0005.jpg',
            './assets/memories/IMG-20241118-WA0019.jpg',
            './assets/memories/IMG-20250117-WA0015.jpg',
            './assets/memories/IMG-20250213-WA0003.jpg',
            './assets/memories/IMG-20250221-WA0003.jpg',
            './assets/memories/IMG-20250404-WA0104.jpg',
            './assets/memories/IMG-20250415-WA0025.jpg',
            './assets/memories/IMG-20250419-WA0025.jpg',
            './assets/memories/IMG-20250422-WA0072.jpg',
            './assets/memories/IMG-20250424-WA0246.jpg',
            './assets/memories/IMG-20251129-WA0015.jpg',
            './assets/memories/IMG20260423151710.jpg',
            './assets/memories/IMG20260907213930.jpg',
            './assets/memories/IMG_20240130_091909_599.jpg',
            './assets/memories/IMG_20250614_170504_595.jpg',
            './assets/memories/IMG_20250910_182153_1.jpg',
            './assets/memories/IMG_20250913_002424_819.jpg',
            './assets/memories/IMG_20250913_002502_550.jpg'
        ]

        this.images = []
        this.currentIndex = 0
        this.nextIndex = 1
        this.fadeProgress = 1 // 1 = fully on current image
        this.isFading = false
        this.slideInterval = 1800 // 1.8 seconds per slide
        this.fadeDuration = 350 // 350ms smooth cross-fade
        this.lastSwitchTime = Date.now()
        this.fadeStartTime = 0

        this.setCanvas()
        this.setModel()
        this.preloadImages()
    }

    setCanvas()
    {
        this.canvas = document.createElement('canvas')
        // MacBook display 16:10 aspect ratio
        this.canvas.width = 1024
        this.canvas.height = 640
        this.ctx = this.canvas.getContext('2d')

        // Initial dark sleek display background
        this.ctx.fillStyle = '#0a0a0c'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.texture = new THREE.CanvasTexture(this.canvas)
        this.texture.encoding = THREE.sRGBEncoding
        this.texture.generateMipmaps = false
        this.texture.minFilter = THREE.LinearFilter
        this.texture.magFilter = THREE.LinearFilter
    }

    setModel()
    {
        if (!this.resources.items.macScreenModel) return

        this.mesh = this.resources.items.macScreenModel.scene.children[0]
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture
        })
        this.mesh.material = this.material
        this.scene.add(this.mesh)
    }

    preloadImages()
    {
        let loadedCount = 0

        this.imageUrls.forEach((url, i) =>
        {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.src = url
            img.onload = () =>
            {
                loadedCount++
                if (i === 0)
                {
                    this.renderCurrent()
                }
            }
            this.images.push(img)
        })
    }

    drawCover(img, alpha = 1)
    {
        if (!img || !img.complete || img.naturalWidth === 0) return

        const w = this.canvas.width
        const h = this.canvas.height
        // Object-fit: cover algorithm ensures complete full-screen coverage
        const hRatio = w / img.naturalWidth
        const vRatio = h / img.naturalHeight
        const ratio = Math.max(hRatio, vRatio)

        const nw = img.naturalWidth * ratio
        const nh = img.naturalHeight * ratio
        const x = (w - nw) * 0.5
        const y = (h - nh) * 0.5

        this.ctx.globalAlpha = alpha
        this.ctx.drawImage(img, x, y, nw, nh)
    }

    renderCurrent()
    {
        const currentImg = this.images[this.currentIndex]
        if (!currentImg || !currentImg.complete) return

        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = '#000000'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.drawCover(currentImg, 1)
        this.texture.needsUpdate = true
    }

    update()
    {
        const now = Date.now()

        if (!this.isFading)
        {
            if (now - this.lastSwitchTime >= this.slideInterval)
            {
                this.isFading = true
                this.fadeStartTime = now
                this.nextIndex = (this.currentIndex + 1) % this.images.length
            }
        }
        else
        {
            const elapsed = now - this.fadeStartTime
            const progress = Math.min(elapsed / this.fadeDuration, 1)

            const currentImg = this.images[this.currentIndex]
            const nextImg = this.images[this.nextIndex]

            if (currentImg && currentImg.complete && nextImg && nextImg.complete)
            {
                this.ctx.globalAlpha = 1
                this.ctx.fillStyle = '#000000'
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

                // Draw base image
                this.drawCover(currentImg, 1)
                // Crossfade next image on top
                this.drawCover(nextImg, progress)

                this.texture.needsUpdate = true
            }

            if (progress >= 1)
            {
                this.isFading = false
                this.currentIndex = this.nextIndex
                this.lastSwitchTime = now
            }
        }
    }

    destroy()
    {
        if (this.texture)
        {
            this.texture.dispose()
        }
    }
}
