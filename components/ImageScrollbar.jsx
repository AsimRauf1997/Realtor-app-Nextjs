import { useContext } from "react";
import Image from 'next/image'
import {Box,Icon,Flex} from "@chakra-ui/react"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

import React from 'react'
const LeftArrow = ()=>{
    const {scrollPrev} = useContext(VisibilityContext)
    return(
        <Flex justifyContent='center' mr='1'  alignItems='center'>
            <Icon as={FaArrowAltCircleLeft} onClick={()=>scrollPrev()} fontSize='2xl' cursor='pointer'/>
        </Flex>
    )
}
const RightArrow = ()=>{
     const {scrollNext} = useContext(VisibilityContext)
    return(
        <Flex justifyContent='center' mr='1'  alignItems='center'>
            <Icon as={FaArrowAltCircleRight} onClick={()=>scrollNext()} fontSize='2xl' cursor='pointer'/>
        </Flex>
    )
    
}
const ImageScrollbar = ({data}) => {
  return (
   <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{
    overflow:'hidden'
   }}>
    {data.map((img,i)=>(
        <Box key={i} w='900px' itemID={img.id} overflow='hidden'>
            <Image
            alt="scrollImage"
            placeholder="blur"
            blurDataURL={img.url}
            src={img.url}
            width={1000}
            height={500}
            sizes = "(max-width:500px) 100px, (max-width:1023px ) 400px, 600px"
            />
        </Box>
    ))}
   </ScrollMenu>
  )
}

export default ImageScrollbar
