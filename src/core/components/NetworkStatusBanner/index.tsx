import { FC } from 'react';
import { useNetworkStatus } from '@/core/hooks/useNetworkStatus';

const NetworkStatusBanner: FC = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="w-full bg-[#FFF3CD] border-b border-[#FFE69C] px-4 py-3 text-center">
      <p className="text-app-black font-inter text-sm/[22px] font-semibold">
        No hay conexión. Algunas acciones no podrán completarse.
      </p>
    </div>
  );
};

export default NetworkStatusBanner;

