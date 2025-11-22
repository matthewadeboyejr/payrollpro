import { ImSpinner2 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center text-accent animate-spin text-2xl text-white">
      <ImSpinner2 className="text-white" />
    </div>
  );
};

export default Spinner;
