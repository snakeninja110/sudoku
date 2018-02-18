// 处理弹出操作面板
export default class PopupNumbers {
  constructor ($panel) {
    this._$panel = $panel.hide().removeClass('hidden');

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
    })
  }

  popup ($cell) {
    this._$targetCell = $cell;
    const { left, top } = $cell.position();
    const trueLeft = left > $(document.body).width() * 0.625 ? parseInt(left - 120) : left;
    this._$panel.css({
      left: `${trueLeft}px`,
      top: `${top}px`
    }).show();
  }

  hide () {
    this._$panel.hide();
  }
}
