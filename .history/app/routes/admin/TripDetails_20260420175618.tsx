import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { getTripById, getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/myutils";
import { Header, TripCard } from "components/index";
import { InfoPill } from "components/index";
import { cn } from "~/lib/myutils";
import { Link } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;
  if (!tripId) {
    throw new Error("No tripId provided");
  }

  const [trip, trips] = await Promise.all([
    getTripById(tripId),
    // call getAllTrips with an object since signature changed
    getAllTrips({ limit: 4, offset: 0 }),
  ]);

  if (!trips) {
    throw new Error("No trips found");
  }

  return {
    trip,
    allTrips: trips.allTrips?.map(({ $id, tripDetails, imageUrls }: any) => ({
      id: $id,
      ...parseTripData(tripDetails),
      imageUrls: imageUrls ?? [],
    })),
  };
};

const TripDetails = () => {
  const rawData = useLoaderData() as any;
  // DB stores generated trip JSON in `tripDetails` (string). parseTripData handles string or object.
  const trip = parseTripData(
    (rawData?.trip?.tripDetails as Trip | []) ?? rawData?.trip,
  );
  const tripId = rawData?.trip?.$id ?? "";
  const {
    name,
    duration,
    itinerary,
    travelStyle,
    interests,
    budget,
    groupType,
    country,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
  } = trip ?? {};

  const allTrips = rawData?.allTrips ?? [];

  const imageUrls = (rawData?.trip?.imageUrls as string[]) ?? [];

  const pillItems = [
    { text: travelStyle },
    { text: interests },
    { text: budget },
    { text: groupType },
  ];

  const visitTimeAndWeather = [
    { title: "Best time to visit", item: bestTimeToVisit },
    { title: "Weather info", item: weatherInfo },
  ];

  return (
    <main className="travel-detail wrapper">
      <Header
        title="Trip Details"
        description="View and edit AI generated travel plans"
      />
      <section className="container wrapper-md">
        <header>
          {/* title */}
          <h3 className="text-dark-100 p-24-semibold cursor-default">{name}</h3>

          {/* duration & location */}
          <div className="flex flex-wrap gap-4 items-center cursor-default">
            <InfoPill
              image="/assets/icons/calendar.svg"
              text={`${duration} day plan`}
            />
            <InfoPill
              image="/assets/icons/location-mark.svg"
              text={
  itinerary
    ?.map((item) => item.location)
    .filter((loc, i, arr) => loc !== arr[i - 1])
    .slice(0, 2)
    .join(", ") || ""
}
            />
          </div>
        </header>

        {/* gallery */}
        <section className="gallery">
          {imageUrls.slice(0, 3).map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt={name}
              className={cn(
                "w-full object-cover rounded-xl transition ease-in-out duration-300 hover:scale-[1.02] hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.6)]",
                i === 0
                  ? "md:col-span-2 row-span-2 h-82.5"
                  : "md:col-span-1 h-37.5",
              )}
            />
          ))}
        </section>

        {/* pill items */}
        <section>
          <p className="flex flex-wrap items-center gap-2 wrap-break-word">
            {pillItems.map((item, i) => (
              <span
                key={i}
                className={cn(
                  "info-pill w-fit rounded-2xl text-white px-4 py-1.5 text-sm font-semibold transition-colors ease-in-out duration-300 cursor-default",
                  i === 0
                    ? "bg-pink-200 text-pink-500 hover:drop-shadow-[0_0_10px_rgba(255,105,180,0.5)]"
                    : i === 1
                      ? "bg-green-200 text-green-500 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                      : i === 2
                        ? "bg-blue-200 text-blue-500 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        : i === 3
                          ? "bg-purple-200 text-purple-500 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                          : "",
                )}
              >
                {item.text}
              </span>
            ))}
          </p>
        </section>

        {/* sub-title */}
        <section className="title">
          <article>
            <h3 className="text-dark-200 text-xl font-medium">
              {duration}-Day {country} {travelStyle}
            </h3>
            <p className="text-base text-muted-foreground">
              {budget} , {groupType} and {interests}
            </p>
          </article>
          <p className="font-medium text-dark-200">{estimatedPrice}</p>
        </section>
        {/* description */}
        <p className="text-dark-400">{description}</p>
        {/* itinerary */}
        <ul className="itinerary">
          {itinerary?.map((item, i) => {
            const dayStr = String(item.day);

            return (
              <li key={i}>
                <h3 className="text-lg text-dark-300">
                  {dayStr.includes("-") ? `Days ${dayStr}:` : `Day ${dayStr}:`}{" "}
                  {item.location}
                </h3>
                <ul>
                  {item.activities.map((activity, i) => (
                    <li key={i} className="text-dark-400 text-base">
                      <span className="font-semibold shrink-0 wrap-break-word">
                        {activity.time}
                      </span>
                      <p className="grow">{activity.description}</p>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        {/* time and weather info */}
        {visitTimeAndWeather.map((section, i) => (
          <section className="visit" key={i}>
            <h3 className="text-lg font-medium text-dark-300">
              {section.title}
            </h3>
            <ul>
              {section.item?.map((item, i) => (
                <li key={i} className="text-dark-400 text-base">
                  <p className="grow">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Popular Trips */}
        <section className="flex flex-col gap-6">
          <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
          <div className="trip-grid-allTrips">
            {allTrips
              .filter((trip: Trip) => trip.id !== tripId)
              .slice(0, 3)
              .map(
                ({
                  id,
                  name,
                  imageUrls,
                  itinerary,
                  interests,
                  travelStyle,
                  estimatedPrice,
                }: Trip) => (
                  <TripCard
                    id={id}
                    key={id}
                    name={name}
                    imageUrl={imageUrls[0]}
                    tags={[interests, travelStyle]}
                    location={itinerary[0]?.location ?? ""}
                    price={estimatedPrice}
                  />
                ),
              )}
          </div>
          <Link to={'/trips'} className="flex justify-center">
          <button className="py-3 px-8 text-center text-white text-sm rounded-md bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer">
            View All
          </button></Link>
        </section>
      </section>
    </main>
  );
};

export default TripDetails;
