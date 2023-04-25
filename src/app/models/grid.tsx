import clsx from "clsx";
import { RefObject, createRef } from "react";


export class Grid {

  public readonly rows: number;
  public readonly columns: number;
  public readonly grid: boolean[][];
  public readonly gridRef: RefObject<Grid>

  constructor(rows: number, columns: number) {
    this.rows = rows
    this.columns = columns
    this.grid = new Array(rows).fill(false).map(() => new Array(columns).fill(false))
    this.gridRef = createRef()
  }

  public getGridSpecs() {
    return  {
      columns: this.columns,
      rows: this.rows,
      matrix: this.grid,
      gridRef: this.gridRef
    }
  }

  public isAlive(row: number, column: number): boolean {
    return this.grid[row][column];
  }

  public setAlive(row: number, column: number, alive: boolean): void {
    this.grid[row][column] = alive;
  }

  public randomize(): boolean[][] {
    console.log('shuffling...')
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.grid[i][j] = Math.floor(Math.random() * 2) === 1 ? true : false;
      }
    }

    return this.grid
  }

  public renderGrid() {
    console.log('rendering grid...', {columns: this.columns, rows: this.rows, grid: this.grid})
    return (
        <div 
          className='grid max-w-fit min-w-max justify-items-center items-center gap-2 gap-x-2'
          style={{gridTemplateColumns: `repeat(${this.columns},minmax(0,1fr))`}}
        >
          {
            this.grid.map( (row, i) => {
              return row.map( (col, j) => {
                return (
                  <div 
                    key={String(i)+String(j)} 
                    className={clsx(
                      ["w-10 h-10", {
                        "bg-red-700" : col,
                        "bg-slate-500" : !col
                      }]
                    )}>
                  </div>
                )
              })
            })
          }
        </div>
    );
  }
}
