const { body } = document;

function changeBackground(number) {
  // Check if background already exists
  let pervbackground;
  if (body.className) {
    pervbackground = body.className;
  }
  // Reset CSS Class for body
  body.className = '';
  return pervbackground === `background-${number}`
    ? false
    : body.classList.add(`background-${number}`);

  // switch (number) {
  //   case '1':
  //     return pervbackground === 'background-1'
  //       ? false
  //       : body.classList.add('background-1');
  //   case '2':
  //     return pervbackground === 'background-2'
  //       ? false
  //       : body.classList.add('background-2');

  //   case '3':
  //     return pervbackground === 'background-3'
  //       ? false
  //       : body.classList.add('background-3');

  //   default:
  //     break;
  // }
}
