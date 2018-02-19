/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 矩阵和数据相关工具
 * */
var matrixToolkit = {
  makeRow: function makeRow() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var array = new Array(9);
    array.fill(v);
    return array;
  },
  makeMatrix: function makeMatrix() {
    var _this = this;

    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Array.from({ length: 9 }, function () {
      return _this.makeRow(v);
    });
  },


  /**
   * Fisher-Yates 洗牌算法
   * 对传入数组进行随机排序，然后返回新数组
   * @param {*} array
   */
  shuffle: function shuffle(array) {
    var endIndex = array.length - 2;
    for (var i = 0; i <= endIndex; i++) {
      var j = i + Math.floor(Math.random() * (array.length - i));
      var _ref = [array[j], array[i]];
      array[i] = _ref[0];
      array[j] = _ref[1];
    }
    return array;
  },


  /**
   * TODO 检查指定位置可以填写数字 n
  */
  checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
    var row = matrix[rowIndex];
    var col = this.makeRow().map(function (v, i) {
      return matrix[i][colIndex];
    });

    var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
        boxIndex = _boxToolkit$convertTo.boxIndex;

    var box = boxToolkit.getBoxCells(matrix, boxIndex);

    for (var i = 0; i < 9; i++) {
      if (row[i] === n || col[i] === n || box[i] === n) {
        return false;
      }
    }
    return true;
  }
};

/**
 * 宫坐标系工具
*/
var boxToolkit = {
  convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },
  convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  },
  getBoxCells: function getBoxCells(matrix, boxIndex) {
    var startRowIndex = Math.floor(boxIndex / 3) * 3;
    var startColIndex = boxIndex % 3 * 3;
    var result = [];

    for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
      var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      var colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  }
};

// 工具集

var Toolkit = function () {
  function Toolkit() {
    _classCallCheck(this, Toolkit);
  }

  _createClass(Toolkit, null, [{
    key: "matrix",

    /**
     * 矩阵和数据相关工具
     */
    get: function get() {
      return matrixToolkit;
    }

    /**
     * 宫坐标系相关工具
     */

  }, {
    key: "box",
    get: function get() {
      return boxToolkit;
    }
  }]);

  return Toolkit;
}();

exports.default = Toolkit;
;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(2);

var _grid2 = _interopRequireDefault(_grid);

var _popupnumbers = __webpack_require__(6);

