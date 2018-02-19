// 处理弹出操作面板
export default class PopupNumbers {
  constructor ($panel) {
    this._$panel = $panel.hide().removeClass('hidden');
    this._panelWidth = $panel.width();
    this._$panel.on('mousedown', 'span', e => {
      const $cell = this._$targetCell;
      const $span = $(e.target);

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
      this.hide();
      $cell.removeClass('active');
    })
  }

  popup ($cell) {
    this._$targetCell = $cell;
    $cell.addClass('active');
    const rect = $cell[0].getBoundingClientRect();
    const deviation = parseFloat(rect.width / 2);

    const left = Math.round((rect.left + deviation) * 100) / 100;
    const top = Math.round((rect.top + deviation) * 100) / 100;

    const trueLeft = window.innerWidth > Math.round((left + this._panelWidth) * 100) / 100 ? left : left - this._panelWidth;
    this._$panel.css({
      left: `${trueLeft}px`,
      top: `${top}px`
    }).show();
  }

  hide () {
    this._$panel.hide();
  }
}
