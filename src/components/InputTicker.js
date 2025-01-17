import { useState } from "react";
import { Text, Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
// import { whiten } from "@chakra-ui/theme-tools";

const InputTicker = ({ fetchChartData, addTicker, fullResults, dataError }) => {
  const [ticker, setTicker] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLimit, setIsLimit] = useState(false);

  const handleChange = (e) => {
    if (dataError === true) {
      setIsError(true);
    } else {
      setTicker(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Limiting to only 4 inputs
    if (fullResults.length < 2) {
      if (ticker === "") {
        console.log("testing error");
        setIsError(true);
      } else {
        let capsTicker = ticker.toUpperCase();
        setIsError(false);
        // will need to pass the value into a function that calls the API
        fetchChartData(capsTicker);
        // will need to call a function in App.js to add this ticker to the array of all tickers
        addTicker(capsTicker);
        // clear input field
        setTicker("");
      }
    } else {
      // set error for limit to only 2 tickers
      setIsLimit(true);
      // clear input field
      setTicker("");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      // maxW="md"
      w={{ sm: "30%", md: "25%", lg: "100%"}}
      maxW={{lg: "sm"}}
      // h="25%"
      h={{ sm:"100%", md: "100%", lg: "35%"}}
      // bg="componentbg"
      bg="#7c72ff"
      // marginBottom="5%"
      marginBottom={{ lg: "5%"}}
      borderRadius="lg"
      p={{ md:"6", lg:"0"}}
      boxShadow="dark-lg"
    >
      <form onSubmit={submitHandler}>
        <FormControl>
          {/* bg="#5F6791" */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            p="1.5"
          >
            <FormLabel htmlFor="ticker">Ticker:</FormLabel>
            <Input
              type="text"
              id="ticker"
              value={ticker}
              onChange={handleChange}
              maxW="50%"
              variant="flushed"
              // autofocus not working
              autoFocus="autofocus"
              h="4"
            />
          </Box>

          {isError && <Text textAlign="center" fontSize={{sm: "0.7rem", md: "0.75rem"}}>Ticker not found.</Text>}
          {isLimit && <Text textAlign="center" fontSize={{sm: "0.7rem", md: "0.75rem"}}>Ticker limit met.</Text>}

          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              // onClick={submitHandler}
              variant="primaryOutline"
              type="submit"
              marginTop="4"
              w={{sm: "90%"}}
              fontSize={{ sm:"0.8rem"}}
            >
              View Chart
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default InputTicker;
