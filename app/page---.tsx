import { counter1Selector, increase } from "@/app/store/slices/counter1Slice";
import { useAppDispatch } from "@/app/store/store";
import { useSelector } from "react-redux";
type Props = {};

function Page({}: Props) {
  const dispatch = useAppDispatch();
  const counter1Reducer = useSelector(counter1Selector);

  return (
    <div>
      <div>page1</div>
      <button
        onClick={() => {
          dispatch(increase());
        }}
      >
        counter - {counter1Reducer.counter}
      </button>
    </div>
  );
}

export default Page;
