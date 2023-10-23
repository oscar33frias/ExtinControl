import LAY_OUT_EXTINTORES_PLANTA_1_2023 from "../img/LAY_OUT_EXTINTORES_PLANTA_1_2023.jpg";
import { useState } from 'react';

const Mapa = () => {
  const [markers, setMarkers] = useState([
    { x: 1298, y: 722 },
    { x: 1061, y: 763 },
    { x: 1038, y: 742 },
    { x: 880, y: 809 },
    { x: 839, y: 867 },
    { x: 899, y: 880 },
    { x: 1011, y: 812 },
    { x: 1237, y: 1065 },
    { x: 1354, y: 1010 },
    { x: 913, y: 805 },
    { x: 688, y: 818 },
    { x: 629, y: 819 },
    { x: 630, y: 739 },
    { x: 415, y: 743 },
    { x: 399, y: 878 },
    { x: 325, y: 834 },
    { x: 72, y: 836 },
    { x: 70, y: 741 },
    { x: 234, y: 741 },
    { x: 74, y: 581 },
    { x: 234, y: 579 },
    { x: 418, y: 577 },
    { x: 630, y: 578 },
    { x: 811, y: 579 },
    { x: 983, y: 490 },
    { x: 986, y: 218 },
    { x: 983, y: 333 },
    { x: 809, y: 491 },
    { x: 631, y: 491 },
    { x: 416, y: 488 },
    { x: 235, y: 491 },
    { x: 73, y: 489 },
    { x: 71, y: 332 },
    { x: 235, y: 335 },
    { x: 235, y: 218 },
    { x: 363, y: 218 },
    { x: 416, y: 335 },
    { x: 658, y: 266 },
    { x: 694, y: 222 },
    { x: 758, y: 231 },
    { x: 809, y: 331 },
    { x: 1063, y: 261 },
    { x: 1084, y: 313 },
    { x: 1099, y: 261 },
    { x: 1119, y: 265 },
    { x: 1138, y: 286 },
    { x: 1121, y: 314 },
    { x: 1155, y: 261 },
    { x: 1388, y: 480 },
    { x: 1295, y: 198 },
    { x: 1075, y: 196 },
    { x: 757, y: 196 },
    { x: 482, y: 195 },
    { x: 52, y: 199 },
    { x: 54, y: 538 },
    { x: 54, y: 1241 },
    { x: 89, y: 938 },
    { x: 79, y: 963 },
    { x: 124, y: 1071 },
    { x: 188, y: 1037 },
    { x: 250, y: 973 },
    { x: 188, y: 898 },
    { x: 149, y: 1241 },
    { x: 397, y: 903 },
    { x: 610, y: 902 },
    { x: 822, y: 900 },
    { x: 595, y: 1086 },
    { x: 862, y: 1102 },
    { x: 1000, y: 1199 },
    { x: 879, y: 1196 },
    { x: 1108, y: 1198 },
    { x: 1034, y: 666 },
    { x: 1030, y: 594 },
    { x: 1034, y: 332 },
  ]);

  const handleMapClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const marker = { x: offsetX, y: offsetY };
    setMarkers([...markers, marker]);
  };

  console.log(markers);

  return (
    <div
      style={{ position: "relative", width: "1500px", height: "1400px" }}
      onClick={handleMapClick}
    >
      <img
        src={LAY_OUT_EXTINTORES_PLANTA_1_2023}
        alt="Mapa de la planta"
        style={{ width: "100%", height: "100%" }}
      />
      {markers.map((marker, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: marker.x-6,
            top: marker.y-9,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "orange",
          }}
        >
          {index+1}
        </div>
      ))}
    </div>
  );
};

export default Mapa;