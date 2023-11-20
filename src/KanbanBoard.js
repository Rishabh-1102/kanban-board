// KanbanBoard.js
import React, { useState } from "react";
import Task from "./Task";
import Dropdown from "./Dropdown";
import "./styles.css";

const KanbanBoard = ({ data }) => {
  const [groupBy, setGroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority");

  const groupedData =
    groupBy === "status"
      ? groupByStatus(data.tickets)
      : groupByUser(data.tickets);

  const sortedData = orderByPriority(groupedData, orderBy);

  return (
    <div>
      <div className="controls">
        <Dropdown
          label="Group By"
          options={["status", "user"]}
          value={groupBy}
          onChange={setGroupBy}
        />
        <Dropdown
          label="Order By"
          options={["priority"]}
          value={orderBy}
          onChange={setOrderBy}
        />
      </div>
      <div className="kanban-board">
        {sortedData.map((group) => (
          <div key={group.groupKey} className="task-group">
            <h2>{group.groupKey}</h2>
            <div className="task-list">
              {group.tasks.map((task) => (
                <Task key={task.id} task={task} users={data.users} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const groupByStatus = (tickets) => {
  const grouped = {};
  tickets.forEach((ticket) => {
    if (!grouped[ticket.status]) {
      grouped[ticket.status] = [];
    }
    grouped[ticket.status].push(ticket);
  });
  return Object.keys(grouped).map((status) => ({
    groupKey: status,
    tasks: grouped[status]
  }));
};

const groupByUser = (tickets) => {
  const grouped = {};
  tickets.forEach((ticket) => {
    if (!grouped[ticket.userId]) {
      grouped[ticket.userId] = [];
    }
    grouped[ticket.userId].push(ticket);
  });
  return Object.keys(grouped).map((user) => ({
    groupKey: user,
    tasks: grouped[user]
  }));
};

const orderByPriority = (groups, orderBy) => {
  return groups.map((group) => ({
    groupKey: group.groupKey,
    tasks: group.tasks.sort((a, b) => a[orderBy] - b[orderBy])
  }));
};

export default KanbanBoard;
