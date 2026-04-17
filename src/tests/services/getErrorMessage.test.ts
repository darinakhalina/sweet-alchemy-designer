import { getErrorMessage } from '@/services/helpers/getErrorMessage';
import type { ApiError } from '@/services/interfaces/ApiError';

const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'errors.dessertsFetchFailed': 'Failed to load desserts.',
    'errors.unknown': 'Something went wrong.',
  };
  return translations[key] ?? key;
});

describe('getErrorMessage', () => {
  it('returns translated message for known error code', () => {
    const error: ApiError = { code: 'dessertsFetchFailed', message: 'Server error', status: 500 };
    expect(getErrorMessage(error, mockT)).toBe('Failed to load desserts.');
  });

  it('falls back to unknown error for unrecognized code', () => {
    const error: ApiError = { code: 'somethingNew', message: 'Unexpected', status: 500 };
    expect(getErrorMessage(error, mockT)).toBe('Something went wrong.');
  });
});
