/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { styles } from "../theme/styles";
import {
  Download,
  Eraser,
  Line,
  Pencil,
  Circle,
  Rectangle,
  Reset,
} from "../theme/svg";
import { download } from "./download";

export default function Tools({
  toolType,
  setToolType,
  width,
  setWidth,
  setElements,
  setColorWidth,
  setPath,
  colorWidth,
  setShapeWidth,
}) {
  return (
    <div
      className="w-40 p-8 bg-black flex flex-col items-center justify-start  rounded-tr-lg rounded-br-lg  z-50"
      style={{
        position: "absolute",
        zIndex: 100,
      }}
    >
      <h3 className="font-bold text-xl">Shape</h3>
      <div
        onClick={() => {
          setToolType("line");
          setWidth(1);
          setShapeWidth(1);
        }}
        className="flex  items-center"
      >
        <button
          id="line"
          data-toggle="tooltip"
          data-placement="top"
          title="Line"
          style={styles.righticons}
        >
          <Line toolType={toolType} colorWidth={colorWidth} />
        </button>
        <p className="text-lg cursor-pointer">Line</p>
      </div>

      <div
        onClick={() => {
          setToolType("circle");
          setWidth(1);
          setShapeWidth(1);
        }}
        className="flex  items-center"
      >
        <button
          id="circle"
          data-toggle="tooltip"
          data-placement="top"
          title="circle"
          style={styles.righticons}
        >
          <Circle toolType={toolType} colorWidth={colorWidth} />
        </button>
        <p className="text-lg cursor-pointer">Circle</p>
      </div>

      <div
        onClick={() => {
          setToolType("rectangle");
          setWidth(1);
          setShapeWidth(1);
        }}
        className="flex  items-center"
      >
        <button
          id="rectangle"
          data-toggle="tooltip"
          data-placement="top"
          title="Rectangle"
          style={styles.righticons}
        >
          <Rectangle toolType={toolType} colorWidth={colorWidth} />
        </button>
        <p className="text-lg cursor-pointer">Box</p>
      </div>

      <div
        onClick={() => {
          setToolType("pencil");
          setWidth(1);
          setShapeWidth(1);
        }}
        className="flex  items-center"
      >
        <button
          id="pencil"
          data-toggle="tooltip"
          data-placement="top"
          title="Pencil"
          style={styles.righticons}
        >
          <Pencil toolType={toolType} colorWidth={colorWidth} />
        </button>
        <p className="text-lg cursor-pointer">Pencil</p>
      </div>
      <h3 className="font-bold text-xl">Options</h3>
      <div
        onClick={() => {
          setToolType("eraser");
          setWidth(10);
          setShapeWidth(1);
        }}
        className="flex  items-center"
      >
        <button
          id="eraser"
          data-toggle="tooltip"
          data-placement="top"
          title="Eraser"
          style={styles.righticons}
        >
          <Eraser toolType={toolType} colorWidth={colorWidth} />
        </button>
        <p className="text-lg cursor-pointer">Eraser</p>
      </div>

      <div
        onClick={() => {
          setElements([]);
          setPath([]);
          return;
        }}
        className="flex  items-center"
      >
        <button
          style={styles.righticons}
          data-toggle="tooltip"
          data-placement="top"
          title="Clear"
        >
          <Reset />
        </button>
        <p className="text-lg cursor-pointer">Reset</p>
      </div>

      <div onClick={download} className="flex  items-center">
        <button
          style={styles.righticons}
          data-toggle="tooltip"
          data-placement="top"
          title="Download"
        >
          <a href="#">
            <Download />
          </a>
        </button>
        <p className="text-lg cursor-pointer">Download</p>
      </div>
    </div>
  );
}
