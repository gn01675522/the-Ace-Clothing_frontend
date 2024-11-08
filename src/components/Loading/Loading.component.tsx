import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <ReactLoading type="bubbles" color="white" height={60} width={100} />
      </div>
    </>
  );
};

export default Loading;
