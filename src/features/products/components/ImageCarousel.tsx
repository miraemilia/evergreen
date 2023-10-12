import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardMedia } from "@mui/material";

type ImageCarouselProps = {
    images : string[]
}

export const ImageCarousel = ({ images } : ImageCarouselProps) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1
        }

  return (
    <Slider {...settings}>
        {images.map(image => <Card key={image}><CardMedia component='img' image={image}/></Card>)}
    </Slider>
  )
}
