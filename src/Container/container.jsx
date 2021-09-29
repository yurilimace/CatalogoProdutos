import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import { useHistory } from "react-router";
const AppContainer = ({ children }) => {
  const history = useHistory();
  const [visible, setVisible] = useState(0);
  const items = [
    {
      label: "Produtos",
      icon: "pi pi-fw pi-calendar",
      path: "/produtos",
      value: 0,
    },
    {
      label: "Categorias",
      icon: "pi pi-fw pi-pencil",
      path: "/categoriaprodutos",
      value: 1,
    },
  ];

  const setTab = (e) => {
    console.log(e.value);
    setVisible(e.value);
    history.push(e.path);
  };

  useEffect(()=>{
    setVisible(items.findIndex(x => x.path === (history.location.pathname)))
  },[visible])

  return (
    <div className="p-d-flex p-flex-column">
      <TabMenu
        model={items}
        activeIndex={visible}
        onTabChange={(e) => setTab(e.value)}
      />

      <div className="p-mt-3 p-ml-3">{children}</div>
    </div>
  );
};

export default AppContainer;
