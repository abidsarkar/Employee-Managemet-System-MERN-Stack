const employees = [
  {
    
    email: "employee1@example.com",
    password: "123",
    name:"asik ahmed",
    tasks: [
      {
        title: "Fix homepage bug",
        description: "Resolve alignment issue on the homepage header.",
        date: "2025-02-20",
        category: "Bug Fixing",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Design new logo",
        description: "Create a fresh logo concept for the website.",
        date: "2025-02-22",
        category: "Design",
        active: false,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Deploy update",
        description: "Push the latest version to production.",
        date: "2025-02-25",
        category: "Deployment",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    
    email: "employee2@example.com",
    password: "123",
    name:"faruk bin talha",
    tasks: [
      {
        title: "Database Backup",
        description: "Perform a full database backup.",
        date: "2025-02-21",
        category: "Database",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Write API Documentation",
        description: "Update the API docs for the latest release.",
        date: "2025-02-23",
        category: "Documentation",
        active: false,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Optimize Images",
        description: "Reduce image sizes to improve page load speed.",
        date: "2025-02-26",
        category: "Performance",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    
    email: "employee3@example.com",
    password: "123",
    name:"tarek faruki",
    tasks: [
      {
        title: "Setup CI/CD Pipeline",
        description: "Configure automated deployment for the project.",
        date: "2025-02-21",
        category: "DevOps",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Fix login issue",
        description: "Resolve bug preventing users from logging in.",
        date: "2025-02-22",
        category: "Bug Fixing",
        active: false,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Code Review",
        description: "Review pull requests and suggest improvements.",
        date: "2025-02-27",
        category: "Code Review",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    
    email: "employee4@example.com",
    password: "123",
    name:"asif mahmud",
    tasks: [
      {
        title: "Update Landing Page",
        description: "Redesign the landing page for better UI/UX.",
        date: "2025-02-22",
        category: "Design",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Improve Security",
        description: "Add two-factor authentication to the app.",
        date: "2025-02-24",
        category: "Security",
        active: false,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Test Payment Gateway",
        description: "Ensure payment integration works correctly.",
        date: "2025-02-28",
        category: "Testing",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    
    email: "employee5@example.com",
    password: "123",
    name:"samiha binte fahimin",
    tasks: [
      {
        title: "Improve SEO",
        description:
          "Optimize meta tags and page structure for search engines.",
        date: "2025-02-23",
        category: "SEO",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Fix CSS Issues",
        description: "Resolve minor UI glitches on mobile screens.",
        date: "2025-02-25",
        category: "Bug Fixing",
        active: false,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Optimize Database Queries",
        description: "Refactor database queries to improve performance.",
        date: "2025-02-29",
        category: "Performance",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123",
  },
];
// export const setLocalStorage = (employees, admin) => {
//   localStorage.setItem("employees", JSON.stringify(employees));
//   localStorage.setItem("admin", JSON.stringify(admin));
// };

// export const getLocalStorage = () => {
//   const employees = JSON.parse(localStorage.getItem("employees")) || [];
//   const admin = JSON.parse(localStorage.getItem("admin")) || null;
//   return { employees, admin };
// };

