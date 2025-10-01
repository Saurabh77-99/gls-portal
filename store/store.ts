import { create } from "zustand";
import axios, { AxiosError } from "axios";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  links: string[];
}
interface Certification {
  name: string;
  issuer: string;
  year: number;
}
interface Contact {
  email: string;
  phone: string;
}
export interface Student {
  _id: string;
  name: string;
  branch: string;
  batch: string;
  semester: number;
  specialization: string;
  cgpa: number;
  achievements: string[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  contact: Contact;
  resumeUrl: string;
  profilePhoto: string;
  tags: string[];
}
interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  totalStudents: number;
}
interface PaginatedApiResponse {
  success: boolean;
  data: Student[];
  pagination: PaginationInfo;
  message?: string;
}

interface SearchApiResponse {
    success: boolean;
    data: Student[];
    count: number;
    query: string;
    message?: string; 
}

interface StudentState {
  students: Student[];
  page: number;
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  currentIndex: number;
  totalStudents: number;
  searchResults: Student[];
  searchQuery: string;
  searchLoading: boolean;
  searchError: string | null;
  isGridViewSelected:boolean,
  fetchStudents: () => Promise<void>;
  goToNextStudent: () => Promise<string | null>;
  goToPrevStudent: () => string | null;
  setCurrentStudentById: (id: string) => void;
  searchStudents: (query: string) => Promise<void>;
  toggleGridView: (isSelected: boolean) => void;
  clearSearch: () => void;
  reset: () => void; 
}


export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  page: 0,
  loading: false,
  hasMore: true,
  error: null,
  currentIndex: 0,
  totalStudents: 0,
  searchResults: [],
  searchQuery: '',
  searchLoading: false,
  searchError: null,
  isGridViewSelected : false,
  
  fetchStudents: async () => {
    const { loading, page, hasMore } = get();
    if (loading || !hasMore) return;
    set({ loading: true, error: null });
    try {
      const nextPageToFetch = page + 1;
      const response = await axios.get<PaginatedApiResponse>(`/api/students?page=${nextPageToFetch}&limit=10`);
      const result = response.data;
      if (!result.success) { throw new Error(result.message || 'API returned an error.'); }
      set(state => ({
        students: [...state.students, ...result.data],
        page: result.pagination.currentPage,
        hasMore: result.pagination.hasNextPage,
        totalStudents: result.pagination.totalStudents,
      }));
    } catch (err) {
      let errorMessage = 'Failed to fetch students.';
      if (axios.isAxiosError(err)) { errorMessage = (err as AxiosError<PaginatedApiResponse>).response?.data?.message || err.message; }
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  searchStudents: async (query: string) => {
    if (!query || query.trim().length === 0) {
      get().clearSearch();
      return;
    }
    set({ searchLoading: true, searchError: null, searchQuery: query, searchResults: [] });
    try {
      const response = await axios.get<SearchApiResponse>(`/api/students/search?q=${encodeURIComponent(query)}`);
      const result = response.data;
      if (!result.success) {
        throw new Error(result.message || 'Search API returned an error.');
      }
      set({ searchResults: result.data });
    } catch (err) {
      let errorMessage = 'Failed to search for students. Please try again.';
      if (axios.isAxiosError(err)) {
        errorMessage = (err as AxiosError<SearchApiResponse>).response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ searchError: errorMessage });
    } finally {
      set({ searchLoading: false });
    }
  },


  goToNextStudent: async () => {
    const { currentIndex, students, hasMore, loading } = get();
    if (loading) return null;
    const nextIndex = currentIndex + 1;
    if (nextIndex < students.length) {
      set({ currentIndex: nextIndex });
      return students[nextIndex]._id;
    } else if (hasMore) {
      await get().fetchStudents();
      const newStudents = get().students;
      if (nextIndex < newStudents.length) {
        set({ currentIndex: nextIndex });
        return newStudents[nextIndex]._id;
      }
    }
    return null;
  },

  goToPrevStudent: () => {
    const { currentIndex, students } = get();
    const prevIndex = Math.max(0, currentIndex - 1);
    if (prevIndex !== currentIndex) {
      set({ currentIndex: prevIndex });
      return students[prevIndex]._id;
    }
    return null;
  },
  
  setCurrentStudentById: (id: string) => {
    const studentIndex = get().students.findIndex(s => s._id === id);
    if (studentIndex !== -1) {
      set({ currentIndex: studentIndex });
    }
  },

  toggleGridView: (isSelected: boolean) => {
    set({ isGridViewSelected: isSelected });
  },

  clearSearch: () => {
    set({
      searchResults: [],
      searchQuery: '',
      searchLoading: false,
      searchError: null,
    });
  },

  reset: () => {
    set({
      students: [],
      page: 0,
      loading: false,
      hasMore: true,
      error: null,
      currentIndex: 0,
      totalStudents: 0,
      searchResults: [],
      searchQuery: '',
      searchLoading: false,
      searchError: null,
      isGridViewSelected: false,
    });
  },
}));