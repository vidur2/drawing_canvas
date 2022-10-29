import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { Matrix, inverse } from "ml-matrix";

export default function Home() {
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const map = new Array();
    const canvas = document.getElementById("canvas");
    const offsetX = canvas.offsetLeft;
    const offsetY = canvas.offsetTop;
    const ctx = canvas.getContext("2d");

    canvas.onmousedown = () => {
      setDragging(true);
      ctx.beginPath()
    };

    canvas.onmouseup = () => {
      setDragging(false);
      const velX_t = powerRule(polyRegr(map, "t", "x"));
      const funcT_x = polyRegr(map, "x", "t");
      const velY_t = powerRule(polyRegr(map, "t", "y"));
      const funcT_y = polyRegr(map, "y", "t");

      // console.log(velY_t);
      // console.log(velX_t);
    };

    canvas.onmousemove = (e) => {
      if (dragging) {
        map.push({ t: 0.1 * map.length, x: e.clientX-offsetX, y: e.clientY-offsetY });
        ctx.fillRect(e.clientX-offsetX, e.clientY-offsetY,1,1);
      }
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <canvas id="canvas"></canvas>
      </main>
    </div>
  )
}


function polyRegr(obj, independent, dependent) {
  const {a, b} = genArr(obj, independent, dependent);

  const matA = new Matrix(a);
  const matB = new Matrix(b);
  const matATrans = matA.transpose();
  const final = inverse(matATrans.mmul(matA));
  const func = final.mmul(matATrans).mmul(matB);

  return func;
}

function genArr(obj, independent, dependednt) {
  const n = obj.length;
  const a = new Array();
  const b = new Array();

  for (let i = 0; i < n; i++) {
    const currX = obj[i];
    const tmp = new Array();

    for (let i = 0; i < n - 1; i++) {
      tmp.push(Math.pow(currX[independent], i))
    }
    a.push(tmp);

    const tmp2 = new Array();
    tmp2.push(currX[dependednt]);
    b.push(tmp2);
  }
  // console.log(b);
  return {a: a, b: b};
}

function powerRule(obj) {
  const derivative = new Array();
  for (let i = 1; i < obj.data.length; i++) {
    // console.log(obj.data[i])
    derivative.push(obj.data[i][0] * (1 + i))
  }

  return derivative;
}

