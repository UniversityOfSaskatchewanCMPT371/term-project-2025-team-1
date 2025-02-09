//TODO
//The Time Series Graph That Will Be Displayed on the Scene
//Will require x, y positions and the number of rows
//More expected
import React, { useRef } from 'react';
import { Point2D } from './Point2D'; // Point2D file in the same directory
import { GraphClass } from "./GraphClass"; // GraphClass file isn't currently in the same direction
import { Canvas } from "@react-three/fiber"; // For the 3D canvas, since code will run on meta quest 3
import { Box } from "@react-three/drei";     // For the cube (box geometry)


const TimeSeriesGraph = () => {

// Test array.
    const timeSeriesData = [
    { x: "2023-10-01", y: 1 },
    { x: "2023-10-02", y: 3 },
    { x: "2023-10-03", y: 2 },
    { x: "2023-10-04", y: 4 },
    { x: "2023-10-05", y: 5 },
  ];

  // each GraphClass represents one point in graph
  const points = timeSeriesData.map((data, index) => {
    return new GraphClass(
      [index, data.y, 0], // Position: [x, y, z]
      false,              // Selected: false by default
      data.x,             // xData: Time value
      data.y              // yData: Data value
    );
  });

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* Draw each point on the graph */}
      {points.map((point, idx) => (
        <Point2D key={idx} pointRef={point} />
      ))}

      {/* Test cube, I will remove it later */}
      <Box position={[0, 0, 0]}>
        <meshStandardMaterial color="gray" />
      </Box>
    </Canvas>
  );

};
export default TimeSeriesGraph;
