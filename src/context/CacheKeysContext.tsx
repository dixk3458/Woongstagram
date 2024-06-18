import { createContext, useContext } from 'react';

type CacheKeysValue = {
  postKey: string;
};

type Props = {
  children: React.ReactNode;
  value: CacheKeysValue;
};

const CacheKeysContext = createContext<CacheKeysValue>({
  postKey: '/api/posts',
});

export function CacheKeysContextProvider({ children, value }: Props) {
  return (
    <CacheKeysContext.Provider value={value}>
      {children}
    </CacheKeysContext.Provider>
  );
}

export const useCacheKeys = () => useContext(CacheKeysContext);
