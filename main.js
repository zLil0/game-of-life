const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


c.fillRect(0, 0, innerWidth, innerWidth)

class Cell {
    constructor(pos){
        this.pos = pos
        this.color = 'black'
    }
    draw(){
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.pos.x, this.pos.y, 20, 20)
    }
}

const cells = []

const createCells = () => {
    let x = 0
    let y = 0
    do{
        cells.push(new Cell(pos = {
            x,
            y,
        }))
        x+= 20
        y+= 20
    } while(x<= canvas.width-20 && y<= canvas.width-20)
}