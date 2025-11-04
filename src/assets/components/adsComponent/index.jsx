import { useEffect } from "react";

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("Error showing ads");
      console.error(e);
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={"ca-pub-3536158399576400"}
        data-ad-slot={dataAdSlot}
        data-ad-format={"auto"}
        data-full-width-responsive={"true"}
      />
    </>
  );
};

export default AdsComponent;