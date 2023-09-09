export function generateScramble() {
  let moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  let postfix = [' ', '\' ', '2 '];
  let scramble = '';
  let count = 0;
  let move;
  let previousMove;
  while(count  < 20) {
    move = moves[random(6)];
    if(scramble === '' || move !== previousMove) {
      scramble += move + postfix[random(3)];
      previousMove = move;
      count++;
    }
  }
  console.log(scramble);
}

function random(n) {
  return Math.floor(Math.random() * n);
}