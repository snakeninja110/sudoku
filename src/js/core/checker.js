// 检查数据

function checkArray (array) {
  const length = array.length;
  const marks = new Array(length);
  marks.fill(true);

  for (let i = 0; i < length; i++) {
    if (!marks[i]) {
      continue;
    }
    const v = array[i];
    // 是否有效, 0 - 无效， 1-9 有效
    if (!v) {
      marks[i] = false;
      continue;
    }

    // 是否重复 i+1 ~ 9 是否和 i 位置的数据重复
    for (let j = i + 1; j < length - 1; j++) {
      if (v === array[j]) {
        marks[j] = marks[i] = false;
      }
    }
  }

  return marks;
}

import Toolkit from './toolkit';

// 输入： matrix 用户完成的数独数据， 9 x 9
// 处理：对 matrix 行、列、宫进行检查，并填写marks
// 输出：检查是否成功 marks
export default class Checker {
  constructor (matrix) {
    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  get matrixMarks () {
    return this._matrixMarks;
  }

  get isSuccess () {
    return this._success;
  }

  check () {
    this.checkRows();
    this.checkCols();
    this.checkBoxes();

    // 检查是否成功
    // Array.prototype.every()
    this._success = this._matrixMarks.every(row => row.every(mark => mark));
    return this._success;
  }

  checkRows () {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex];
      const marks = checkArray(row);

      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkCols () {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cols = [];
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex];
      }

      const marks = checkArray(cols);
      for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkBoxes () {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
      const marks = checkArray(boxes);
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }
}

// const Generator = require('./generator');
// const gen = new Generator();
// gen.generator();
// const matrix = gen.matrix;

// const checker = new Checker(matrix);

// matrix[1][1] = 0;
// matrix[2][3] = matrix[3][5] = 5;

// const checker2 = new Checker(matrix);
// console.log(matrix);
// console.log("check result", checker2.check());
// console.log(checker2.matrixMarks);