import Card from "@/custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  return (
    <>
      <section className="my-6 xs:my-8">
        <h3 className="text-[#111] text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold mb-4 xs:mb-6">
          Featured Auctions
        </h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6">
          {allAuctions.slice(0, 8).map((element) => {
            return (
              <Card
                title={element.title}
                imgSrc={element.image?.url}
                startTime={element.startTime}
                endTime={element.endTime}
                startingBid={element.startingBid}
                id={element._id}
                key={element._id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FeaturedAuctions;
