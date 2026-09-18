import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';

// Fetches the live, admin-managed category list for a given type
// ('product' | 'project' | 'blog') instead of a hardcoded array.
export const useCategories = (type) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    setLoading(true);
    return api
      .get(`/api/categories?type=${type}`)
      .then(setCategories)
      .finally(() => setLoading(false));
  }, [type]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { categories, loading, refetch };
};
