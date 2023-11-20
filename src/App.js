// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import KanbanBoard from "./KanbanBoard";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Kanban Board</h1>
      {data && <KanbanBoard data={data} />}
    </div>
  );
};

export default App;
