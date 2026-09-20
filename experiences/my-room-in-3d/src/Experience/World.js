import * as THREE from 'three'
import Experience from './Experience.js'
import Baked from './Baked.js'
import GoogleLeds from './GoogleLeds.js'
import TopChair from './TopChair.js'
import ElgatoLight from './ElgatoLight.js'
import AiThisWeek from './AiThisWeek.js'
import LaptopSlideshow from './LaptopSlideshow.js'
import Screen from './Screen.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setBaked()
                this.setGoogleLeds()
                this.setTopChair()
                this.setElgatoLight()
                this.setAiThisWeek()
                this.setLaptopSlideshow()
                this.setPcScreen()
            }
        })
    }

    setBaked()
    {
        this.baked = new Baked()
    }

    setGoogleLeds()
    {
        this.googleLeds = new GoogleLeds()
    }

    setTopChair()
    {
        this.topChair = new TopChair()
    }

    setElgatoLight()
    {
        this.elgatoLight = new ElgatoLight()
    }

    setAiThisWeek()
    {
        this.aiThisWeek = new AiThisWeek()
    }

    setLaptopSlideshow()
    {
        this.laptopSlideshow = new LaptopSlideshow()
    }

    setPcScreen()
    {
        if (this.resources.items.pcScreenModel)
        {
            this.pcScreen = new Screen(
                this.resources.items.pcScreenModel.scene.children[0],
                './assets/videoShorts.mp4'
            )
        }
    }

    resize()
    {
    }

    update()
    {
        if(this.googleLeds)
            this.googleLeds.update()

        if(this.topChair)
            this.topChair.update()

        if(this.aiThisWeek)
            this.aiThisWeek.update()

        if(this.laptopSlideshow)
            this.laptopSlideshow.update()
    }

    destroy()
    {
    }
}