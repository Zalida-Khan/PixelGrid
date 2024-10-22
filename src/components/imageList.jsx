import './imageList.css'
import ImageShow from './imageShow';

function ImageList({ images }) {
  const renderedImages = images.map((image) => {
    return <ImageShow key={image.id} image={image} />;
  });

  return <div className="image-List">{renderedImages}</div>;
}

export default ImageList;
