import { useMemo } from 'react';
import dayjs from 'dayjs';

import { useBoolean } from 'client/hooks/useBoolean';

interface IItem {
  date?: string;
}

export default function useLastDaysList<I extends IItem>(items: I[]): {
  visibleItems: I[];
  expanded: boolean;
  expand(): void;
} {
  const { value: expanded, setTrue: expand } = useBoolean(false);

  const visibleItems = useMemo(() => {
    let accDaysCounter = 0;

    return items.reduce<I[]>((accItems, item, index) => {
      const isNewDate = index === 0 || !dayjs(item.date).isSame(items[index - 1].date, 'day');

      if (isNewDate) {
        accDaysCounter++;
      }

      if (!expanded && accDaysCounter > 3) {
        return accItems;
      }

      return [...accItems, item];
    }, []);
  }, [expanded, items]);

  return {
    visibleItems,
    expanded,
    expand,
  };
}
