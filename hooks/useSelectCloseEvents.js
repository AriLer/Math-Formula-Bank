import { useEffect } from "react";

function useSelectCloseEvents({ isOpen, setIsOpen, selectRef, dropdownRef }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        const handleClickOutside = (e) => {
            const isClickInsideSelect = selectRef.current?.contains(e.target);
            const isClickInsideDropdown = dropdownRef.current?.contains(e.target);

            if (!isClickInsideSelect && !isClickInsideDropdown) {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen, selectRef, dropdownRef]);
}

export default useSelectCloseEvents;