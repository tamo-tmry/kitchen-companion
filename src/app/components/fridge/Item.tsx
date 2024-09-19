import { date, format } from "@formkit/tempo";

type FridgeItemProps = {
  item: FridgeItem;
};

export type FridgeItem = {
  name: string;
  expirationDate: string;
};

export default function FridgeItem({ item }: FridgeItemProps) {
  const dateString = format(item.expirationDate, "long");
  const dateTime = format(item.expirationDate, "YYYY-MM-DD");
  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <h2>{item.name}</h2>
        <time className="text-xs" dateTime={dateTime}>
          {dateString}
        </time>
      </div>
    </>
  );
}
