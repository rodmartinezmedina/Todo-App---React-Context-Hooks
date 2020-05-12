import React from 'react';
import { TasksContext } from "../contexts/tasksContext";

function MyTasks() {
  return (
    <TasksContext.Consumer>{(context) => {
      const {...props} = context;
      return(
        <div>
          <h1>hello from mytasks.js component</h1>
          
          {/* <PendingTasks />
              <SolvedTasks />  */}
          
          
        </div>
      )
    }}
    </TasksContext.Consumer>
  )
}

export default MyTasks;
