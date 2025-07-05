import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ErrorMessage({ message }) {
  const { darkTheme } = useSelector(state => state.conditions);

  return (
    <div className={`px-6 py-8 text-lg font-semibold ${darkTheme ? "text-red-400 bg-black" : "text-red-600 bg-white"}`}>
      {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
