import clsx from "clsx";

export class GameOfLifeGrid {
  private readonly rows: number;
  private readonly columns: number;
  private readonly grid: boolean[][];

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.grid = new Array(rows).fill(false).map(() => new Array(columns).fill(false));
  }

  public getRows(): number {
    return this.rows;
  }

  public getColumns(): number {
    return this.columns;
  }

  public isAlive(row: number, column: number): boolean {
    return this.grid[row][column];
  }

  public setAlive(row: number, column: number, alive: boolean): void {
    this.grid[row][column] = alive;
  }

  public randomize(): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.grid[i][j] = Math.floor(Math.random() * 2) === 1 ? true : false;
      }
    }
  }

  renderGrid() {
    return (
        <div className="grid grid-cols-10 max-w-fit min-w-max justify-items-center items-center gap-2 gap-x-2">
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
