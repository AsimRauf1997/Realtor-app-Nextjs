import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchapi";
import { Property } from "../components/Property";
const Banner = ({
  purpose,
  desc1,
  desc2,
  buttonText,
  linkName,
  title1,
  title2,
  imageUrl,
}) => {
  return (
    <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
      <Image src={imageUrl} width={500} height={300} alt='banner' />
      <Box p={5}>
        <Text color={"gray.500"} fontSize='sm' fontWeight='medium'>
          {purpose}
        </Text>
        <Text fontSize='3xl' fontWeight='bold '>
          {title1} <br /> {title2}
        </Text>
        <Text
          color={"gray.700"}
          fontSize='lg'
          paddingTop={3}
          paddingBottom={3}
          fontWeight='medium'
        >
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize='xl'>
          {/* <Link href={linkName}> {buttonText}</Link> */}
          {buttonText}
        </Button>
      </Box>
    </Flex>
  );
};

export default function Home({
  propertiesForSale,
  propertiesForRent,
  isLoading,
}) {
  return (
    <Box>
      <Banner
        purpose={"Rent A Home"}
        title1={"Rental Homes for "}
        title2={"Everyone"}
        desc1={"Explore Apartments, Villas, Homes"}
        desc2={"and more"}
        buttonText={"Explore Renting"}
        linkName='/search?purpose=for-rent'
        imageUrl='https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdXNlJTIwcGl1Y3R1cmVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      />
      <Flex flexWrap={"wrap"}>
        {propertiesForRent.map((pro, i) => (
          <Property key={i} property={pro} isLoading={isLoading} />
        ))}
      </Flex>
      <Banner
        purpose={"Buy A Home"}
        title1={"Find, Buy & Own Your "}
        title2={"Dream Home"}
        desc1={"Explore Apartments, Villas, Homes"}
        desc2={"and more"}
        buttonText={"Explore Buying"}
        linkName='/search?purpose=for-sale'
        imageUrl='https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBwaXVjdHVyZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      />
      <Flex flexWrap={"wrap"}>
        {propertiesForSale.map((pro, i) => (
          <Property key={i} property={pro} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  let isLoading = true;
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
      isLoading: false,
    },
  };
}
