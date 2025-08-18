import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const useDropdownControl = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const params = useParams();

  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const onClickIsDropdownOpen = () => setIsDropdownOpen(!isDropdownOpen);

  const isMobileWidth = () => {
    if (window.innerWidth > 768) {
      setIsDropdownOpen(false);
    }
  };

  //* 解決螢幕寬度小於 768px 時開啟 Dropdownlist 後，切換到大於 768 後 isDropdownOpen 還是 true 的狀態
  useEffect(() => {
    window.addEventListener("resize", isMobileWidth);

    return () => {
      window.removeEventListener("resize", isMobileWidth);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      console.log("trigger click", dropdownRef.current);

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target.closest("#hamburger")
      ) {
        setIsDropdownOpen(false);
      }
    };
    const handlePressESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handlePressESC);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handlePressESC);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [params]);

  return {
    isDropdownOpen,
    dropdownRef,
    setIsDropdownOpen,
    onClickIsDropdownOpen,
  };
};
