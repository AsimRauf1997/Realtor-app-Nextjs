    import Link from "next/link";
    import Image from "next/image";
    import { Flex, Box, Text, Avatar,Skeleton } from "@chakra-ui/react";
    import {FaBed, FaBath} from 'react-icons/fa'
    import {BsGridFill} from 'react-icons/bs'
    import {GoVerified} from 'react-icons/go'
    import millify from "millify";
    import styles from '../styles/Property.module.css'
    import React, { useEffect, useState } from 'react'
    
    export const Property = ({property:{coverPhoto, price, rentFrequency, rooms,title,baths,area,agency,isVerified, externalID}}) => {
       const [loading, setLoading] = useState(true)
       useEffect(() => {
         setTimeout(() => {
            setLoading(false)
         }, 4000);
       
        
       }, [])
       
    return (
        
             <Link href={`property/${externalID}`} passHref >
        <Flex className={styles.zoominEffect}
         flexWrap='wrap' w='420px' p='5' paddingTop='0' justifyContent='flex-start' cursor='pointer'  borderColor='gray.100' >
            <Box>
                <Skeleton isLoaded={!loading} width={400}>
                <Image src={coverPhoto.url} width={400} height={260}  alt='image'/>
                </Skeleton>
            </Box>
            
                 <Box w='full'>
                <Flex paddingTop={2} alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center'>
                        <Skeleton isLoaded={!loading} width='auto'>
                            <Box paddingRight={3} color='green.400'>
                                {isVerified && <GoVerified/>}
                            </Box>
                            <Text fontWeight='bold' fontSize='lg'>
                                AED{millify(price)} {rentFrequency&&`/${rentFrequency}`}
                            </Text>
                        </Skeleton>

                    </Flex>
                    <Box>
                        <Skeleton isLoaded={!loading} width='auto'>
                            <Avatar size='sm' src={agency?.logo?.url}/>
                        </Skeleton>
                        
                    </Box>
                </Flex>
                <Skeleton isLoaded={!loading} width='auto' >
                <Flex alignItems='center' justifyContent='space-between' p='1' w='250px' color='blue.400'>
                        
                    
                    {rooms} <FaBed/> | {baths} <FaBath/> {millify(area)} sqft <BsGridFill/>
                    
                </Flex>
                </Skeleton>
                <Skeleton isLoaded={!loading} width='auto' >
                    <Text fontSize='lg'>
                    {title.length>30?`${title.substr(0,30)}...`:title}
                </Text>
                </Skeleton>
                
            </Box>
           
        </Flex>
    </Link>
        
   
    )
    }

