import Carousel from 'react-bootstrap/Carousel';

export const LayoutTypeImagesLeft = "images-left"
export const LayoutTypeImagesRight = "images-right"

export function Project({data, layoutType}) {

  const { title, slug, company, dates, images, bullets } = data;

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const imageColumns = data.imageFormat == "portrait" ? 3 : 6
  const bulletColumns = 12 - imageColumns

  const getBullets = () => {
   return (
      <div className={"col-sm-" + bulletColumns}>
        <ul>
          {bullets.map((bullet, index) => (
            <li key={slug + "_" + index} dangerouslySetInnerHTML={createMarkup(bullet)}></li>
          ))}
        </ul>
      </div>
    )
  }

  const getCarousel = () => {
    return (
      <div className={"col-sm-" + imageColumns}>
        <Carousel prevLabel="" nextLabel="" controls={images.length > 1} indicators={images.length > 1}>
          {images.map((image, index) => (
            <Carousel.Item key={slug + "_img_" + index}>
              <img src={image.src} className="d-block w-100" alt={image.title}/>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    )
  }

  return (
    <div className="container" id={"project-"+slug}>
      <div className="row">
        <h2>{title}</h2>
      </div>
      <div className="row">
        <h3>{company} | {dates}</h3>
      </div>
      <div className="row">
        {
          layoutType === LayoutTypeImagesLeft ? (
            [getCarousel(), getBullets()]
          ) : (
            [getBullets(), getCarousel()]
          )
        }
      </div>
    </div>
  );
}
