import { ClipLoader } from 'react-spinners';

const Loadercomp = ({ size }) => {
  const color = "#2E2D74";
  
  return (
<div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <ClipLoader
        color={color}
        loading={true}
        size={size ? size : 80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loadercomp;