// 生成数独解决方案
import Toolkit from '../core/toolkit';

export default class Generator {

  generator () {
    while (!this.internalGenerator()) {
      // TODO
      // console.warn('try again');
    }
  }

  internalGenerator () {
    this.matrix = Toolkit.matrix.makeMatrix();
    this.orders = Toolkit.matrix.makeMatrix()
      .map(row => row.map((v, i) => i))
      .map(row => Toolkit.matrix.shuffle(row));

    // Toolkit.matrix.makeRow()
    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false;
      }
    }
    return true;
  }

  fillNumber (n) {
    return this.fillRow(n, 0);
  }

  fillRow (n, rowIndex) {
    if (rowIndex > 8) {
      return true;
    }

    const row = this.matrix[rowIndex];
    // 随机选择列
    const orders = this.orders[rowIndex];

    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i];

      // 如果该位置已经有值，则跳过
      if (row[colIndex]) {
        continue;
      }

      // 检查此位置是否可以填 n （!列和宫都存在）
      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue;
      }

      row[colIndex] = n;
      // 当前行填写 n 成功，递归调用 fillRow() 在下一行中填写 n
      // 去下一行填写 n，如果没填进去，就继续寻找当前行的下一个位置
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0;
        continue;
      }

      return true;
    }

    return false;
  }
}


// const generator = new Generator();
// generator.generator();
// console.log(generator.matrix);