import { title } from "process";
import React from "react";
import index from "../feature12";

const data = [
  {
    title: "way of the warrior",
    copy: "immerse yourself in the ancient tradition",
    director: "hirokazu kore-eda",
    cinematographer: "yutaro kondo",
  },
  {
    title: "echoes of silence",
    copy: "a quiet journey through forgotten memories",
    director: "wong kar-wai",
    cinematographer: "christopher doyle",
  },
  {
    title: "beyond the horizon",
    copy: "where ambition meets the edge of the world",
    director: "denis villeneuve",
    cinematographer: "roger deakins",
  },
  {
    title: "shadows of time",
    copy: "past and present collide in fleeting moments",
    director: "paolo sorrentino",
    cinematographer: "luca bigazzi",
  },
  {
    title: "dance of the wind",
    copy: "movement, rhythm, and untamed freedom",
    director: "akira kurosawa",
    cinematographer: "kazuo miyagawa",
  },
  {
    title: "fragments of light",
    copy: "small stories hidden in everyday lives",
    director: "sofia coppola",
    cinematographer: "philippe le sourd",
  },
];

const feature13 = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery");
    const blurryPrev = document.querySelector(".blurry-prev");
    const projectPreview = document.querySelector(".project-preview");
    const itemCount = data.length;

    let activeItemIndex = 0;
    let isAnimating = false;

    function createSplitText(element) {
      const splitText = new SplitType(element, { types: "lines" });
      element.innerHTML = "";
      splitText.lines.forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "line";
        const lineSpan = document.createElement("span");
        lineSpan.textContent = line.textContent;
        lineDiv.appendChild(lineSpan);
        element.appendChild(lineDiv);
      });
    }

    const initialInfoText = document.querySelector(".info p");
    if (initialInfoText) {
      createSplitText(initialInfoText);
    }

    const elementsToAnimate = document.querySelectorAll(
      ".title h1, .info p, line span, .credits p , .director p, .cinematographer p",
    );

    gsap.set(elementsToAnimate, {
      y: 0,
    });

    for (let i = 0; i < itemCount; i++) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      if (i === 0) itemDiv.classList.add("active");

      const img = document.createElement("img");
      img.src = `/hero/image${i + 1}.jpg`;
      img.alt = galleryItems[i].title;

      itemDiv.appendChild(img);
      itemDiv.dataset.index = i;
      itemDiv.addEventListener("click", () => handleItemClick(i));
      gallery?.appendChild(itemDiv);
    }

    function createElementWithClass(tag, className) {
      const element = document.createElement(tag);
      element.classList.add(className);
      return element;
    }

    function createProjectDetails(activeItem, index) {
      const newProjectDetails = createElementWithClass(
        "div",
        "project-details",
      );

      const detailsStructure = [
        { className: "title", tag: "h1", content: activeItem.title },
        { className: "info", tag: "p", content: activeItem.copy },
        { className: "credits", tag: "p", content: "credits" },
        {
          className: "director",
          tag: "p",
          content: `Director: ${activeItem.director}`,
        },
        {
          className: "cinematographer",
          tag: "p",
          content: `cinematographer: ${activeItem.cinematographer}`,
        },
      ];
    }

    detailsstructure.forEach(({ className, tag, content }) => {
      const div = createElementWithClass("div", className);
      const element = document.createElement(tag);
      element.textcontent = content;
      div.appendchild(element);
      newProjectDetails.appendChild(div);
    });

    const newProjectImg = createElementWithClass("div", "project-img");
    const newImg = document.createElement("img");
    newImg.src = `/hero/image${index + 1}.jpg`;
    newImg.alt = activeItemIndex.title;
    newProjectImg.appendChild(newImg);

    return {
      newProjectDetails,
      newProjectImg,
      infoP: newProjectDetails.querySelector(".info p"),
    };

    function handleItemClick(index) {
      if (index == activeItemIndex || isAnimating) return;

      isAnimating = true;

      const activeItem = galleryItems[index];

      gallery?.children[activeItemIndex].classList.remove("active");
      gallery.children[index].classList.add("active");

      activeItemIndex = index;

      const elementsToAnimate = document.querySelectorAll(
        ".title h1, .info p , .line span, .credits p, .director p, .cinematographer p",
      );

      const currentProjectImg = document.querySelector(".project-img");

      const newBlurryImg = document.createElement("img");
      newBlurryImg.src = `/hero/image${intex + 1}.jpg`;
      newBlurryImg.alt = activeItem.title;
      gsap.set(newBlurryImg, {
        opacity: 0,
        position: "absolute",
        tip: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      });

      blurryPrev?.insertBefore(newBlurryImg, blurryPrev.firstChild);

      const currentBlurryImg = blurryPrev?.querySelector("img:nth-child(2)");
      if (currentBlurryImg) {
        gsap.to(currentBlurryImg, {
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          onComplete: () => blurryPrev?.removeChild(currentBlurryImg),
        });
      }

      gsap.to(newBlurryImg, {
        delay: 0.5,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      });

      gsap.to(elementsToAnimate, {
        y: -60,
        duration: 1,
        ease: "power4.in",
        stagger: 0.05,
      });

      gsap.to(currentProjectImg,{
        onStart:()=>{
            gsap.to(currentProjectImgElem,{
                scale:2,
                duration:1,
                ease:"power4.in",
            });
        },
        scale:0,
        bottom:"10em",
        duration:1,
        ease:"power4.in"
        onComplete:()=>{
            document.querySelector(".project-details")?.remove();
            currentBlurryImg?.remove();

            const { newProjectDetails,newProjectImg, infoP}=createProjectDetails(activeItem,index);

            projectPreview?.appendChild(newProjectDetails);
            projectPreview?.appendChild(newProjectImg);

            createSplitText;(infoP);
            const newElementsToAnimate = newProjectDetails.querrySelectorAll(".title h1, .info p .line span, .credits p, .director p, .cinematographer p");

            gsap.fromTo(newElementsToAnimate, {y:40},{
                y:0,
                duration:1,
                ease:"power4.out",
                stagger:0.05
            })

            gsap.fromTo(newProjectImg,{
                scale:0,
                bottom:"-10em"
            },{
                scale:1,
                bottom:"1em",
                duration:1,
                ease:"power4.out"
            })


            gsap.fromTo(newProjectImg.querySelector("img"),{
                scale:2,
            },{
                scale:1,
                duration:1,
                ease:"power4.out",
                onComplete:()=>{
                    isAnimating= false
                }
            })

        }
      })
    }
  });
  return (
    <div className="containers">
      <div className="blurry-prev">
        <img src={"/hero/image1.jpg"} />
        <div className="overlay"></div>
      </div>
      <div className="col site-info">
        <nav>
          <a href="#">Home</a>
          <a href="#">Work</a>
          <a href="#">Contact</a>
        </nav>
        <div className="header">
          <h1>welcome to Galler</h1>
        </div>
        <div className="copy">
          <p>we are a full-service creative soleution</p>
        </div>
      </div>
      <div className="col project-preview">
        <div className="project-details">
          <div className="title">beyond</div>
          <div className="info">
            <p>join a team of elite mount:</p>
          </div>
          <div className="credits">
            <p>credit :some thing</p>
          </div>

          <div className="director">
            <p>director:rockey</p>
          </div>
          <div className="cinematographer">cinematographer:rockeyr</div>
        </div>
        <div className="project-img">
          <img src={"/hero/image1.jpg"} />
        </div>
      </div>
      <div className="gallery-wrapper">
        <div className="gallery"></div>
      </div>
    </div>
  );
};

export default feature13;
