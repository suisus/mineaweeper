import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  // const [samplePos, setSamplePos] = useState(0);
  const [bomMap, setBomMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [userInputs, setUserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const directions = [
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // const board = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 6, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ];

  // let startTime:number|null=null;
  // let timerInterval:number|null=null;

  // function startGame(){
  //   startTime=Date.now();
  //   timerInterval=window.setInterval(updateTimer,1000);
  // }

  const zerocycle = (board: number[][], x: number, y: number) => {
    let bombcount = 0;
    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;
      if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;
      if (bomMap[ny][nx] === 1) {
        bombcount += 1;
      }
    }
    board[y][x] = bomMap[y][x] === 1 ? 11 : bombcount;
    if (bomMap[y][x] === 1) return;
    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;
      if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;
      if (bombcount === 0 && userInputs[ny][nx] !== 1 && bomMap[ny][nx] === 0) {
        userInputs[ny][nx] = 1;
        zerocycle(board, nx, ny);
      }
    }
  };

  const board = structuredClone(bomMap);

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (userInputs[y][x] === 0) {
        board[y][x] = -1;
      } else {
        zerocycle(board, x, y);
        // let bombcount = 0;
        // for (const [dy, dx] of directions) {
        //   const ny = y + dy;
        //   const nx = x + dx;
        //   if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;
        //   if (bomMap[ny][nx] === 1) {
        //     bombcount += 1;
        //   }
        // }
        // board[y][x] = bomMap[y][x] === 1 ? 11 : bombcount;
      }
    }
  }
  console.log('board');
  console.table(board);

  const clickHandler = (x: number, y: number) => {
    let bombcount = 0;
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (bomMap[y][x] === 1) {
          bombcount += 1;
        }
      }
    }
    if (bombcount === 0) {
      const newbombMap = structuredClone(bomMap);
      setBomMap(bombSet(x, y, newbombMap));
      //     console.log(y, x);
    }
    const newUserInputs = structuredClone(userInputs);
    newUserInputs[y][x] = 1;
    setUserInputs(newUserInputs);
  };

  const bombSet = (x: number, y: number, bomMap: number[][]) => {
    const Bombposition: number[][] = [];
    while (Bombposition.length < 10) {
      const bombx = Math.floor(Math.random() * 9);
      const bomby = Math.floor(Math.random() * 9);
      if (x === bombx && y === bomby) {
        continue;
      }
      const double = [0];
      for (const i of Bombposition) {
        if (i[0] === bomby && i[1] === bombx) {
          double[0]++;
          break;
        }
      }
      if (double[0] !== 0) {
        continue;
      }
      Bombposition.push([bomby, bombx]);
      bomMap[bomby][bombx] = 1;
    }
    return bomMap;
  };
  console.log('bomb');
  console.table(bomMap);

  // const gameOver=()=>{
  //   userInputs[][]=
  // }

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        <div className={styles.pointStyle}>
          <div className={styles.totalbombStyle} />
          <div className={styles.faceStyle}>
            <div className={styles.sampleStyle} style={{ backgroundPosition: `90px 0px` }} />
          </div>
          <div className={styles.timeboardStyle} />
        </div>
        <div className={styles.gameboardStyle}>
          {board.map((row, y) =>
            row.map((number, x) => (
              <div
                className={styles.cellStyle}
                onClick={() => clickHandler(x, y)}
                key={`${x}-${y}`}
                style={{
                  borderColor: board[y][x] >= 0 ? '#909090' : '#fff #909090 #909090 #fff',
                }}
              >
                {/* <div className={styles.normal}>
                    style={{
                      number===-1
                    }} */}
                {board[y][x] === -1 && <div className={styles.normal} />}
                {board[y][x] > 0 && board[y][x] < 12 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `${(board[y][x] - 1) * -30}px 0px` }}
                  />
                )}
                {/* {board[y][x]===11&&<div} */}
              </div>
            )),
          )}
        </div>
      </div>
      {/* <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button> */}
    </div>
  );
};

export default Home;
