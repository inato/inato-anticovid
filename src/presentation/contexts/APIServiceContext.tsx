import React, { useContext } from 'react';

import { APIService } from '../../application';

export const APIServiceContext = React.createContext<APIService>(
  undefined as any,
);

export const useAPIServiceContext = () => {
  return useContext(APIServiceContext);
};