var _popupnumbers2 = _interopRequireDefault(_popupnumbers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grid = new _grid2.default($('#container'));
grid.build();
grid.layout();

var popupNumbers = new _popupnumbers2.default($('#popupNumbers'));
grid.bindPopup(popupNumbers);

$('#check').on('mousedown', function (e) {
  if (grid.check()) {
    alert('恭喜您完成');
  }
});
$('#reset').on('mousedown', function (e) {
  grid.reset();
});
$('#clear').on('mousedown', function (e) {
  grid.clear();
});
$('#rebuild').on('mousedown', function (e) {
  grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // 生成九宫格
// const Toolkit = require("../core/toolkit");
// import Generator from '../core/generator';


var _sudoku = __webpack_require__(3);

var _sudoku2 = _interopRequireDefault(_sudoku);

var _checker = __webpack_require__(5);

var _checker2 = _interopRequireDefault(_checker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid(container) {
    _classCallCheck(this, Grid);

    this._$container = container;
  }

  _createClass(Grid, [{
    key: 'build',
    value: function build() {
      // const generator = new Generator();
      // generator.generator();
      var sudoku = new _sudoku2.default();
      sudoku.make();
      var matrix = sudoku.puzzleMatrix;
      // const matrix = Toolkit.matrix.makeMatrix();

      var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
      var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

      var $cells = matrix.map(function (rowValues) {
        return rowValues.map(function (cellValue, colIndex) {
          return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? 'fixed' : 'empty').text(cellValue);
        });
      });

      var $divArray = $cells.map(function ($spanArray, rowIndex) {
        return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
      });

      this._$container.append($divArray);
    }
  }, {
    key: 'layout',
    value: function layout() {
      var width = $("span:first", this._$container).width();
      $("span", this._$container).height(width).css({
        "line-height": width + 'px',
        "font-size": width < 32 ? width / 2 + 'px' : ""
      });
    }

    /**
     * 检查用户解谜结果，成功则进行提示，失败显示错误位置标记
    */

  }, {
    key: 'check',
    value: function check() {
      // TODO 从界面获取需要检查的数据
      var $rows = this._$container.children();
      var data = $rows.map(function (rowIndex, div) {
        // 这里的map是jq实现的map而不是原生的map函数
        return $(div).children().map(function (colIndex, span) {
          return parseInt($(span).text()) || 0;
        });
      }).toArray().map(function ($data) {
        return $data.toArray();
      });

      var checker = new _checker2.default(data);

      if (checker.check()) {
        return true;
      }
      // 检查不成功，进行标记
      var marks = checker.matrixMarks;
      this._$container.children().each(function (rowIndex, div) {
        $(div).children().each(function (colIndex, span) {
          var $span = $(span);
          if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
            $span.removeClass('error');
          } else {
            $(span).addClass('error');
          }
        });
      });
    }

    /**
     * 重置当前迷盘到初始状态
    */

  }, {
    key: 'reset',
    value: function reset() {
      this._$container.find('span:not(.fixed)').removeClass('error mark1 mark2').text(0).addClass('empty');
    }

    /**
     * 清理错误标记
    */

  }, {
    key: 'clear',
    value: function clear() {
      this._$container.find('span.error').removeClass('error');
    }

    /**
     * 重建新的迷盘
    */

  }, {
    key: 'rebuild',
    value: function rebuild() {
      this._$container.empty();
      this.build();
      this.layout();
    }
  }, {
    key: 'bindPopup',
    value: function bindPopup(popupNumbers) {
      this._$container.on('mousedown', 'span:not(.fixed)', function (e) {
        e.stopPropagation();
        $('#container span.active').removeClass('active');
        var $cell = $(e.target);
        popupNumbers.popup($cell);
      });
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // 生成数独游戏
// 1.生成完成的解决方案：Generator
// 2.随机去除部分数据：按比例

var _generator = __webpack_require__(4);

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sudoku = function () {
  function Sudoku() {
    _classCallCheck(this, Sudoku);

    // 生成完成的解决方案
    var generator = new _generator2.default();
    generator.generator();
    this.solutionMatrix = generator.matrix;
  }

  _createClass(Sudoku, [{
    key: 'make',
    value: function make() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

      var shouldRid = Math.random() * 9 < level;
      // 生成迷盘
      this.puzzleMatrix = this.solutionMatrix.map(function (row) {
        return row.map(function (cell) {
          return Math.random() * 9 < level ? 0 : cell;
        });
      });
    }
  }]);

  return Sudoku;
}();

exports.default = Sudoku;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // 生成数独解决方案


var _toolkit = __webpack_require__(0);

var _toolkit2 = _interopRequireDefault(_toolkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, [{
    key: 'generator',
    value: function generator() {
      while (!this.internalGenerator()) {
        // TODO
        // console.warn('try again');
      }
    }
  }, {
    key: 'internalGenerator',
    value: function internalGenerator() {
      this.matrix = _toolkit2.default.matrix.makeMatrix();
      this.orders = _toolkit2.default.matrix.makeMatrix().map(function (row) {
        return row.map(function (v, i) {
          return i;
        });
      }).map(function (row) {
        return _toolkit2.default.matrix.shuffle(row);
      });

      // Toolkit.matrix.makeRow()
      for (var n = 1; n <= 9; n++) {
        if (!this.fillNumber(n)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'fillNumber',
    value: function fillNumber(n) {
      return this.fillRow(n, 0);
    }
  }, {
    key: 'fillRow',
    value: function fillRow(n, rowIndex) {
      if (rowIndex > 8) {
        return true;
      }

      var row = this.matrix[rowIndex];
      // 随机选择列
      var orders = this.orders[rowIndex];

      for (var i = 0; i < 9; i++) {
        var colIndex = orders[i];

        // 如果该位置已经有值，则跳过
        if (row[colIndex]) {
          continue;
        }

        // 检查此位置是否可以填 n （!列和宫都存在）
        if (!_toolkit2.default.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
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
  }]);

  return Generator;
}();

// const generator = new Generator();
// generator.generator();
// console.log(generator.matrix);


exports.default = Generator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _toolkit = __webpack_require__(0);

var _toolkit2 = _interopRequireDefault(_toolkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 检查数据

function checkArray(array) {
  var length = array.length;
  var marks = new Array(length);
  marks.fill(true);

  for (var i = 0; i < length; i++) {
    if (!marks[i]) {
      continue;
    }
    var v = array[i];
    // 是否有效, 0 - 无效， 1-9 有效
    if (!v) {
      marks[i] = false;
      continue;
    }

    // 是否重复 i+1 ~ 9 是否和 i 位置的数据重复
    for (var j = i + 1; j < length - 1; j++) {
      if (v === array[j]) {
        marks[j] = marks[i] = false;
      }
    }
  }

  return marks;
}

// 输入： matrix 用户完成的数独数据， 9 x 9
// 处理：对 matrix 行、列、宫进行检查，并填写marks
// 输出：检查是否成功 marks
var Checker = function () {
  function Checker(matrix) {
    _classCallCheck(this, Checker);

    this._matrix = matrix;
    this._matrixMarks = _toolkit2.default.matrix.makeMatrix(true);
  }

  _createClass(Checker, [{
    key: 'check',
    value: function check() {
      this.checkRows();
      this.checkCols();
      this.checkBoxes();

      // 检查是否成功
      // Array.prototype.every()
      this._success = this._matrixMarks.every(function (row) {
        return row.every(function (mark) {
          return mark;
        });
      });
      return this._success;
    }
  }, {
    key: 'checkRows',
    value: function checkRows() {
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        var row = this._matrix[rowIndex];
        var marks = checkArray(row);

        for (var colIndex = 0; colIndex < marks.length; colIndex++) {
          if (!marks[colIndex]) {
            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'checkCols',
    value: function checkCols() {
      for (var colIndex = 0; colIndex < 9; colIndex++) {
        var cols = [];
        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
          cols[rowIndex] = this._matrix[rowIndex][colIndex];
        }

        var marks = checkArray(cols);
        for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
          if (!marks[_rowIndex]) {
            this._matrixMarks[_rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'checkBoxes',
    value: function checkBoxes() {
      for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
        var boxes = _toolkit2.default.box.getBoxCells(this._matrix, boxIndex);
        var marks = checkArray(boxes);
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
          if (!marks[cellIndex]) {
            var _Toolkit$box$convertF = _toolkit2.default.box.convertFromBoxIndex(boxIndex, cellIndex),
                rowIndex = _Toolkit$box$convertF.rowIndex,
                colIndex = _Toolkit$box$convertF.colIndex;

            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'matrixMarks',
    get: function get() {
      return this._matrixMarks;
    }
  }, {
    key: 'isSuccess',
    get: function get() {
      return this._success;
    }
  }]);

  return Checker;
}();

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


exports.default = Checker;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 处理弹出操作面板
var PopupNumbers = function () {
  function PopupNumbers($panel) {
    var _this = this;

    _classCallCheck(this, PopupNumbers);

    this._$panel = $panel.hide().removeClass('hidden');
    this._panelWidth = $panel.width();
    this._$panel.on('mousedown', 'span', function (e) {
      var $cell = _this._$targetCell;
      var $span = $(e.target);

      if ($span.hasClass('mark1')) {
        // mark1，mark2 回填样式
        if ($cell.hasClass('mark1')) {
          $cell.removeClass('mark1');
        } else {
          $cell.removeClass('mark2').addClass('mark1');
        }
      } else if ($span.hasClass('mark2')) {
        // mark1，mark2 回填样式
        if ($cell.hasClass('mark2')) {
          $cell.removeClass('mark2');
        } else {
          $cell.removeClass('mark1').addClass('mark2');
        }
      } else if ($span.hasClass('empty')) {
        // empty 取消数字填写，取消mark
        $cell.text(0).addClass('empty');
      } else {
        // 1-9回填数字
        $cell.removeClass('empty').text($span.text());
      }
      _this.hide();
      $cell.removeClass('active');
    });
  }

  _createClass(PopupNumbers, [{
    key: 'popup',
    value: function popup($cell) {
      this._$targetCell = $cell;
      $cell.addClass('active');
      var rect = $cell[0].getBoundingClientRect();
      var deviation = parseFloat(rect.width / 2);

      var left = Math.round((rect.left + deviation) * 100) / 100;
      var top = Math.round((rect.top + deviation) * 100) / 100;

      var trueLeft = window.innerWidth > Math.round((left + this._panelWidth) * 100) / 100 ? left : left - this._panelWidth;
      this._$panel.css({
        left: trueLeft + 'px',
        top: top + 'px'
      }).show();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._$panel.hide();
    }
  }]);

  return PopupNumbers;
}();

exports.default = PopupNumbers;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map