import React from "react";
import Card from "./Card";


interface deepFakeValues {
  isReal: boolean;
  setIsReal: (value: boolean) => void;
}
function CardContainer({ isReal, setIsReal }: deepFakeValues) {
  return (
    <div className="video-container w-full h-[78vh]  flex flex-col overflow-auto gap-5 items-center  mt-2">
      <Card isReal={isReal} setIsReal={ setIsReal}/>
    </div>
  );
}

export default CardContainer;
