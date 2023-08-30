import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Table, TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import Row from "./Row";

const getRowKey = <T extends AnyObject>(
  rowData: T,
  rowKey: TableProps<T>["rowKey"] = "key",
  index: number | undefined = undefined,
) => {
  return typeof rowKey === "function" ? rowKey(rowData, index) : rowKey;
};

export type DragSortEndEventFn<T = unknown> = (
  newDataSource: T[],
) => Promise<void> | void;

export type Props<T> = TableProps<T> & {
  onDragSortEnd?: DragSortEndEventFn<T>;
};

const SortableTable = <T extends AnyObject>({
  components = {},
  dataSource = [],
  rowKey = "key",
  columns = [],
  onDragSortEnd,
  ...props
}: Props<T>) => {
  const [data, setData] = useState<T[]>([...dataSource]);

  const onDragEnd = ({ active, over, collisions }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = data.findIndex(
        (i) => i[getRowKey(i, rowKey)] === active.id,
      );
      const overIndex = data.findIndex(
        (i) => i[getRowKey(i, rowKey)] === over?.id,
      );
      const newData = arrayMove(data, activeIndex, overIndex);

      setData((previous) => newData);

      if (onDragSortEnd) {
        onDragSortEnd(newData);
      }
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={data.map((i) => i[getRowKey(i, rowKey)])}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={{
            ...components,
            body: { row: Row },
          }}
          dataSource={data}
          rowKey={rowKey}
          columns={[{ key: "sort" }, ...columns]}
          {...props}
        />
      </SortableContext>
    </DndContext>
  );
};

export default SortableTable;
