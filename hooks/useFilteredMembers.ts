import { useMemo } from 'react';

interface Member {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  image?: string;
  // Additional filterable data will be loaded by SuggestionItem
}

interface FilterData {
  state?: string;
  city?: string;
  services?: string[];
  description?: string;
}

/**
 * Hook to filter members based on search input and selected filters
 */
export function useFilteredMembers(
  members: Member[],
  searchInput: string,
  selectedFilters: string[]
) {
  return useMemo(() => {
    if (!members || members.length === 0) {
      return [];
    }

    const normalizedSearch = searchInput.toLowerCase().trim();
    const states = ['São Paulo', 'Minas Gerais'];

    return members.filter((member) => {
      // Search input filter
      if (normalizedSearch) {
        const searchableText = `${member.name} ${member.description || ''}`.toLowerCase();
        if (!searchableText.includes(normalizedSearch)) {
          return false;
        }
      }

      // If no filters selected, show all
      if (selectedFilters.length === 0) {
        return true;
      }

      // Note: Service, city, and state filters require data from SuggestionItem
      // For now, we'll filter what we can (name/description)
      // The SuggestionItem component will handle additional filtering via CSS
      // This is a temporary solution until we refactor to load all data upfront
      
      return true; // Show all, let SuggestionItem handle detailed filtering
    });
  }, [members, searchInput, selectedFilters]);
}
