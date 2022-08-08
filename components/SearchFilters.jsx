import { useEffect, useState } from "react";
import {Box, Select, Flex,Text,Input, Spinner, Icon, Button} from '@chakra-ui/react'
import { useRouter } from "next/router";



import { filterData,getFilterValues } from "../utils/filteredData";
const SearchFilters = () => {
    const [filters,setFilters]= useState(filterData)
    const router = useRouter()
    const searchProperties=(filterValues)=>{
        const path = router.pathname
        const {query}=router
        const values = getFilterValues(filterValues)
        values.forEach(item=>{
          if(item.value && filterValues?.[item.name]){
 query[item.name] = item.value
          }
           
        }) 
    router.push({pathname:path, query})
        }
  return (
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
        {filters.map(fil=>(
            <Box key={fil.queryName}>
                <Select
                placeholder={fil.placeholder} 
                w='fit-content'
                p='2'
                onChange={(e)=> searchProperties({[fil.queryName]:e.target.value})}>
                  {fil?.items?.map(item=>(
                    <option value={item.value} key={item.value}>
                        {item.name}
                    </option>
                  ))}  
                </Select>
            </Box>
        ))}
    </Flex>
  )
}

export default SearchFilters