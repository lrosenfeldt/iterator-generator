class Matrix implements Iterable<Float64Array> {
  numberOfColumns: number;
  numberOfRows: number;
  vector: Float64Array;
  constructor(rows: number, columns: number) {
    this.numberOfRows = rows;
    this.numberOfColumns = columns;
    this.vector = new Float64Array(rows * columns);
    this.vector.fill(0);
  }

  [Symbol.iterator](): Iterator<Float64Array> {
    let rowIndex = 0;
    return {
      next: () => {
        if (rowIndex >= this.numberOfRows) {
          return {
            done: true,
            value: undefined,
          };
        }
        const row = this.vector.subarray(
          rowIndex * this.numberOfColumns,
          (rowIndex + 1) * this.numberOfColumns
        );
        rowIndex++;
        return {
          done: false,
          value: row,
        };
      },
    };
  }
}

const matrix = new Matrix(2, 2);
