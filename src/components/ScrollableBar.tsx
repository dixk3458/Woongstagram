import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type Props = {
  children: React.ReactNode;
};

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 576 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 4,
  },
};

export default function ScrollableBar({ children }: Props) {
  return (
    <Carousel
      containerClass="w-full flex justify-start items-center gap-4"
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
}
