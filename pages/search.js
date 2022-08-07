/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import Lottie from "react-lottie";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import { Property } from "../components/Property";
import noResult from "../assets/lottie/noresult";
import { baseUrl, fetchApi } from "../utils/fetchapi";
const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noResult,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box>
      <Flex
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        padding='2'
        fontSize='lg'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        onClick={() => setSearchFilters(!searchFilters)}
      >
        <Text> Search Property By Filtres</Text>
        <Icon pl='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap='wrap'>
        {properties.map((pro, i) => (
          <Property key={i} property={pro} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          my='5'
        >
          <Lottie options={defaultOptions} height={400} width={400} />
          <Text fontSize='2xl' marginTop='3px' fontWeight='bold'>
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
