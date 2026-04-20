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
      <img src={imageUrl} alt={name} />

      <article>
        <h2>{name}</h2>
        <figure>
          <img
            src="/assets/icons/location-mark.svg"
            alt="Location Icon"
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>
      <div>
        {tags.map((tag, index) => (
          <span key={index} className="mt-10 pl-4 pr-2 text-sm">
            <span
              className={cn(
                `rounded-full px-2 py-1`,
                `${index === 1 ? "bg-pink-50 text-pink-500" : "bg-green-50 text-green-500"}`
              )}
            >
              {tag}
            </span>
          </span>
        ))}
      </div>
      <div className="tripCard-pill">{price}</div>
    </Link>
  );
};

export default TripCard;
