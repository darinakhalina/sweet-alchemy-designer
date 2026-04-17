import { createContext } from 'react';
import type { AuthModalContextValue } from './interfaces/AuthModalContextValue';

export const AuthModalContext = createContext<AuthModalContextValue | null>(null);
