import { vec3, quat2, mat4 } from 'gl-matrix'

import State from '@/State/State.js'

export default class CameraThirdPerson
{
    constructor(player)
    {
        this.state = State.getInstance()
        this.viewport = this.state.viewport
        this.controls = this.state.controls

        this.player = player

        this.active = false
        this.gameUp = vec3.fromValues(0, 1, 0)
        this.position = vec3.create()
        this.quaternion = quat2.create()
        this.distance = 15
        this.distanceLimits = { min: 6, max: 40 }
        this.touchDistance = 0
        this.phi = Math.PI * 0.45
        this.theta = - Math.PI * 0.25
        this.aboveOffset = 2
        this.phiLimits = { min: 0.1, max: Math.PI - 0.1 }

        window.addEventListener('wheel', (event) =>
        {
            this.distance += event.deltaY * 0.02
            this.distance = Math.min(Math.max(this.distance, this.distanceLimits.min), this.distanceLimits.max)
        }, { passive: true })

        window.addEventListener('touchstart', (event) =>
        {
            if (event.touches.length === 2)
            {
                this.touchDistance = Math.hypot(
                    event.touches[0].clientX - event.touches[1].clientX,
                    event.touches[0].clientY - event.touches[1].clientY
                )
            }
        }, { passive: true })

        window.addEventListener('touchmove', (event) =>
        {
            if (event.touches.length === 2 && this.touchDistance > 0)
            {
                const currentDistance = Math.hypot(
                    event.touches[0].clientX - event.touches[1].clientX,
                    event.touches[0].clientY - event.touches[1].clientY
                )
                const delta = (this.touchDistance - currentDistance) * 0.08
                this.distance += delta
                this.distance = Math.min(Math.max(this.distance, this.distanceLimits.min), this.distanceLimits.max)
                this.touchDistance = currentDistance
            }
        }, { passive: true })
    }

    activate()
    {
        this.active = true
    }

    deactivate()
    {
        this.active = false
    }

    update()
    {
        if(!this.active)
            return

        // Phi and theta
        if(this.controls.pointer.down || this.viewport.pointerLock.active)
        {
            const normalisedPointer = this.viewport.normalise(this.controls.pointer.delta)
            this.phi -= normalisedPointer.y * 2
            this.theta -= normalisedPointer.x * 2

            if(this.phi < this.phiLimits.min)
                this.phi = this.phiLimits.min
            if(this.phi > this.phiLimits.max)
                this.phi = this.phiLimits.max
        }
        
        // Position
        const sinPhiRadius = Math.sin(this.phi) * this.distance
        const sphericalPosition = vec3.fromValues(
            sinPhiRadius * Math.sin(this.theta),
            Math.cos(this.phi) * this.distance,
            sinPhiRadius * Math.cos(this.theta)
        )
        vec3.add(this.position, this.player.position.current, sphericalPosition)

        // Target
        const target = vec3.fromValues(
            this.player.position.current[0],
            this.player.position.current[1] + this.aboveOffset,
            this.player.position.current[2]
        )

        // Quaternion
        const toTargetMatrix = mat4.create()
        mat4.targetTo(toTargetMatrix, this.position, target, this.gameUp)
        quat2.fromMat4(this.quaternion, toTargetMatrix)
        
        // Clamp to ground
        const chunks = this.state.chunks
        const elevation = chunks.getElevationForPosition(this.position[0], this.position[2])

        if(elevation && this.position[1] < elevation + 1)
            this.position[1] = elevation + 1
    }
}