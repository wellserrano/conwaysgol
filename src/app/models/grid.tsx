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
        <div className="grid grid-cols-10 gap-1">
              
        </div>
    );
  }
}


// {`cell ${cell ? 'alive' : 'dead'}`}