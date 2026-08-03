import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { cities as initialCities } from "./CitiesData";
import type { CityData } from "./CitiesData";

interface PositionContextType {
  cities: CityData[];

  updateCity: (
    city: string,
    x: number,
    y: number
  ) => void;
}

const PositionContext =
  createContext<PositionContextType | null>(null);

export function PositionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cities, setCities] =
    useState<CityData[]>(initialCities);

  const updateCity = (
    city: string,
    x: number,
    y: number
  ) => {
    setCities((prev) =>
      prev.map((item) =>
        item.city === city
          ? {
              ...item,
              x,
              y,
            }
          : item
      )
    );
  };

  const value = useMemo(
    () => ({
      cities,
      updateCity,
    }),
    [cities]
  );

  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition() {
  const context = useContext(PositionContext);

  if (!context) {
    throw new Error(
      "usePosition must be used inside PositionProvider."
    );
  }

  return context;
}