'use client'

import { useMemo } from 'react';

export const useUniqueId = (prefix: string) => useMemo(
  () => `${prefix}-${new Date().getTime()}${Math.random()}`.replace('.', ''),
  [prefix],
);