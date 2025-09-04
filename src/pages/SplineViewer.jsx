import React, { useEffect } from "react";

const SplineViewer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.10.3/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <spline-viewer
        url="https://my.spline.design/100followers-nwiO6VNX63S1lQY8mE36upS2/"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></spline-viewer>
    </div>
  );
};

export default SplineViewer;
