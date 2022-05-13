import React, { useEffect, useState } from "react";
import {
  Heading,
  Text,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  GridItem,
} from "@chakra-ui/react";
import { possibleStates, Card } from "../Admin";

export default function StatsCard({ setStatus }) {
  const [statusData, setStatusData] = useState(null);
  const [dataInterval, setDataInterval] = useState(null);

  let fetchStatusData = () => {
    fetch("/status", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.server.uptime > 100) {
          setStatus(possibleStates.smooth);
        } else {
          setStatus(possibleStates.mild);
        }
        setStatusData(response);
      })
      .catch((err) => {
        setStatus(possibleStates.bad);
      });
  };

  // fetch the status data on start
  useEffect(() => {
    fetchStatusData();
    // the interval is in a loop to make it easy to clean up once we unmount the component
    let intervalVal = setInterval(fetchStatusData, 10000)
    setDataInterval(intervalVal); // fetch the status data every 10 seconds.
    return () => {
      clearInterval(dataInterval);
    };
  }, []);

  return (
    <>
      <GridItem colSpan={1} rowSpan={1}>
        <Card>
          <Heading size="md">Requests:</Heading>
          <Skeleton isLoaded={statusData !== null}>
            {statusData !== null ? (
              <>
                <Stat>
                  <StatLabel>Total number of requests</StatLabel>
                  <StatNumber>{statusData.server.requests.total}</StatNumber>
                  <StatHelpText>Total number of requests.</StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Last 5 minutes avg. requests</StatLabel>
                  <StatNumber>
                    {statusData.server.requests.last_5mn_avg}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow
                      type={
                        statusData.server.requests.last_minute <
                        statusData.server.requests.last_5mn_avg
                          ? "increase"
                          : "decrease"
                      }
                    />
                    Avg. number of requests in the last 5 minutes compared to
                    the last minute.
                  </StatHelpText>
                </Stat>
              </>
            ) : (
              <Text>Loading</Text>
            )}
          </Skeleton>
        </Card>
      </GridItem>

      <GridItem colSpan={1} rowSpan={1}>
        <Card>
          <Heading size="md">Server stats:</Heading>
          <Skeleton isLoaded={statusData !== null}>
            {statusData !== null ? (
              <>
                <Stat>
                  <StatLabel>Uptime</StatLabel>
                  <StatNumber>{statusData.server.uptime_human}</StatNumber>
                  <StatHelpText>
                    Time since the last server restart.
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Time started</StatLabel>
                  <StatNumber>{statusData.server.startedat_human}</StatNumber>
                  <StatHelpText>Time of the last restart.</StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Memory usage</StatLabel>
                  <StatNumber>{statusData.node.memoryUsage}</StatNumber>
                  <StatHelpText>
                    Total memory usage of the server program.
                  </StatHelpText>
                </Stat>
              </>
            ) : (
              <Text>Loading</Text>
            )}
          </Skeleton>
        </Card>
      </GridItem>
    </>
  );
}
