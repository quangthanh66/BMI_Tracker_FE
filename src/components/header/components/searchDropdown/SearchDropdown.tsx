import { BasePopover } from "@app/components/common/BasePopover/BasePopover";
import { HeaderActionWrapper } from "@app/components/header/Header.styles";
import { CategoryComponents } from "@app/components/header/components/HeaderSearch/HeaderSearch";
import { FilterIcon } from "components/common/icons/FilterIcon";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Btn, InputSearch } from "../HeaderSearch/HeaderSearch.styles";
import { SearchOverlay } from "./searchOverlay/SearchOverlay/SearchOverlay";

interface SearchOverlayProps {
  query: string;
  setQuery: (query: string) => void;
  data: CategoryComponents[] | null;
  isOverlayOpen: boolean;
  setOverlayOpen: (state: boolean) => void;
}

export const SearchDropdown: React.FC<SearchOverlayProps> = ({
  query,
  setQuery,
  data,
  isOverlayOpen,
  setOverlayOpen,
}) => {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    setOverlayOpen(!!query || isFilterOpen);
  }, [query, isFilterOpen, setOverlayOpen]);

  const ref = useRef<any>(null);

  return (
    <>
      <BasePopover
        {...((!!data || isFilterOpen) && {
          trigger: "click",
          onOpenChange: setOverlayOpen,
        })}
        overlayClassName="search-overlay"
        content={<SearchOverlay data={data} isFilterOpen={isFilterOpen} />}
        open={isOverlayOpen}
        getPopupContainer={() => ref.current}
      >
        <HeaderActionWrapper>
          <InputSearch
            width="100%"
            value={query}
            placeholder={t("header.search")}
            filter={
              <Btn
                size="small"
                type={isFilterOpen ? "ghost" : "text"}
                aria-label="Filter"
                icon={<FilterIcon />}
                onClick={() => setFilterOpen(!isFilterOpen)}
              />
            }
            onChange={(event) => setQuery(event.target.value)}
            enterButton={null}
            addonAfter={null}
          />
          <div ref={ref} />
        </HeaderActionWrapper>
      </BasePopover>
    </>
  );
};
