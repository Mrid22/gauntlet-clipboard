import { Clipboard, showHud } from "@project-gauntlet/api/helpers";
import { ReactElement, useState, useEffect } from "react";
import { ActionPanel, List } from "@project-gauntlet/api/components";
import UpdateHistory from "./update-history";
export default function View(): ReactElement {
  const [data, setData] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string | undefined>("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await UpdateHistory();
      setData(result);
    };
    setInterval(fetchData, 100);
  }, []);
  const filteredData = searchText
    ? data.filter((item: string) =>
        item.toLowerCase().includes(searchText.toLowerCase()),
      )
    : data;

  let items = filteredData.map((item: string, index: number) => (
    <List.Item id={item} key={index} title={item}></List.Item>
  ));

  return (
    <List
      actions={
        <ActionPanel title="Actions">
          <ActionPanel.Action
            label="Add to Clipboard"
            onAction={async (id: string | undefined) => {
              if (searchText) {
                if (!data.includes(searchText)) {
                  await Clipboard.writeText(searchText);
                  showHud(searchText + " Added to History");
                }
              } else if (id) {
                await Clipboard.writeText(id);
                showHud(searchText + " Copied to Clipboard");
              }
            }}
          />
        </ActionPanel>
      }
    >
      <List.SearchBar
        placeholder="Search your Clipboard history"
        value={searchText}
        onChange={setSearchText}
      />
      {items}
    </List>
  );
}
