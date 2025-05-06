document.addEventListener("DOMContentLoaded", () => {
    // Handle login form
    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = form.querySelector("input[type='text']").value.trim();
        const password = form.querySelector("input[type='password']").value.trim();
        if (!username || !password) {
          alert("Please enter both username and password.");
          return;
        }
  
        // Simple login check
        if (username === "admin" && password === "1234") {
          alert("Login successful!");
          window.location.href = "/dashboard"; // redirect to dashboard
        } else {
          alert("Incorrect username or password.");
        }
      });
    }
  
    // On dashboard, update role if it exists
    const roleElement = document.getElementById("role-display");
    if (roleElement) {
      const storedRole = localStorage.getItem("role") || "member";
      roleElement.textContent = storedRole.charAt(0).toUpperCase() + storedRole.slice(1);
    }
  
    // Render members from localStorage
    renderMembers();
  });
  
  // Role toggle for user
  function toggleRole() {
    let current = localStorage.getItem("role") || "member";
    let newRole = current === "member" ? "leader" : "member";
    localStorage.setItem("role", newRole);
    document.getElementById("user-role").textContent = newRole;
  }
  
  // Open and close modal functions
  function openModal() {
    document.getElementById("memberModal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("memberModal").style.display = "none";
  }
  
  // Add team member
  function addMember() {
    const name = document.getElementById("memberName").value.trim();
    const role = document.getElementById("memberRole").value;
  
    if (!name || !role) {
      alert("Please enter both name and role.");
      return;
    }
  
    // Prevent multiple leaders
    const members = JSON.parse(localStorage.getItem("teamMembers")) || [];
    if (role === "leader" && members.some(m => m.role === "leader")) {
      alert("There can only be one leader.");
      return;
    }
  
    // Add new member to the list
    members.push({ name, role });
    localStorage.setItem("teamMembers", JSON.stringify(members));
    renderMembers();
    closeModal(); // Close the modal after adding the member
  }
  
  // Render members dynamically from localStorage
  function renderMembers() {
    const memberList = document.getElementById("memberList");
    const members = JSON.parse(localStorage.getItem("teamMembers")) || [];
  
    // Clear existing list and render fresh
    memberList.innerHTML = '';
  
    // Loop through members and append them
    members.forEach(member => {
      const memberElement = document.createElement('p');
      memberElement.innerHTML = `
        👤 ${member.name} (${member.role === "leader" ? "<strong>leader</strong>" : "member"}) 
        <button class="change-btn" onclick="changeRole('${member.name}')">change</button>`;
      memberList.appendChild(memberElement);
    });
  }
  
  // Handle role change button
  function changeRole(memberName) {
    const members = JSON.parse(localStorage.getItem("teamMembers")) || [];
    const member = members.find(m => m.name === memberName);
    if (member) {
      member.role = member.role === "leader" ? "member" : "leader";
      localStorage.setItem("teamMembers", JSON.stringify(members));
      renderMembers();
    }
  }
  