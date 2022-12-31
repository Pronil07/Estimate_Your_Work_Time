import "./styles.css";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [workedHours, setWorkedHours] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const canvasRef = useRef(null);
  useEffect(() => {
    let newDate = new Date();
    newDate.setHours(newDate.getHours() + workTime - Math.floor(workedHours));
    newDate.setMinutes(
      newDate.getMinutes() -
        Math.ceil((workedHours - Math.floor(workedHours)) * 100)
    );

    setEstimatedTime(newDate);
  }, [workedHours]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    var col = function (x, y, r, g, b) {
      context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      context.fillRect(x, y, 1, 1);
    };
    var R = function (x, y, t) {
      return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
    };
    var G = function (x, y, t) {
      return Math.floor(
        192 +
          64 *
            Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
      );
    };
    var B = function (x, y, t) {
      return Math.floor(
        192 +
          64 *
            Math.sin(
              5 * Math.sin(t / 9) +
                ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
            )
      );
    };
    var t = 0;

    var run = function () {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
      }
      t = t + 0.02;
      window.requestAnimationFrame(run);
    };

    run();
  }, []);

  const date = new Date();
  const workTime = 8;

  const calculateEstimatedTime = (e) => {
    setWorkedHours(e.target.value);
  };

  return (
    <div className="App">
      <h1 class="hero-title"> WORK TIME </h1>
      <canvas ref={canvasRef} className="canvas" width={32} height={32} />
      <div className="flex-container">
        <section className="flexbox">
          <label>Current Time</label>
          <input value={date.toLocaleTimeString()} disabled />
        </section>
        <section className="flexbox">
          <label>Total work time</label>
          <input value={`${workTime}hrs`} disabled />
        </section>
        <section className="flexbox">
          <label>How many hours of work done (in hrs)?</label>
          <input value={workedHours} onChange={calculateEstimatedTime} />
        </section>
        <section className="flexbox">
          <label>Estimated time when your work is finished</label>
          <h1>{`${new Date(estimatedTime).toLocaleTimeString()}`}</h1>
        </section>
      </div>
    </div>
  );
}
