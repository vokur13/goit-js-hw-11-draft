import '../../css/_common.css';
import '../../css/_header.css';

// Header positioning

const { height: pageHeaderHeight } = document
  .querySelector('.header')
  .getBoundingClientRect();

document.body.style.paddingTop = `${pageHeaderHeight}px`;
