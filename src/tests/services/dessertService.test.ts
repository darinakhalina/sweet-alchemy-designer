import { fetchDessertsFromApi, fetchDessertsWithError } from '@/services/dessertService';

describe('dessertService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('fetchDessertsFromApi', () => {
    it('resolves with an array of 3 desserts', async () => {
      const promise = fetchDessertsFromApi();
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result).toHaveLength(3);
    });

    it('each dessert has required fields', async () => {
      const promise = fetchDessertsFromApi();
      vi.advanceTimersByTime(1000);
      const result = await promise;

      result.forEach((dessert) => {
        expect(dessert).toHaveProperty('id');
        expect(dessert).toHaveProperty('name');
        expect(dessert).toHaveProperty('description');
        expect(dessert).toHaveProperty('cookingTime');
      });
    });
  });

  describe('fetchDessertsWithError', () => {
    it('rejects with an error', async () => {
      const promise = fetchDessertsWithError();
      vi.advanceTimersByTime(1000);

      await expect(promise).rejects.toThrow('Server error');
    });
  });
});
