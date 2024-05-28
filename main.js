const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


c.fillRect(0, 0, innerWidth, innerWidth)

class Cell {
    constructor(pos, i, j) {
        this.pos = pos
        this.i = i
        this.j = j
        this.state = 'dead'
        this.color = 'black'
    }
    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.pos.x, this.pos.y, 20, 20)
    }
    update() {
        if (this.state == 'dead') {
            this.color = 'black'
        }
        else {
            this.color = 'white'
        }
        this.draw()
    }
}


const cells = []

const createCells = () => {
    let i = 0
    let j = 0
    for (let y = 0; y <= canvas.height - 20; y += 20, i++) {
        cells.push([])
        for (let x = 0; x <= canvas.width - 20; x += 20, j++) {
            cells[i].push(new Cell(
                pos = {
                    x,
                    y,
                },
                i,
                j
            ))
        }
    }
}
createCells()

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min
}

cells[1][1].state = 'live'

cells[1][2].state = 'live'
cells[2][1].state = 'live'
cells[0][1].state = 'dead'
cells[1][0].state = 'dead'

const checkCell = () => {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            const cell = cells[i][j]
            let nCell = null
            let eCell = null
            let wCell = null
            let sCell = null
            if (i - 1 >= 0) {
                nCell = cells[i - 1][j]
            }
            if (j + 1 < cells[i].length) {
                eCell = cells[i][j + 1]
            }
            if (j - 1 >= 0) {
                wCell = cells[i][j - 1]
            }
            if (i + 1 < cells.length) {
                sCell = cells[i + 1][j]
            }
            rules(cell, cells[1][2], cells[2][1], cells[0][1], cells[1][0])
        }
    }
}


const rules = (cell, nCell, eCell, sCell, wCell) => {
    let livesCount = 0
    if (nCell?.state === 'live') {
        livesCount++
    }
    if (eCell?.state === 'live') {
        livesCount++
    }
    if (sCell?.state === 'live') {
        livesCount++
    }
    if (wCell?.state === 'live') {
        livesCount++
    }
    console.log(livesCount)
    switch (cells[1][1].state) {
        case 'live':
            if (livesCount < 2 || livesCount > 3) {
                cells[1][1].state = 'dead'
            }
            break
        case 'dead':
            if (livesCount === 3) {
                cells[1][1].state = 'live'
            }
            break
    }
}








const animate = () => {
    let ticker = requestAnimationFrame(animate)
    if(ticker%100 === 0 && ticker>0){
        cells.forEach((lin) => {
            lin.forEach((cell) => {
                // rules(0, cells[1][2], cells[2][1], cells[0][1], cells[1][0])
                cells[2][1].state = 'dead'
                cell.update()
            })
        })
    }
}
animate()



addEventListener('resize', (event) => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})