const InfoPill = ({ image, text }: InfoPillProps) => {
  return (
    <figure>
      <img src={image} alt={text} />
      <figcaption>{text}</figcaption>
    </figure>
  );
};

export default InfoPill;
