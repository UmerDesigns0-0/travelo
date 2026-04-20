import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/myutils";
import { Header, SearchBar, TripCard } from "components/index";
import { useNavigate } from "react-router";
import { cn } from "~/lib/myutils";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import TripsFilterModal from "components/TripsFilterModal";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  // const limit = Number(url.searchParams.get("limit") || "8");
  const limit = 8;
  const page = Number(url.searchParams.get("page") || "1");
  const offset = (page - 1) * limit;

  const { allTrips, total } = await getAllTrips({ limit, offset });

  return {
    allTrips: allTrips?.map(({ $id, tripDetails, imageUrls }: any) => ({
      id: $id,
      ...parseTripData(tripDetails),
      imageUrls: imageUrls ?? [],
    })),
    total,
    limit,
    page,
  };
};

const Trips = () => {
  const { allTrips, total, limit, page } = useLoaderData() as {
    allTrips: Trip[];
    total: number;
    limit: number;
    page: number;
  };

  const navigate = useNavigate();

  const getPaginationRange = (
    current: number,
    total: number,
    windowSize: number = 4,
  ) => {
    const range: number[] = [];

    // Determine start of window
    let start = Math.max(1, current - Math.floor(windowSize / 2));

    // Prevent overflow at end
    if (start + windowSize - 1 > total) {
      start = Math.max(1, total - windowSize + 1);
    }

    const end = Math.min(total, start + windowSize - 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const totalPages = Math.ceil(total / limit);
  const paginationRange = getPaginationRange(page, totalPages);

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  const goToPage = (p: number) => {
    if (p === page || p > totalPages || p < 1) return;
    navigate(`/trips?limit=${limit}&page=${p}`);
  };

  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View and edit AI generated travel plans"
        ctaText="Create Trip"
        ctaUrl="/trips/create"
      />
      <section className="mx-auto">
        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <form className="w-3/4 md:w-1/2">
            <SearchBar
              id="Trips"
              placeholder="Search Trips..."
              label="Search trips"
              onChange={() => {}}
              buttonText="Search"
            />
          </form>
          <div>
            <TripsFilterModal />
          </div>
        </div>

        {total === 0 && (
          <h1 className="text-center mt-28 text-muted-foreground text-xl">
            No trips found
          </h1>
        )}
        <div className="trip-grid-tripsPage">
          {allTrips.map(
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
      </section>
      {/* <section>
        <span>
          Showing page {page} of {totalPages} pages
        </span>
      </section> */}

      {/* Pagination */}
      {Number(totalPages) > 1 && (
        <section className="flex justify-around items-center gap-2 mb-10">
          <div className="flex justify-center items-center gap-2 text-slate-700">
            <button
              disabled={isFirstPage}
              onClick={() => goToPage(1)}
              className="px-4 py-2 rounded-sm bg-slate-200 hover:bg-slate-300 cursor-pointer disabled:cursor-default disabled:opacity-50"
            >
              <MdOutlineKeyboardDoubleArrowLeft size={20} />
            </button>
            <button
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="hidden md:block px-4 py-2 rounded-sm bg-slate-200 hover:bg-slate-300 cursor-pointer disabled:cursor-default disabled:opacity-50"
            >
              <MdOutlineKeyboardArrowLeft size={20} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2">
            {paginationRange.map((item, index) => (
              <button
                key={index}
                disabled={item === page}
                onClick={() => {
                  typeof item === "number" && goToPage(item);
                  console.log(item);
                }}
                className={cn(
                  "px-4 py-2 rounded-sm cursor-pointer transition",
                  item === page
                    ? "bg-blue-500 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 text-slate-700">
            <button
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              className="hidden md:block px-4 py-2 rounded-sm cursor-pointer bg-slate-200 hover:bg-slate-300 disabled:cursor-default disabled:opacity-50"
            >
              <MdOutlineKeyboardArrowRight size={20} />
            </button>
            <button
              disabled={isLastPage}
              onClick={() => goToPage(totalPages)}
              className="px-4 py-2 rounded-sm cursor-pointer bg-slate-200 hover:bg-slate-300 disabled:cursor-default disabled:opacity-50"
            >
              <MdOutlineKeyboardDoubleArrowRight size={20} />
            </button>
          </div>
        </section>
      )}
    </main>
  );
};
export default Trips;
