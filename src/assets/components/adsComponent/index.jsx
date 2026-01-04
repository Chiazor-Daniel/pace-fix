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
    <div style={{ overflow: "hidden", clear: "both", margin: "10px 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={"ca-pub-3536158399576400"}
        data-ad-slot={dataAdSlot}
        data-ad-format={"horizontal, rectangle"}
        data-full-width-responsive={"false"}
      />
    </div>
  );
};

export default AdsComponent;