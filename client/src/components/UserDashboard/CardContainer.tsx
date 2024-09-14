import React from "react";
import Card from "./Card";

function CardContainer() {
  return (
    <div className="video-container w-full h-[78vh]  flex flex-col overflow-auto gap-5 items-center  mt-2">
      <Card />
    </div>
  );
}

export default CardContainer;
