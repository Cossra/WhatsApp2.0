import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useDebounce } from "./useDebounce";
import { useState } from "react";

export function useUserSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const searchResults = useQuery(
        api.users.searchUsers,
        debouncedSearchTerm.trim() ? { searchTerm: debouncedSearchTerm } : "skip"
    );

    return {
        searchTerm,
        setSearchTerm,
        searchResults: (searchResults || []) as Doc<"users">[],
        isLoading: searchResults === undefined && debouncedSearchTerm.trim() !== "",
    };
}