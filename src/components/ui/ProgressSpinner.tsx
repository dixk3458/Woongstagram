import dynamic from 'next/dynamic';

const ProgressBar = dynamic(
  () => import('react-loader-spinner').then(lib => lib.ProgressBar),
  {
    ssr: false,
  }
);

export default function ProgressSpinner() {
  return (
    <div className="flex justify-center">
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        borderColor="#BEB4FD"
        barColor="#F1ABDE"
        ariaLabel="progress-bar-loading"
      />
    </div>
  );
}
