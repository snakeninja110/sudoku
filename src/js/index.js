import Grid from './ui/grid';
import Popupnumbers from './ui/popupnumbers';

const grid = new Grid($('#container'));
grid.build();
grid.layout();

const popupNumbers = new Popupnumbers($('#popupNumbers'));
grid.bindPopup(popupNumbers);

$('#check').on('mousedown', e => {
  if (grid.check()) {
    alert('恭喜您完成');
  }
});
$('#reset').on('mousedown', e => {
  grid.reset();
});
$('#clear').on('mousedown', e => {
  grid.clear();
});
$('#rebuild').on('mousedown', e => {
  grid.rebuild();
});
