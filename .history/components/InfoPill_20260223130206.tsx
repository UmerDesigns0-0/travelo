const InfoPill = ({ image, text }: InfoPillProps) => {
  return (
    <figure className="info-pill">
      <img src={image} alt={text} />
      <figcaption className="truncate" title={text}>{text}</figcaption>
    </figure>
  );
};

export default InfoPill;
