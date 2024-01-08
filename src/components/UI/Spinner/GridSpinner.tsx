import dynamic from 'next/dynamic';

type Props = {
  color?: string;
};

const GridLoader = dynamic(
  () => import('react-spinners').then(lib => lib.GridLoader),
  {
    ssr: false,
  }
);

export default function GridSpinner({ color = '#F63D38' }: Props) {
  return <GridLoader color={color} />;
}
