"use client";

import React, { useState, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { assettimeline } from "@/app/api/asset/asset";

export const TimelineAsset = ({ value }: { value: number }) => {
  const [lvasset, setLvasset] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const listasset = await assettimeline(value);
        setLvasset(listasset.result.data);
      } catch (error) {
        console.error("Error fetching asset timeline:", error);
      }
    }

    fetchData();
  }, [lvasset]);
  let maxKey = 0;
  return (
    <>
      {lvasset.map((rs: any, key: any) => {
        maxKey =lvasset.length-1;
        return (
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
            key={key}
          >
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                {rs.Entrydate}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {key!== maxKey ? <TimelineConnector /> : null}
              </TimelineSeparator>
              <TimelineContent>{rs.Detail}</TimelineContent>
            </TimelineItem>
          </Timeline>
        );
      })}
    </>
  );
};

/*
<Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {lvasset.map((ind:string, key:any) => (
        <TimelineItem key={key}>
          <TimelineOppositeContent color="textSecondary">
            {ind?.result?.data?.Entrydate}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{ind?.result?.data?.Detail}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
*/
