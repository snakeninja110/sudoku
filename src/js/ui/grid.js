// 生成九宫格
// const Toolkit = require("../core/toolkit");
// import Generator from '../core/generator';
import Sudoku from '../core/sudoku';
import Checker from '../core/checker';

export default class Grid {
  constructor (container) {
    this._$container = container;
  }

  build () {
    // const generator = new Generator();
    // generator.generator();
    const sudoku = new Sudoku();
    sudoku.make();
    const matrix = sudoku.puzzleMatrix;
    // const matrix = Toolkit.matrix.makeMatrix();

    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
    const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

    const $cells = matrix.map((rowValues => rowValues.map((cellValue, colIndex) => {
      return $("<span>")
        .addClass(colGroupClasses[colIndex % 3])
        .addClass(cellValue ? 'fixed' : 'empty')
        .text(cellValue);
    })));

    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $("<div>")
        .addClass("row")
        .addClass(rowGroupClasses[rowIndex % 3])
        .append($spanArray);
    })

    this._$container.append($divArray);
  }

  layout () {
    const width = $("span:first", this._$container).width();
    $("span", this._$container)
      .height(width)
      .css({
        "line-height": `${width}px`,
        "font-size": width < 32 ? `${width / 2}px` : ""
      });
  }

  /**
   * 检查用户解谜结果，成功则进行提示，失败显示错误位置标记
  */
  check () {
    // TODO 从界面获取需要检查的数据
    const $rows = this._$container.children();
    const data = $rows.map((rowIndex, div) => {
      // 这里的map是jq实现的map而不是原生的map函数
      return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0);
    })
    .toArray()
    .map($data => $data.toArray());

    const checker = new Checker(data);

    if (checker.check()) {
      return true;
    }
    // 检查不成功，进行标记
    const marks = checker.matrixMarks;
    this._$container.children()
      .each((rowIndex, div) => {
        $(div).children().each((colIndex, span) => {
          const $span = $(span);
          if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
            $span.removeClass('error');
          } else {
            $(span).addClass('error');
          }
        })
      })
  }

  /**
   * 重置当前迷盘到初始状态
  */
  reset () {
    this._$container.find('span:not(.fixed)')
      .removeClass('error mark1 mark2')
      .text(0)
      .addClass('empty');
  }

  /**
   * 清理错误标记
  */
  clear () {
    this._$container.find('span.error').removeClass('error');
  }

  /**
   * 重建新的迷盘
  */
  rebuild () {
    this._$container.empty();
    this.build();
    this.layout();
  }

  bindPopup (popupNumbers) {
    this._$container.on('mousedown', 'span:not(.fixed)', e => {
      e.stopPropagation();
      $('#container span.active').removeClass('active');
      const $cell = $(e.target);
      popupNumbers.popup($cell);
    })
  }
}

