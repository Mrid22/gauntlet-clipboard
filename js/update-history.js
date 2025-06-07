import { jsxs, jsx } from 'react/jsx-runtime';
import { Clipboard, showHud } from '@project-gauntlet/api/helpers';
import { useState, useEffect } from 'react';
import { List, ActionPanel } from '@project-gauntlet/api/components';

const hist = [];
async function UpdateHistory() {
    const clipText = await Clipboard.readText();
    if (clipText && !hist.includes(clipText)) {
        hist.push(clipText);
        console.log(clipText);
    }
    return hist;
}

function View() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const result = await UpdateHistory();
            setData(result);
        };
        setInterval(fetchData, 100);
    }, []);
    const filteredData = searchText
        ? data.filter((item) => item.toLowerCase().includes(searchText.toLowerCase()))
        : data;
    return (jsxs(List, { actions: jsx(ActionPanel, { title: "Actions", children: jsx(ActionPanel.Action, { label: "Add to Clipboard", onAction: async () => {
                    if (searchText) {
                        if (!data.includes(searchText)) {
                            await Clipboard.writeText(searchText);
                            showHud(searchText + " Added to Clipboard");
                        }
                        else {
                            setSearchText("");
                        }
                    }
                } }) }), children: [jsx(List.SearchBar, { placeholder: "Search your Clipboard history", value: searchText, onChange: setSearchText }), filteredData.map((item, index) => (jsx(List.Item, { id: `item-${index}`, title: item }, index)))] }));
}

export { View as V, UpdateHistory as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWhpc3RvcnkuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
