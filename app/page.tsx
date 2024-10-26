import React from "react";
import Filter from "@/components/feed/Filter";
import Ads from "@/components/feed/Ads";
import Feed from "@/components/feed/Feed";

const page = () => {
  return (
    <div className="flex items-center justify-center h-[100lvh] pt-[4.8rem] overflow-clip">
      <Filter />
      <Feed />
      <Ads />
    </div>
  );
};

export default page;
