/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

import Tools from "./Tools";
import {
  adjustElementCoordinates,
  createElement,
  cursorForPosition,
  getElementAtPosition,
  midPointBtw,
  resizedCoordinates,
} from "./element";
import Board from "./Board";

function WhiteBoard() {
  const [points, setPoints] = useState([]);
  const [path, setPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [toolType, setToolType] = useState("pencil");
  const [selectedElement, setSelectedElement] = useState(null);
  const [colorWidth, setColorWidth] = useState({
    hex: "#008000",
    hsv: {},
    rgb: {},
  });
  const [width, setWidth] = useState(1);
  const [shapeWidth, setShapeWidth] = useState(1);
  const [popped, setPopped] = useState(false);
  // const [storedPath, setStoredPath] = useState([]);
  // console.log(storedPath);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";

    context.save();

    const drawpath = () => {
      path.forEach((stroke, index) => {
        context.beginPath();

        stroke.forEach((point, i) => {
          context.strokeStyle = point.newColour;
          context.lineWidth = point.newLinewidth;

          var midPoint = midPointBtw(point.clientX, point.clientY);

          context.quadraticCurveTo(
            point.clientX,
            point.clientY,
            midPoint.x,
            midPoint.y
          );
          context.lineTo(point.clientX, point.clientY);
          context.stroke();
        });
        context.closePath();
        context.save();
      });
    };

    if (toolType === "eraser" && popped === true) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setPopped(false);
    }

    const roughCanvas = rough.canvas(canvas);

    if (path !== undefined) drawpath();

    context.lineWidth = shapeWidth;

    elements.forEach(({ roughElement }) => {
      context.globalAlpha = "1";
      context.strokeStyle = roughElement.options.stroke;
      roughCanvas.draw(roughElement);
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [popped, elements, path, width, toolType, shapeWidth]);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/v1/path`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setStoredPath(data?.data?.map((drawingArr) => drawingArr.drawings))
  //     );
  // }, []);

  useEffect(() => {
    // Load path and elements from localStorage

    const storedPath = localStorage.getItem("path");
    const storedElements = localStorage.getItem("elements");

    if (storedPath) {
      setPath(JSON.parse(storedPath));
    }

    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);

  const updateElement = (
    index,
    x1,
    y1,
    x2,
    y2,
    toolType,
    strokeWidth,
    strokeColor
  ) => {
    const updatedElement = createElement(
      index,
      x1,
      y1,
      x2,
      y2,
      toolType,
      strokeWidth,
      strokeColor
    );
    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
    // Save updated elements to localStorage
    localStorage.setItem("elements", JSON.stringify(elementsCopy));
    // console.log(JSON.stringify(elementsCopy)); //line box
  };

  const checkPresent = (clientX, clientY) => {
    if (path === undefined) return;
    var newPath = path;
    path.forEach((stroke, index) => {
      stroke.forEach((point, i) => {
        if (
          clientY < point.clientY + 10 &&
          clientY > point.clientY - 10 &&
          clientX < point.clientX + 10 &&
          clientX > point.clientX - 10
        ) {
          newPath.splice(index, 1);
          setPopped(true);
          setPath(newPath);

          // Save updated path to localStorage
          localStorage.setItem("path", JSON.stringify(newPath));
          // console.log(JSON.stringify(newPath));

          return;
        }
      });
    });
    const newElements = elements;
    newElements.forEach((ele, index) => {
      if (
        clientX >= ele.x1 &&
        clientX <= ele.x2 &&
        clientY >= ele.y1 &&
        clientY <= ele.y2
      ) {
        newElements.splice(index, 1);
        setPopped(true);
        setElements(newElements);

        // Save updated elements to localStorage
        localStorage.setItem("elements", JSON.stringify(newElements));
        // console.log(JSON.stringify(newElements));
      }
    });
  };

  return (
    <div className="flex justify-between items-center">
      <Tools
        toolType={toolType}
        setToolType={setToolType}
        width={width}
        setWidth={setWidth}
        setElements={setElements}
        setColorWidth={setColorWidth}
        setPath={setPath}
        colorWidth={colorWidth}
        setShapeWidth={setShapeWidth}
      />
      <Board
        toolType={toolType}
        getElementAtPosition={getElementAtPosition}
        elements={elements}
        setSelectedElement={setSelectedElement}
        setAction={setAction}
        checkPresent={checkPresent}
        setIsDrawing={setIsDrawing}
        colorWidth={colorWidth}
        width={width}
        setPoints={setPoints}
        shapeWidth={shapeWidth}
        createElement={createElement}
        setElements={setElements}
        cursorForPosition={cursorForPosition}
        action={action}
        points={points}
        isDrawing={isDrawing}
        midPointBtw={midPointBtw}
        updateElement={updateElement}
        selectedElement={selectedElement}
        resizedCoordinates={resizedCoordinates}
        adjustElementCoordinates={adjustElementCoordinates}
        path={path}
        setPath={setPath}
      />
    </div>
  );
}

export default WhiteBoard;
