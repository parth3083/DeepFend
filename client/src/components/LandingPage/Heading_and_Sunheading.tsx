import React from 'react'

function Heading_and_Sunheading({ beforeBrHeading, afterBrheading, spanHeading, beforeBrdesc, afterBrdesc, className }: { beforeBrHeading: string, afterBrheading?: string, spanHeading?: string, beforeBrdesc: string, afterBrdesc?: string, className?:string}) {
  return (
      <>
          <h1 className={`font-ala text-4xl md:text-6xl lg:text-7xl capitalize text-center ${className}`}>
    {beforeBrHeading} <br />
              <span className="text-[#2664EF]">{spanHeading}</span> {afterBrheading}
  </h1>
  <p className="font-ala text-sm md:text-lg lg:text-xl text-center mt-2 opacity-60">
    {beforeBrdesc} <br /> {afterBrdesc}
  </p>
      </>
  )
}

export default Heading_and_Sunheading