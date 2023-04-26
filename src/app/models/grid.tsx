import clsx from "clsx";
import { RefObject, createRef } from "react";


export class Grid {

  public rows: number;
  public columns: number;
  public grid: boolean[][];
  public gridRef: RefObject<Grid>

  constructor(rows: number, columns: number) {
    this.rows = rows
    this.columns = columns
    this.gridRef = createRef()
    this.grid = new Array(rows).fill(false).map(() => new Array(columns).fill(false))
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

  public toggleCell(row: number, column: number) {
    this.grid[row][column] = !this.isAlive(row, column);
  }

  public randomize(): boolean[][] {
    console.log('shuffling...', this.grid)


    return this.grid
  }

  public restartGrid(rows:number, cols:number): boolean[][] {
    this.grid = []
    this.grid = new Array(rows).fill(false).map(() => new Array(cols).fill(false))
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
