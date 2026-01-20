import React from "react";

const index = () => {
  return (
    <div className="containers">
      <div className="blurry-prev">
        <img src="hero/image1.jpg" />
        <div className="overlay"></div>
      </div>
      <div className="col site-info">
        <nav>
          <a href="#">home</a>
          <a href="#">work</a>
          <a href="#">contact</a>
        </nav>
        <div className="header">
          <h1>welcome to ktm</h1>
        </div>
        <div className="copy">
          <p>we are a full service creative agency deliverying innovatio</p>
        </div>
      </div>
      <div className="col projject-preview">
        <div className="project-details">
          <div className="title">
            <h1>Beyond the summit</h1>
          </div>
          <div className="info">
            <p>
              jon a team of elite mountainser as they attepm to climb the
              winter, a feat never bbeorfe accouplie. this braene documen
              captiure the raw beatuh of teh karkorma nd indomitable human
              spirit.
            </p>
          </div>
          <div className="credits">
            <p> Credits</p>
          </div>
          <div className="director">
            <p>Director :aliex homold</p>
          </div>
          <div className="cinimatographer">
            <p>cinimatographer:jimmy ch</p>
          </div>
        </div>

        <div className="project-img">
            <img src="hero/image2.jog"/>
        </div>
        <div className="gallery-wrapper">
            <div className="gallery"></div>
        </div>
      </div>
    </div>
  );
};

export default index;
