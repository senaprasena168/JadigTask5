Assignment: Next.js Advanced (Week 6)

Objective:
This assignment focuses on deepening your understanding of global state management using Redux within a Next.js application. You'll practice accessing and modifying shared state across different components and solidify your grasp of inter-component data communication via the Redux store.

Task Description:
Create a simple Next.js application (theme of your choice) that adheres to the following requirements:

Core Requirements:
Utilize Redux for global state management.

Include at least two distinct components that:

Access global state using useSelector.

Modify global state using useDispatch.

Component A must update or add data to the Redux store.

Component B must read and display the data that was updated or added by Component A.

Case Study Examples (Optional):
If you're unsure about a theme, here are a couple of simple case studies you can use:

Todo List:

Component A: An input form to add new todo items (dispatches an addTodo action).

Component B: Displays the list of todo items (uses useSelector to retrieve them).

Form Input & Display:

Component A: An input form to enter a name (dispatches an action to setName).

Component B: Displays the name entered in Component A (uses useSelector to retrieve it).

Submission:
Submit your repository link to the LMS.

Note:
This assignment is designed to ensure a solid understanding of global state concepts. Be creative in developing a simple application that effectively demonstrates data communication between components using Redux.