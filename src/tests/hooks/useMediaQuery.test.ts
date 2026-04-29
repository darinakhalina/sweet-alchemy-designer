import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from '@/hooks';
import { MEDIA } from '@/constants/breakpoints';

describe('useMediaQuery', () => {
  let listeners: Map<string, (e: MediaQueryListEvent) => void>;

  const createMql = (query: string, matches = false): MediaQueryList => {
    const mql = {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_event: string, handler: (e: MediaQueryListEvent) => void) => {
        listeners.set(query, handler);
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
    return mql as unknown as MediaQueryList;
  };

  beforeEach(() => {
    listeners = new Map();
    vi.mocked(window.matchMedia).mockImplementation((query: string) => createMql(query));
  });

  it('returns false when query does not match', () => {
    const { result } = renderHook(() => useMediaQuery(MEDIA.mobile));
    expect(result.current).toBe(false);
  });

  it('returns true when query matches', () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => createMql(query, true));

    const { result } = renderHook(() => useMediaQuery(MEDIA.mobile));
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    const { result } = renderHook(() => useMediaQuery(MEDIA.mobile));
    expect(result.current).toBe(false);

    act(() => {
      const handler = listeners.get(MEDIA.mobile);
      handler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it('removes listener on unmount', () => {
    const mql = createMql(MEDIA.mobile);
    vi.mocked(window.matchMedia).mockReturnValue(mql);

    const { unmount } = renderHook(() => useMediaQuery(MEDIA.mobile));
    unmount();
    expect(mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('works with all MEDIA constants', () => {
    for (const key of Object.keys(MEDIA) as (keyof typeof MEDIA)[]) {
      const { result } = renderHook(() => useMediaQuery(MEDIA[key]));
      expect(typeof result.current).toBe('boolean');
    }
  });
});
