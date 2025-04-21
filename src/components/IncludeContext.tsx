import { createContext } from 'react';

type IncludeContextProp = {
  url: string;
  showTitle: boolean;
  visited: Set<string>;
};

const initialContext: IncludeContextProp = {
  url: null,
  showTitle: false,
  visited: new Set<string>(),
};

export const IncludeContext = createContext(initialContext);
