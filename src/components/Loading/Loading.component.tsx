import ReactLoading from "react-loading";

import "./Loading.styles.scss";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <ReactLoading type="bubbles" color="white" height={200} width={200} />
      </div>
    </>
  );
};

export default Loading;
