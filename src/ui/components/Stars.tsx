import { StarIcon } from "./Icons";

const Stars = ({ rating }: { rating: number }) => (
   <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} filled={i <= rating} />)}
   </div>
);

export default Stars;