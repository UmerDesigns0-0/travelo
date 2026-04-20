import { Link, useLocation } from "react-router";
import { cn } from "~/lib/myutils";

const TripCard = ({
  id,
  name,
  location,
  imageUrl,
  tags,
  price,
}: TripCardProps) => {
  const path = useLocation();
  return (
    <Link
      to={`${path.pathname === "/" || path.pathname.startsWith("/travel") ? `/travel/${id}` : `/trips/${id}`}`}
      className="trip-card"
    >
      <div className="overflow-hidden w-full h-60 lg:h-46 rounded-t-xl hover:rounded-t-xl">
        <img draggable="false" src={imageUrl} alt={name} />
      </div>

      <article>
        <h2 title={name}>{name}</h2>
        <figure>
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
              " text-sm rounded-full px-2 py-1",
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
