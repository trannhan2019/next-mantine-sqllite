import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function usePhanTrang(total: number) {
    const searchParams = useSearchParams();
      const router = useRouter();
    
      // Lấy page và pageSize từ URL, nếu không có thì dùng mặc định
      const pageParam = parseInt(searchParams.get("page") || "1", 10);
      const pageSizeParam = parseInt(searchParams.get("pageSize") || "10", 10);
    
      const [currentPage, setCurrentPage] = useState(pageParam);
      const [pageSize, setPageSize] = useState(pageSizeParam);
    
      useEffect(() => {
        setCurrentPage(pageParam);
      }, [pageParam]);
    
      useEffect(() => {
        setPageSize(pageSizeParam);
      }, [pageSizeParam]);
    
      const totalPages = Math.ceil(total / pageSize);
    
      // const startIndex = (currentPage - 1) * pageSize;
      // const endIndex = Math.min(startIndex + pageSize, total);
      // const displayedUsers = data.slice(startIndex, endIndex);
    
      const updateParams = (page: number, size: number) => {
        const newSearch = new URLSearchParams();
        newSearch.set("page", String(page));
        newSearch.set("pageSize", String(size));
        router.push(`?${newSearch.toString()}`);
      };
    
      const handlePageChange = (page: number) => {
        updateParams(page, pageSize);
      };
    
      const handlePageSizeChange = (value: string | null) => {
        const newSize = parseInt(value || "10", 10);
        updateParams(1, newSize); // Reset về trang 1 khi thay đổi size
      };

      return {
        currentPage,
        pageSize,
        totalPages,
        handlePageChange,
        handlePageSizeChange,
      };
}
