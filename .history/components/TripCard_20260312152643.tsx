import { Link, useLocation } from "react-router";
import { cn } from "~/lib/myutils";

type TripCardProps = {
  id?: string;
  name?: string;
  location?: string;
  imageUrl?: string;
  tags?: string[];
  price?: string;
  isLoading?: boolean; // <-- new prop
};

const TripCard = ({
  id,
  name,
  location,
  imageUrl,
  tags = [],
  price,
  isLoading = false,
}: TripCardProps) => {
  const path = useLocation();

  // If loading, render skeleton
  if (isLoading) {
    return (
      <div className="trip-card animate-pulse">
        <div className="overflow-hidden w-full h-60 lg:h-46 rounded-t-xl bg-slate-200" />
        <article className="p-4 space-y-2">
          <div className="h-5 w-3/4 bg-slate-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-slate-200 rounded-full" />
            <div className="h-4 w-1/2 bg-slate-200 rounded" />
          </div>
        </article>
        <div className="flex flex-wrap gap-2 mx-4 mt-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-14 bg-slate-200 rounded-full"
            />
          ))}
        </div>
        <div className="h-6 w-20 mx-4 mt-2 bg-slate-200 rounded-full" />
      </div>
    );
  }

  // Normal content
  return (
    <Link
      to={`${path.pathname === "/" || path.pathname.startsWith("/travel")
        ? `/travel/${id}`
        : `/trips/${id}`
      }`}
      className="trip-card"
    >
      <div className="overflow-hidden w-full h-60 lg:h-46 rounded-t-xl hover:rounded-t-xl">
        <img draggable="false" src={imageUrl} alt={name} />
      </div>

      <article>
        <h2 title={name}>{name}</h2>
        <figure className="flex items-center gap-1">
          <img
            src="/assets/icons/location-mark.svg"
            alt="Location Icon"
            className="size-4"
          />
          <figcaption className="line-clamp-1" title={location}>
            {location}
          </figcaption>
        </figure>
      </article>

      <div className="flex flex-wrap gap-2 mx-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "inline-flex text-sm rounded-full px-2 py-1",
              index === 1
                ? "bg-pink-50 text-pink-500"
                : "bg-green-50 text-green-500",
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="tripCard-pill">{price}</div>
    </Link>
  );
};

export default TripCard;